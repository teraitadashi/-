/* ===== 3D 軽量化 その3 (3D は見るだけ。ギアの配置は 2D で行う) =====
   1) 24m 四方ごとに、動かない部品を素材ごとに1つにまとめる (ロープの線もまとめる)
   2) 遠く (40m 超) の区画は、各ギアの実際の3Dモデルを間引いた簡易形で描く。区画ごと1回の描画命令
      細かい部品のまとめは、その区画に近づいたときに初めて行う
   3) 影は止まっている物しかないので、景色が変わったときだけ描き直す */
const __VXC=new Map;
/* 遠くに描く簡易形。形の計算結果は「部品の形と配置」ごとに使い回し、色だけそのギアの素材から付け直す (色違いでも計算は1回) */
/* 模様 (テクスチャ) の平均色。生地の色が模様側に入っている素材でも実物に近い色にする */
const __TXA=new WeakMap;
function __mapAvg(t){if(!t||!t.image)return null;if(__TXA.has(t))return __TXA.get(t);let r=null;
 try{const im=t.image,cv=document.createElement('canvas');cv.width=cv.height=8;const g=cv.getContext('2d');g.drawImage(im,0,0,8,8);const d=g.getImageData(0,0,8,8).data;let R=0,G=0,B=0,n=0;
  for(let i=0;i<d.length;i+=4){if(d[i+3]<128)continue;R+=d[i];G+=d[i+1];B+=d[i+2];n++}
  if(n){const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)},sr=t.colorSpace==='srgb';r=[R/n,G/n,B/n].map(v=>sr?lin(v):v/255)}}catch{}
 __TXA.set(t,r);return r}
function __mColor(o){const m=o.material,c0=m.color||{r:.6,g:.6,b:.6},ta=__mapAvg(m.map),c=ta?{r:c0.r*ta[0],g:c0.g*ta[1],b:c0.b*ta[2]}:c0,ca=m.vertexColors&&o.geometry.attributes.color;if(!ca)return[c.r,c.g,c.b];
 let r=0,g=0,b=0;const n=ca.count,st=Math.max(1,Math.floor(n/64));let k=0;for(let i=0;i<n;i+=st,k++){r+=ca.getX(i);g+=ca.getY(i);b+=ca.getZ(i)}return[c.r*r/k,c.g*g/k,c.b*b/k]}
function __voxProxy(s,parts){
 /* 透けた部品 (メッシュ窓・文字ラベルなど模様の透けで見せる物) は遠くでは省く */
 let ms=parts.filter(o=>{const m=o.material;return o.isMesh&&!(m.transparent&&(m.opacity<.6||m.map))&&!(m.alphaTest>0)});if(!ms.length)return null;
 const si=new Sr().copy(s.matrixWorld).invert();let rel=ms.map(o=>new Sr().multiplyMatrices(si,o.matrixWorld));
 /* テント・タープ: 外側の生地の内側に収まる部品 (インナー・遮光の内張り・中の小物) は外からは見えないので省く (間引くと外側の生地を突き抜けてまだらに見えるため) */
 if(s.userData.cat===`tent`||s.userData.cat===`tarp`){const bb=ms.map((o,i)=>{if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();const B=o.geometry.boundingBox,c=[1e9,1e9,1e9,-1e9,-1e9,-1e9],e=rel[i].elements;
   for(let k=0;k<8;k++){const x=k&1?B.max.x:B.min.x,y=k&2?B.max.y:B.min.y,z=k&4?B.max.z:B.min.z,X=e[0]*x+e[4]*y+e[8]*z+e[12],Yy=e[1]*x+e[5]*y+e[9]*z+e[13],Zz=e[2]*x+e[6]*y+e[10]*z+e[14];
    c[0]=Math.min(c[0],X);c[1]=Math.min(c[1],Yy);c[2]=Math.min(c[2],Zz);c[3]=Math.max(c[3],X);c[4]=Math.max(c[4],Yy);c[5]=Math.max(c[5],Zz)}return c});
  const U=bb.reduce((u,c)=>[Math.min(u[0],c[0]),Math.min(u[1],c[1]),Math.min(u[2],c[2]),Math.max(u[3],c[3]),Math.max(u[4],c[4]),Math.max(u[5],c[5])],[1e9,1e9,1e9,-1e9,-1e9,-1e9]),
   mx=(U[3]-U[0])*.06,mz=(U[5]-U[2])*.06,my=(U[4]-U[1])*.1,keep=bb.map(c=>!(c[0]>U[0]+mx&&c[3]<U[3]-mx&&c[2]>U[2]+mz&&c[5]<U[5]-mz&&c[4]<U[4]-my));
  if(keep.some(k=>k)){ms=ms.filter((o,i)=>keep[i]);rel=rel.filter((r,i)=>keep[i])}}
 const key=ms.map((o,i)=>__gKey(o.geometry)+'#'+rel[i].elements.map(v=>Math.round(v*1e3)).join(',')).join('~');
 let R=__VXC.get(key);
 if(R===void 0){R=__decShape(ms,rel,s.userData.cat===`tent`||s.userData.cat===`tarp`);__VXC.set(key,R)}
 if(!R)return null;
 const cols=ms.map(__mColor),col=new Float32Array(R.mi.length*3);for(let f=0;f<R.mi.length;f++){const c=cols[R.mi[f]];col[f*3]=c[0];col[f*3+1]=c[1];col[f*3+2]=c[2]}
 const g=new Qi;g.setAttribute('position',new Y(R.pos,3));g.setAttribute('normal',new Y(R.nor,3));g.setAttribute('color',new Y(col,3));return g}
/* 実際の3Dモデルを「頂点のまとめ」で間引く (長辺を28分割した格子ごとに頂点を1つにまとめ、潰れた三角形を捨てる)。
   積み木状より元の輪郭 (テントのアーチ、チェアの背、車の窓まわり) が残り、色も部品ごとのまま */
function __decShape(ms,rel,tentish){
 const TP=ms.map((o,i)=>{const a=o.geometry.attributes.position.array,e=rel[i].elements,n=a.length/3,r=new Float32Array(n*3);
  for(let k=0;k<n;k++){const x=a[k*3],y=a[k*3+1],z=a[k*3+2];r[k*3]=e[0]*x+e[4]*y+e[8]*z+e[12];r[k*3+1]=e[1]*x+e[5]*y+e[9]*z+e[13];r[k*3+2]=e[2]*x+e[6]*y+e[10]*z+e[14]}return r});
 const mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];TP.forEach(r=>{for(let k=0;k<r.length;k+=3)for(let d=0;d<3;d++){const v=r[k+d];if(v<mn[d])mn[d]=v;if(v>mx[d])mx[d]=v}});
 const ext=Math.max(mx[0]-mn[0],mx[1]-mn[1],mx[2]-mn[2]);if(!(ext>0))return null;
 const v=Math.max(.015,ext/28),iv=1/v,nx=Math.ceil((mx[0]-mn[0])*iv)+1,ny=Math.ceil((mx[1]-mn[1])*iv)+1;
 const pos=[],mi=[],ar=(P,a,b,c)=>{const ux=P[b]-P[a],uy=P[b+1]-P[a+1],uz=P[b+2]-P[a+2],wx=P[c]-P[a],wy=P[c+1]-P[a+1],wz=P[c+2]-P[a+2];return Math.hypot(uy*wz-uz*wy,uz*wx-ux*wz,ux*wy-uy*wx)/2};
 /* 部品ごとの元の面積。テントでは小さな部品 (ポール・袖・ペグ・ロープ金具) は遠くでは省く */
 const A0=ms.map((o,m)=>{const r=TP[m],ix=o.geometry.index,src=ix?ix.array:null,n=ix?ix.count:r.length/3;let A=0;for(let t=0;t+2<n;t+=3)A+=ar(r,(src?src[t]:t)*3,(src?src[t+1]:t+1)*3,(src?src[t+2]:t+2)*3);return A}),Amax=Math.max(...A0);
 /* 面積の大きい部品から順に。重なった2枚の面 (シェードの表地と裏の UV カット面など) は、同じ格子の三角形になるので先の大きい方だけ残す (遠くで前後がちらついてまだらに見えるのを防ぐ) */
 const NC=nx*ny*(Math.ceil((mx[2]-mn[2])*iv)+1),G3=new Set,ord=ms.map((o,m)=>m).sort((x,y)=>A0[y]-A0[x]);
 ord.forEach(m=>{const o=ms[m];if(tentish&&A0[m]<Amax*.04)return;const r=TP[m],ix=o.geometry.index,src=ix?ix.array:null,n=ix?ix.count:r.length/3,nv=r.length/3;
  /* 頂点 → 格子番号、格子ごとの平均位置 */
  const cid=new Int32Array(nv),ck=new Float64Array(nv),C=new Map;let id=0;const S=[];
  for(let k=0;k<nv;k++){const i=Math.floor((r[k*3]-mn[0])*iv),j=Math.floor((r[k*3+1]-mn[1])*iv),q=Math.floor((r[k*3+2]-mn[2])*iv),key=(q*ny+j)*nx+i;let c=C.get(key);
   if(c===void 0){c=id++;C.set(key,c);S.push(0,0,0,0)}cid[k]=c;ck[k]=key;S[c*4]+=r[k*3];S[c*4+1]+=r[k*3+1];S[c*4+2]+=r[k*3+2];S[c*4+3]++}
  const seen=new Set,TP2=[],K3=[];
  for(let t=0;t+2<n;t+=3){const va=src?src[t]:t,vb=src?src[t+1]:t+1,vc=src?src[t+2]:t+2,a=cid[va],b=cid[vb],c=cid[vc];if(a===b||b===c||a===c)continue;
   const lo=Math.min(a,b,c),hi=Math.max(a,b,c),mid=a+b+c-lo-hi,k=(lo*id+mid)*id+hi;if(seen.has(k))continue;seen.add(k);
   const x1=ck[va],x2=ck[vb],x3=ck[vc],l3=Math.min(x1,x2,x3),h3=Math.max(x1,x2,x3),g=(l3*NC+(x1+x2+x3-l3-h3))*NC+h3;for(const u of[a,b,c]){const w=S[u*4+3];TP2.push(S[u*4]/w,S[u*4+1]/w,S[u*4+2]/w)}K3.push(g)}
  /* 間引いて面積が大きく膨らんだ部品 (細い部品がギザギザの大きな三角形になった物) は取り除く */
  let A1=0;for(let t=0;t<TP2.length;t+=9)A1+=ar(TP2,t,t+3,t+6);if(A1>A0[m]*1.6+v*v*2)return;
  K3.forEach((g,f)=>{if(G3.has(g))return;G3.add(g);for(let q=0;q<9;q++)pos.push(TP2[f*9+q]);mi.push(m,m,m)})});
 if(!pos.length)return null;
 /* 面ごとの法線 */
 const P=new Float32Array(pos),N=new Float32Array(P.length);
 for(let t=0;t<P.length;t+=9){const ux=P[t+3]-P[t],uy=P[t+4]-P[t+1],uz=P[t+5]-P[t+2],wx=P[t+6]-P[t],wy=P[t+7]-P[t+1],wz=P[t+8]-P[t+2];let X=uy*wz-uz*wy,Yy=uz*wx-ux*wz,Zz=ux*wy-uy*wx;const L=Math.hypot(X,Yy,Zz)||1;X/=L;Yy/=L;Zz/=L;for(let q=0;q<9;q+=3){N[t+q]=X;N[t+q+1]=Yy;N[t+q+2]=Zz}}
 return{pos:P,nor:N,mi:new Int16Array(mi)}}
/* 部品 (メッシュ・線) を素材ごとに1つのジオメトリへ。複製を作らず、変換した値を直接書き込む */
function __catGeo(list,line){const l0=list[0].o.geometry,hasN=!line&&!!l0.attributes.normal,hasU=!line&&!!l0.attributes.uv,hasC=!!l0.attributes.color,cs=hasC?l0.attributes.color.itemSize:3;
 const seq=list.map(({o})=>{const g=o.geometry,ix=g.index,pc=g.attributes.position.count,src=ix?ix.array:null,cnt=ix?ix.count:pc,at=k=>src?src[k]:k;
  if(line&&!o.isLineSegments){const r=[];for(let k=0;k<cnt-1;k++)r.push(at(k),at(k+1));if(o.isLineLoop&&cnt>2)r.push(at(cnt-1),at(0));return r}
  if(src)return src.length===cnt?src:src.subarray(0,cnt);return null});
 let n=0;list.forEach(({o},i)=>{n+=seq[i]?seq[i].length:o.geometry.attributes.position.count});
 const P=new Float32Array(n*3),N=hasN?new Float32Array(n*3):null,U=hasU?new Float32Array(n*2):null,C=hasC?new Float32Array(n*cs):null;let w=0;
 list.forEach(({o,M},li)=>{const g=o.geometry,pa=g.attributes.position.array,na=hasN&&g.attributes.normal?g.attributes.normal.array:null,ua=hasU&&g.attributes.uv?g.attributes.uv.array:null,ca=hasC&&g.attributes.color?g.attributes.color.array:null,e=M.elements,q=seq[li],cnt=q?q.length:g.attributes.position.count;
  /* 法線用の行列 (左上3×3の逆転置) */
  const a00=e[0],a01=e[4],a02=e[8],a10=e[1],a11=e[5],a12=e[9],a20=e[2],a21=e[6],a22=e[10],b01=a22*a11-a12*a21,b11=-a22*a10+a12*a20,b21=a21*a10-a11*a20,det=a00*b01+a01*b11+a02*b21||1,
   n00=b01/det,n01=b11/det,n02=b21/det,n10=(-a22*a01+a02*a21)/det,n11=(a22*a00-a02*a20)/det,n12=(-a21*a00+a01*a20)/det,n20=(a12*a01-a02*a11)/det,n21=(-a12*a00+a02*a10)/det,n22=(a11*a00-a01*a10)/det;
  for(let t=0;t<cnt;t++,w++){const k=q?q[t]:t,x=pa[k*3],y=pa[k*3+1],z=pa[k*3+2];
   P[w*3]=e[0]*x+e[4]*y+e[8]*z+e[12];P[w*3+1]=e[1]*x+e[5]*y+e[9]*z+e[13];P[w*3+2]=e[2]*x+e[6]*y+e[10]*z+e[14];
   if(N){if(na){const u=na[k*3],v=na[k*3+1],s=na[k*3+2];let X=n00*u+n01*v+n02*s,Yy=n10*u+n11*v+n12*s,Zz=n20*u+n21*v+n22*s;const L=Math.hypot(X,Yy,Zz)||1;N[w*3]=X/L;N[w*3+1]=Yy/L;N[w*3+2]=Zz/L}else N[w*3+1]=1}
   if(U&&ua){U[w*2]=ua[k*2];U[w*2+1]=ua[k*2+1]}
   if(C&&ca)for(let c=0;c<cs;c++)C[w*cs+c]=ca[k*cs+c]}});
 const g=new Qi;g.setAttribute('position',new Y(P,3));if(N)g.setAttribute('normal',new Y(N,3));if(U)g.setAttribute('uv',new Y(U,2));if(C)g.setAttribute('color',new Y(C,cs));return g}
function __cellBuild(A,skip,big,night){(window.__cells||[]).forEach(c=>{c.cache&&c.cache.forEach(m=>m.geometry.dispose())});
 A.updateMatrixWorld(!0);const inv=new Sr().copy(A.matrixWorld).invert(),C=new Map,cs=big?24:1e6;
 window.__cellInv=inv;
 /* 同じ形を複数のギアで共有している部品 (車の車体など) や頂点の多い部品はまとめない (まとめるとギアの数だけコピーができてメモリを大きく使う) */
 const use=new Map;A.traverse(o=>{if(o.isMesh&&o.geometry)use.set(o.geometry,(use.get(o.geometry)||0)+1)});
 A.children.slice().forEach(s=>{if(!s.userData||!s.userData.itemId)return;
  const k=Math.floor(s.position.x/cs)+','+Math.floor(s.position.z/cs);let c=C.get(k);if(!c){c={M:new Map,L:new Map,K:[],px:[],gl:[],mn:[1e9,1e9],mx:[-1e9,-1e9]};C.set(k,c)}
  if(night)s.traverse(o=>{if(o.isPointLight)c.gl.push(new J().setFromMatrixPosition(o.matrixWorld).applyMatrix4(inv))});
  c.mn=[Math.min(c.mn[0],s.position.x),Math.min(c.mn[1],s.position.z)];c.mx=[Math.max(c.mx[0],s.position.x),Math.max(c.mx[1],s.position.z)];
  const parts=[];s.traverse(o=>{if(o===s||!(o.isMesh||o.isLine)||o.children.length||skip&&skip.has(o)||o.userData.noMerge||!o.geometry||!o.geometry.attributes.position||Array.isArray(o.material)||!o.visible)return;parts.push(o)});
  if(big){const pg=__voxProxy(s,parts);if(pg){pg.applyMatrix4(new Sr().multiplyMatrices(inv,s.matrixWorld));c.px.push({o:{geometry:pg},M:new Sr})}}
  parts.forEach(o=>{const g=o.geometry;if(o.isMesh&&(use.get(g)>1||g.attributes.position.count>6000)){c.K.push(o);return}const M=new Sr().multiplyMatrices(inv,o.matrixWorld);
   if(o.isMesh){const key=__mKey(o.material)+'|'+(o.castShadow?1:0)+(o.receiveShadow?1:0)+'|'+(g.attributes.normal?1:0)+(g.attributes.uv?1:0)+(g.attributes.color?g.attributes.color.itemSize:0)+'|'+o.renderOrder;
    if(!c.M.has(key))c.M.set(key,[]);c.M.get(key).push({o,M})}
   else{const key=__mKey(o.material)+'|'+(g.attributes.color?g.attributes.color.itemSize:0)+'|'+o.renderOrder;if(!c.L.has(key))c.L.set(key,[]);c.L.get(key).push({o,M})}
   o.parent&&o.parent.remove(o)})});
 const cells=[];
 C.forEach(c=>{let px=null;if(c.px.length){px=new Z(__catGeo(c.px,!1),new Q({vertexColors:!0,roughness:.85,flatShading:!0,side:2}));px.visible=!1;px.matrixAutoUpdate=!1;A.add(px)}
  /* 夜: 遠くの区画でもランタン・焚き火の明かりが見えるよう、光の位置に明るい玉を置く (遠いときだけ表示) */
  let gw=null;if(c.gl.length){const sp=new Ro(.32,8,6);gw=new Z(__catGeo(c.gl.map(v=>({o:{geometry:sp},M:new Sr().makeTranslation(v.x,v.y,v.z)})),!1),new ua({color:'#ffc86b',transparent:!0,opacity:.95,blending:2,depthWrite:!1}));gw.visible=!1;gw.matrixAutoUpdate=!1;A.add(gw)}
  const e={A,M:c.M,L:c.L,K:c.K,det:null,px,gw,mn:[c.mn[0]-6,c.mn[1]-6],mx:[c.mx[0]+6,c.mx[1]+6],far:null};if(!px)__cellDetail(e);cells.push(e)});
 window.__cells=cells}
/* 区画の細かい部品は、近づいて初めて必要になったときに組み立てる (全体表示では組み立てない) */
function __cellDetail(e){e.seen=++__cellSeq;if(e.det)return;if(e.cache){e.cache.forEach(m=>e.A.add(m));e.det=e.cache;e.cache=null;return}const A=e.A,det=[];
 e.M.forEach(list=>{const o0=list[0].o,m=new Z(__catGeo(list,!1),o0.material);m.castShadow=o0.castShadow;m.receiveShadow=o0.receiveShadow;m.renderOrder=o0.renderOrder;m.matrixAutoUpdate=!1;A.add(m);det.push(m)});
 e.L.forEach(list=>{const o0=list[0].o,m=new Va(__catGeo(list,!0),o0.material);m.renderOrder=o0.renderOrder;m.matrixAutoUpdate=!1;A.add(m);det.push(m)});
 e.det=det;e.M=e.L=null}
function __cellTick(cam){const L=window.__cells;if(!L||!L.length||!window.__cellInv)return;const p=cam.position.clone().applyMatrix4(window.__cellInv);let ch=!1;
 for(const c of L){if(!c.px)continue;const dx=Math.max(c.mn[0]-p.x,0,p.x-c.mx[0]),dz=Math.max(c.mn[1]-p.z,0,p.z-c.mx[1]),far=Math.hypot(dx,dz,p.y)>40;
  if(far!==c.far){c.far=far;if(!far)__cellDetail(c);c.px.visible=far;c.K.forEach(o=>o.visible=!far);if(c.gw)c.gw.visible=far;c.det&&c.det.forEach(o=>o.visible=!far);ch=!0}}
 if(ch){__cellEvict(L);if(window.__rend)window.__rend.shadowMap.needsUpdate=!0}}
