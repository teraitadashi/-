/* ===== 3D 軽量化 その2 =====
   1) 動かない部品をまとめるとき、見た目が同じ素材 (別々に作られた同色の素材) は1つとして扱う (__mKey)
   2) 軽量モード: 影なし・点光源2灯まで・解像度1倍
   3) 操作が止まったら描画を休む。昼は炎のゆらぎも止めて、止まって5秒後からは描かない。夜は焚き火のゆらぎだけ1秒10コマで描く */
const __GK=new WeakMap,__MK=new WeakMap;
function __gKey(g){let k=__GK.get(g);if(k)return k;const p=g.attributes.position,a=p.array,n=a.length,st=Math.max(1,Math.floor(n/48));let s=0;
 for(let i=0;i<n;i+=st)s+=a[i]*(1+i%7);k=p.count+'|'+(g.index?g.index.count:0)+'|'+Object.keys(g.attributes).join(',')+'|'+s.toFixed(4);__GK.set(g,k);return k}
function __mKey(m){let k=__MK.get(m);if(k)return k;if(Object.prototype.hasOwnProperty.call(m,'onBeforeCompile'))k=m.uuid;else{
  const c=x=>x&&x.isColor?x.getHexString():'',t=x=>x?x.uuid:'';
  k=[m.type,c(m.color),c(m.emissive),m.emissiveIntensity,m.roughness,m.metalness,m.opacity,m.transparent,m.side,m.depthWrite,m.depthTest,m.vertexColors,m.flatShading,m.wireframe,m.alphaTest,m.polygonOffset,m.polygonOffsetFactor,m.toneMapped,m.fog,m.blending,
   t(m.map),t(m.normalMap),t(m.alphaMap),t(m.emissiveMap),t(m.roughnessMap),t(m.metalnessMap),t(m.aoMap),t(m.bumpMap),m.visible].join('|')}
 __MK.set(m,k);return k}
/* 軽量モード */
function __liteOn(){try{return localStorage.getItem('miocamp_lite3d')==='1'}catch{return!1}}
function __liteApply(){const r=window.__rend,sc=window.__scene;if(!r||!sc)return;const on=__liteOn(),big=window.__siteHalf&&window.__siteHalf[0]>15;
 if(r.shadowMap.enabled===on){r.shadowMap.enabled=!on;sc.traverse(o=>{if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.needsUpdate=!0)})}
 r.shadowMap.autoUpdate=!1;r.shadowMap.needsUpdate=!0;r.setPixelRatio(on?1:big?Math.min(window.devicePixelRatio,1.25):Math.min(window.devicePixelRatio,2));
 __lightPick();__poke()}
/* 点光源は見ている場所に近いものだけ点ける (通常8灯・軽量2灯・昼は0灯)。点ける数を一定に保つのでシェーダーの作り直しは起きない */
let __lt=null;
function __lightPick(){const sc=window.__scene;if(!sc)return;const n=window.__tod===`day`?0:__liteOn()?2:8,L=[];sc.traverse(o=>{if(o.isPointLight)L.push(o)});const tg=window.__orbit?window.__orbit.target:new J,wp=new J;
 L.forEach(l=>l.__d=l.getWorldPosition(wp).distanceToSquared(tg));L.sort((a,b)=>a.__d-b.__d);L.forEach((l,i)=>l.visible=i<n);__lt=tg.clone()}
function __lightTick(){const o=window.__orbit;if(o&&(!__lt||__lt.distanceTo(o.target)>6))__lightPick()}
/* 止まっている時は描かない */
let __awake=0,__lastDraw=0;
function __poke(ms){__awake=Math.max(__awake,performance.now()+(ms||1000));if(ms&&window.__rend)window.__rend.shadowMap.needsUpdate=!0}
function __shouldDraw(){const t=performance.now();if(t<__awake||window.__tod!==`day`&&t-__lastDraw>100||t<__awake+5e3&&t-__lastDraw>1000){__lastDraw=t;return!0}return!1}
/* 3D画面左上 (「リアル3Dビュー」の下) の「軽量モード」ボタン */
function __liteBtn(host){const B=document.createElement('button');B.type='button';
 const paint=()=>{const on=__liteOn();B.textContent=on?'⚡ 軽量モード ON':'⚡ 軽量モード';B.style.cssText='position:absolute;left:12px;top:52px;z-index:20;padding:6px 11px;border-radius:9999px;font-size:11px;font-weight:700;border:1px solid '+(on?'#f59e0b':'rgba(120,113,108,.8)')+';background:'+(on?'rgba(245,158,11,.92)':'rgba(28,25,23,.8)')+';color:'+(on?'#1c1917':'#e7e5e4')+';backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)'};
 B.onclick=ev=>{ev.stopPropagation();try{localStorage.setItem('miocamp_lite3d',__liteOn()?'0':'1')}catch{}paint();__liteApply()};
 ['pointerdown','pointerup','click'].forEach(v=>B.addEventListener(v,ev=>ev.stopPropagation()));
 paint();if(getComputedStyle(host).position==='static')host.style.position='relative';host.appendChild(B)}
