/* ===== 3D 軽量化 その2 =====
   1) 同じギア (同じ形・同じ色) が2台以上あれば、部品ごとに1回の描画命令でまとめて描く (インスタンス描画)
   2) 軽量モード: 影なし・点光源2灯まで・解像度1倍
   3) 操作が止まって1秒たったら描画を休む (休み中も1秒に1回だけ描き直す) */
const __sph=()=>{const g=new Qi;g.setAttribute('position',new Y([0,0,0],3));g.computeBoundingSphere();return g.boundingSphere.clone()},__GK=new WeakMap,__MK=new WeakMap;
/* 自前のインスタンス描画メッシュ (three.js の InstancedMesh 相当。レンダラーは isInstancedMesh / instanceMatrix / count を見る) */
function __mkInst(geo,mat,n){const m=new Z(geo,mat),a=new Y(new Float32Array(n*16),16);a.isInstancedBufferAttribute=!0;a.meshPerAttribute=1;
 m.isInstancedMesh=!0;m.instanceMatrix=a;m.instanceColor=null;m.morphTexture=null;m.count=n;m.boundingSphere=__sph();
 m.setMatrixAt=function(i,M){M.toArray(a.array,i*16)};m.userData.all=[];
 /* 見えている分だけを前に詰めて count を減らす (隠した分の頂点計算もしない) */
 m.sync=function(){const A=this.userData.all,ids=[];let k=0;for(const e of A)if(e.on){this.setMatrixAt(k,e.M);ids[k]=e.id;k++}this.count=k;this.visible=k>0;this.userData.ids=ids;a.needsUpdate=!0;
  /* 見えている分を囲む球 (画面外のまとまりは描かない) */
  if(!geo.boundingSphere)geo.computeBoundingSphere();const S=this.boundingSphere,gr=geo.boundingSphere,p=new J;S.center.set(0,0,0);if(!k){S.radius=0;return}
  for(const e of A)if(e.on)S.center.add(p.copy(gr.center).applyMatrix4(e.M));S.center.divideScalar(k);let r=0;
  for(const e of A)if(e.on){const sc=Math.max(Math.hypot(e.M.elements[0],e.M.elements[1],e.M.elements[2]),Math.hypot(e.M.elements[4],e.M.elements[5],e.M.elements[6]),Math.hypot(e.M.elements[8],e.M.elements[9],e.M.elements[10]));r=Math.max(r,p.copy(gr.center).applyMatrix4(e.M).distanceTo(S.center)+gr.radius*sc)}S.radius=r};
 m.raycast=function(rc,out){const W=this.matrixWorld.clone(),T=new Sr,hit=[];for(let i=0;i<this.count;i++){T.fromArray(a.array,i*16);if(T.elements[0]===0&&T.elements[5]===0&&T.elements[10]===0)continue;
   this.matrixWorld.multiplyMatrices(W,T);hit.length=0;Z.prototype.raycast.call(this,rc,hit);hit.forEach(h=>{h.instanceId=i;h.object=this;out.push(h)})}this.matrixWorld.copy(W)};
 return m}
function __gKey(g){let k=__GK.get(g);if(k)return k;const p=g.attributes.position,a=p.array,n=a.length,st=Math.max(1,Math.floor(n/48));let s=0;
 for(let i=0;i<n;i+=st)s+=a[i]*(1+i%7);k=p.count+'|'+(g.index?g.index.count:0)+'|'+Object.keys(g.attributes).join(',')+'|'+s.toFixed(4);__GK.set(g,k);return k}
function __mKey(m){let k=__MK.get(m);if(k)return k;if(Object.prototype.hasOwnProperty.call(m,'onBeforeCompile'))k=m.uuid;else{
  const c=x=>x&&x.isColor?x.getHexString():'',t=x=>x?x.uuid:'';
  k=[m.type,c(m.color),c(m.emissive),m.emissiveIntensity,m.roughness,m.metalness,m.opacity,m.transparent,m.side,m.depthWrite,m.depthTest,m.vertexColors,m.flatShading,m.wireframe,m.alphaTest,m.polygonOffset,m.polygonOffsetFactor,m.toneMapped,m.fog,m.blending,
   t(m.map),t(m.normalMap),t(m.alphaMap),t(m.emissiveMap),t(m.roughnessMap),t(m.metalnessMap),t(m.aoMap),t(m.bumpMap),m.visible].join('|')}
 __MK.set(m,k);return k}
function __instAll(A,skip){
 A.updateMatrixWorld(!0);const inv=new Sr().copy(A.matrixWorld).invert(),G=new Map,lod=new Map((window.__lodItems||[]).map(e=>[e.g,e]));
 /* ギアをまたいで「同じ形・同じ素材」の部品を集める (近くの 24m 四方ごと) */
 A.children.forEach(s=>{if(!s.userData||!s.userData.itemId)return;const cell=Math.floor(s.position.x/24)+','+Math.floor(s.position.z/24),e=lod.get(s);
  s.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o===s||o.children.length||Array.isArray(o.material)||o.userData.noMerge||skip&&skip.has(o)||!o.geometry||!o.geometry.attributes.position)return;
   const k=cell+'#'+__gKey(o.geometry)+'#'+__mKey(o.material)+'#'+(o.castShadow?1:0)+(o.receiveShadow?1:0)+o.renderOrder;if(!G.has(k))G.set(k,[]);G.get(k).push({o,s,e})})});
 let made=0;
 G.forEach(list=>{if(list.length<2)return;const o0=list[0].o,im=__mkInst(o0.geometry,o0.material,list.length);im.castShadow=o0.castShadow;im.receiveShadow=o0.receiveShadow;im.renderOrder=o0.renderOrder;
  list.forEach(({o,s,e})=>{const q={M:new Sr().multiplyMatrices(inv,o.matrixWorld),id:s.userData.itemId,on:o.visible};im.userData.all.push(q);
   if(e&&(e.det.includes(o)||e.px===o))(e.sl||(e.sl=[])).push({im,q,px:e.px===o});o.parent&&o.parent.remove(o)});
  im.sync();A.add(im);made++});
 lod.forEach(e=>{e.det=e.det.filter(o=>o.parent);if(e.px&&!e.px.parent)e.px=null});
 window.__instCount=made}
/* 軽量モード */
function __liteOn(){try{return localStorage.getItem('miocamp_lite3d')==='1'}catch{return!1}}
function __liteApply(){const r=window.__rend,sc=window.__scene;if(!r||!sc)return;const on=__liteOn(),big=window.__siteHalf&&window.__siteHalf[0]>15;
 if(r.shadowMap.enabled===on){r.shadowMap.enabled=!on;sc.traverse(o=>{if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.needsUpdate=!0)})}
 r.setPixelRatio(on?1:big?Math.min(window.devicePixelRatio,1.25):Math.min(window.devicePixelRatio,2));
 __lightPick();__poke()}
/* 点光源は見ている場所に近いものだけ点ける (通常8灯・軽量2灯)。点ける数を一定に保つのでシェーダーの作り直しは起きない */
let __lt=null;
function __lightPick(){const sc=window.__scene;if(!sc)return;const n=__liteOn()?2:8,L=[];sc.traverse(o=>{if(o.isPointLight)L.push(o)});const tg=window.__orbit?window.__orbit.target:new J,wp=new J;
 L.forEach(l=>l.__d=l.getWorldPosition(wp).distanceToSquared(tg));L.sort((a,b)=>a.__d-b.__d);L.forEach((l,i)=>l.visible=i<n);__lt=tg.clone()}
function __lightTick(){const o=window.__orbit;if(o&&(!__lt||__lt.distanceTo(o.target)>6))__lightPick()}
/* 止まっている時は描かない */
let __awake=0,__lastDraw=0;
function __poke(ms){__awake=Math.max(__awake,performance.now()+(ms||1000))}
function __shouldDraw(){const t=performance.now();if(t<__awake||t-__lastDraw>1000){__lastDraw=t;return!0}return!1}
/* 3D画面左上 (「リアル3Dビュー」の下) の「軽量モード」ボタン */
function __liteBtn(host){const B=document.createElement('button');B.type='button';
 const paint=()=>{const on=__liteOn();B.textContent=on?'⚡ 軽量モード ON':'⚡ 軽量モード';B.style.cssText='position:absolute;left:12px;top:52px;z-index:20;padding:6px 11px;border-radius:9999px;font-size:11px;font-weight:700;border:1px solid '+(on?'#f59e0b':'rgba(120,113,108,.8)')+';background:'+(on?'rgba(245,158,11,.92)':'rgba(28,25,23,.8)')+';color:'+(on?'#1c1917':'#e7e5e4')+';backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)'};
 B.onclick=ev=>{ev.stopPropagation();try{localStorage.setItem('miocamp_lite3d',__liteOn()?'0':'1')}catch{}paint();__liteApply()};
 ['pointerdown','pointerup','click'].forEach(v=>B.addEventListener(v,ev=>ev.stopPropagation()));
 paint();if(getComputedStyle(host).position==='static')host.style.position='relative';host.appendChild(B)}
