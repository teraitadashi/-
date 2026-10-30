/* ===== 3D 軽量化 その3 (3D は見るだけ。ギアの配置は 2D で行う) =====
   1) 24m 四方ごとに、動かない部品を素材ごとに1つにまとめる (ロープの線もまとめる)
   2) 遠く (40m 超) の区画は、各ギアの実際の形を積み木状 (ボクセル) に組み直した簡易形で描く。区画ごと1回の描画命令
      細かい部品のまとめは、その区画に近づいたときに初めて行う
   3) 影は止まっている物しかないので、景色が変わったときだけ描き直す */
const __VXC=new Map;
/* ギアの部品を細かい立方体 (長辺を12分割) に置き換え、外から見える面だけを作る。各立方体は一番多く含む部品の色。
   形の計算結果は「部品の形と配置」ごとに使い回し、色だけそのギアの素材から付け直す (色違いでも計算は1回) */
function __mColor(o){const m=o.material,c=m.color||{r:.6,g:.6,b:.6},ca=m.vertexColors&&o.geometry.attributes.color;if(!ca)return[c.r,c.g,c.b];
 let r=0,g=0,b=0;const n=ca.count,st=Math.max(1,Math.floor(n/64));let k=0;for(let i=0;i<n;i+=st,k++){r+=ca.getX(i);g+=ca.getY(i);b+=ca.getZ(i)}return[c.r*r/k,c.g*g/k,c.b*b/k]}
function __voxProxy(s,parts){
 const ms=parts.filter(o=>o.isMesh&&!(o.material.transparent&&o.material.opacity<.6));if(!ms.length)return null;
 const si=new Sr().copy(s.matrixWorld).invert(),rel=ms.map(o=>new Sr().multiplyMatrices(si,o.matrixWorld));
 const key=ms.map((o,i)=>__gKey(o.geometry)+'#'+rel[i].elements.map(v=>Math.round(v*1e3)).join(',')).join('~');
 let R=__VXC.get(key);
 if(R===void 0){R=__voxShape(ms,rel);__VXC.set(key,R)}
 if(!R)return null;
 const cols=ms.map(__mColor),col=new Float32Array(R.mi.length*3);for(let f=0;f<R.mi.length;f++){const c=cols[R.mi[f]];col[f*3]=c[0];col[f*3+1]=c[1];col[f*3+2]=c[2]}
 const g=new Qi;g.setAttribute('position',new Y(R.pos,3));g.setAttribute('normal',new Y(R.nor,3));g.setAttribute('color',new Y(col,3));return g}
function __voxShape(ms,rel){
 /* 部品の頂点をギアの座標に変換 (1回だけ) */
 const TP=ms.map((o,i)=>{const a=o.geometry.attributes.position.array,e=rel[i].elements,n=a.length/3,r=new Float32Array(n*3);
  for(let k=0;k<n;k++){const x=a[k*3],y=a[k*3+1],z=a[k*3+2];r[k*3]=e[0]*x+e[4]*y+e[8]*z+e[12];r[k*3+1]=e[1]*x+e[5]*y+e[9]*z+e[13];r[k*3+2]=e[2]*x+e[6]*y+e[10]*z+e[14]}return r});
 const mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];TP.forEach(r=>{for(let k=0;k<r.length;k+=3)for(let d=0;d<3;d++){const v=r[k+d];if(v<mn[d])mn[d]=v;if(v>mx[d])mx[d]=v}});
 const ext=Math.max(mx[0]-mn[0],mx[1]-mn[1],mx[2]-mn[2]);if(!(ext>0))return null;
 const v=Math.max(.04,ext/12),iv=1/v,nx=Math.max(1,Math.ceil((mx[0]-mn[0])*iv)),ny=Math.max(1,Math.ceil((mx[1]-mn[1])*iv)),nz=Math.max(1,Math.ceil((mx[2]-mn[2])*iv)),N=nx*ny*nz;
 const W=new Float32Array(N),CI=new Int16Array(N).fill(-1);
 const put=(x,y,z,c,w)=>{let i=Math.floor((x-mn[0])*iv),j=Math.floor((y-mn[1])*iv),k=Math.floor((z-mn[2])*iv);i=i<0?0:i>=nx?nx-1:i;j=j<0?0:j>=ny?ny-1:j;k=k<0?0:k>=nz?nz-1:k;const q=(k*ny+j)*nx+i;
  if(CI[q]===c)W[q]+=w;else if(w>W[q]){CI[q]=c;W[q]=w}};
 ms.forEach((o,mi)=>{const r=TP[mi],ix=o.geometry.index,src=ix?ix.array:null,n=ix?ix.count:r.length/3;
  for(let t=0;t+2<n;t+=3){const a=(src?src[t]:t)*3,b=(src?src[t+1]:t+1)*3,c=(src?src[t+2]:t+2)*3;
   const ux=r[b]-r[a],uy=r[b+1]-r[a+1],uz=r[b+2]-r[a+2],wx=r[c]-r[a],wy=r[c+1]-r[a+1],wz=r[c+2]-r[a+2];
   const area=Math.hypot(uy*wz-uz*wy,uz*wx-ux*wz,ux*wy-uy*wx)/2;if(!(area>0))continue;
   const ns=Math.min(6,Math.max(1,Math.ceil(area*iv*iv*3))),w=area/ns;
   for(let s2=0;s2<ns;s2++){let p=ns===1?1/3:(s2*.618034+.31)%1,q=ns===1?1/3:(s2*.754878+.17)%1;if(p+q>1){p=1-p;q=1-q}
    put(r[a]+ux*p+wx*q,r[a+1]+uy*p+wy*q,r[a+2]+uz*p+wz*q,mi,w)}}});
 const pos=[],nor=[],mi=[],has=(i,j,k)=>i>=0&&j>=0&&k>=0&&i<nx&&j<ny&&k<nz&&CI[(k*ny+j)*nx+i]>=0;
 const F6=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
 for(let k=0;k<nz;k++)for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const q=(k*ny+j)*nx+i;if(CI[q]<0)continue;const x0=mn[0]+i*v,y0=mn[1]+j*v,z0=mn[2]+k*v;
  F6.forEach(d=>{if(has(i+d[0],j+d[1],k+d[2]))return;
   /* 面の4隅 (法線の向きの面上で、残り2軸に広げる) */
   const o=[x0+(d[0]>0?v:0),y0+(d[1]>0?v:0),z0+(d[2]>0?v:0)],U=[0,0,0],V=[0,0,0],axes=[0,1,2].filter(a=>!d[a]);U[axes[0]]=v;V[axes[1]]=v;
   let p0=o,p1=[o[0]+U[0],o[1]+U[1],o[2]+U[2]],p2=[o[0]+U[0]+V[0],o[1]+U[1]+V[1],o[2]+U[2]+V[2]],p3=[o[0]+V[0],o[1]+V[1],o[2]+V[2]];
   const cr=U[1]*V[2]-U[2]*V[1],cg=U[2]*V[0]-U[0]*V[2],cb=U[0]*V[1]-U[1]*V[0];if(cr*d[0]+cg*d[1]+cb*d[2]<0){const t=p1;p1=p3;p3=t}
   [p0,p1,p2,p0,p2,p3].forEach(p=>{pos.push(p[0],p[1],p[2]);nor.push(d[0],d[1],d[2]);mi.push(CI[q])})})}
 if(!pos.length)return null;
 return{pos:new Float32Array(pos),nor:new Float32Array(nor),mi:new Int16Array(mi)}}
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
function __cellBuild(A,skip,big){
 A.updateMatrixWorld(!0);const inv=new Sr().copy(A.matrixWorld).invert(),C=new Map,cs=big?24:1e6;
 window.__cellInv=inv;
 A.children.slice().forEach(s=>{if(!s.userData||!s.userData.itemId)return;
  const k=Math.floor(s.position.x/cs)+','+Math.floor(s.position.z/cs);let c=C.get(k);if(!c){c={M:new Map,L:new Map,px:[],mn:[1e9,1e9],mx:[-1e9,-1e9]};C.set(k,c)}
  c.mn=[Math.min(c.mn[0],s.position.x),Math.min(c.mn[1],s.position.z)];c.mx=[Math.max(c.mx[0],s.position.x),Math.max(c.mx[1],s.position.z)];
  const parts=[];s.traverse(o=>{if(o===s||!(o.isMesh||o.isLine)||o.children.length||skip&&skip.has(o)||o.userData.noMerge||!o.geometry||!o.geometry.attributes.position||Array.isArray(o.material)||!o.visible)return;parts.push(o)});
  if(big){const pg=__voxProxy(s,parts);if(pg){pg.applyMatrix4(new Sr().multiplyMatrices(inv,s.matrixWorld));c.px.push({o:{geometry:pg},M:new Sr})}}
  parts.forEach(o=>{const g=o.geometry,M=new Sr().multiplyMatrices(inv,o.matrixWorld);
   if(o.isMesh){const key=__mKey(o.material)+'|'+(o.castShadow?1:0)+(o.receiveShadow?1:0)+'|'+(g.attributes.normal?1:0)+(g.attributes.uv?1:0)+(g.attributes.color?g.attributes.color.itemSize:0)+'|'+o.renderOrder;
    if(!c.M.has(key))c.M.set(key,[]);c.M.get(key).push({o,M})}
   else{const key=__mKey(o.material)+'|'+(g.attributes.color?g.attributes.color.itemSize:0)+'|'+o.renderOrder;if(!c.L.has(key))c.L.set(key,[]);c.L.get(key).push({o,M})}
   o.parent&&o.parent.remove(o)})});
 const cells=[];
 C.forEach(c=>{let px=null;if(c.px.length){px=new Z(__catGeo(c.px,!1),new Q({vertexColors:!0,roughness:.9,flatShading:!0}));px.visible=!1;px.matrixAutoUpdate=!1;A.add(px)}
  const e={A,M:c.M,L:c.L,det:null,px,mn:[c.mn[0]-6,c.mn[1]-6],mx:[c.mx[0]+6,c.mx[1]+6],far:null};if(!px)__cellDetail(e);cells.push(e)});
 window.__cells=cells}
/* 区画の細かい部品は、近づいて初めて必要になったときに組み立てる (全体表示では組み立てない) */
function __cellDetail(e){if(e.det)return;const A=e.A,det=[];
 e.M.forEach(list=>{const o0=list[0].o,m=new Z(__catGeo(list,!1),o0.material);m.castShadow=o0.castShadow;m.receiveShadow=o0.receiveShadow;m.renderOrder=o0.renderOrder;m.matrixAutoUpdate=!1;A.add(m);det.push(m)});
 e.L.forEach(list=>{const o0=list[0].o,m=new Va(__catGeo(list,!0),o0.material);m.renderOrder=o0.renderOrder;m.matrixAutoUpdate=!1;A.add(m);det.push(m)});
 e.det=det;e.M=e.L=null}
function __cellTick(cam){const L=window.__cells;if(!L||!L.length||!window.__cellInv)return;const p=cam.position.clone().applyMatrix4(window.__cellInv);let ch=!1;
 for(const c of L){if(!c.px)continue;const dx=Math.max(c.mn[0]-p.x,0,p.x-c.mx[0]),dz=Math.max(c.mn[1]-p.z,0,p.z-c.mx[1]),far=Math.hypot(dx,dz,p.y)>40;
  if(far!==c.far){c.far=far;if(!far)__cellDetail(c);c.px.visible=far;c.det&&c.det.forEach(o=>o.visible=!far);ch=!0}}
 if(ch&&window.__rend)window.__rend.shadowMap.needsUpdate=!0}
