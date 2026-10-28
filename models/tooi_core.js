/* ===== 遠井キャンプ場 (和歌山県有田川町・有田川沿い) 全体モデル =====
   サイト座標: x=0..200 (西→東), z=0..95 (北の県道側→南の有田川側), 単位 m
   県道(山側) > 法面 > 芝生サイト・駐車場の台地(+3.5m) > 階段護岸 > 河川敷(砂利) > 有田川 > 対岸の山 */
const __TY={W:200,D:95,LH:3.5,LW:8,RH:6.5,rw:10,
 road:[[-60,82],[-25,60],[-5,42],[15,26],[35,13],[58,7],[80,4],[110,2],[140,1],[170,-2],[200,-5],[260,-10]],
 lev:[[-60,82],[-10,71],[8,68],[35,61],[62,50],[95,41],[122,33],[150,25],[175,18],[200,13],[260,4]],
 riv:[[-60,104],[-20,96],[20,91],[62,85],[100,79],[131,74],[162,68],[185,60],[215,48],[260,30]],
 lawn:{x:34,z:45,a:30,b:11,r:-25},
 park:[[68,22],[121,15],[123,28],[70,37]],
 ev:[[6,44,6],[13,53,5],[1,56,5],[18,47,4],[-4,48,5]],
 shelter:{x:63,z:43,w:8,d:4.5,r:-20},
 toilet:{x:131,z:20,w:5,d:4,r:-8}};
function __tyIs(site){return !!(site&&site.name&&site.name.includes('遠井'))}
function __tySD(P,x,z){let best=1e9,sg=1;for(let i=0;i<P.length-1;i++){const ax=P[i][0],az=P[i][1],dx=P[i+1][0]-ax,dz=P[i+1][1]-az,L2=dx*dx+dz*dz;let t=((x-ax)*dx+(z-az)*dz)/L2;t=t<0?0:t>1?1:t;const d=Math.hypot(x-ax-dx*t,z-az-dz*t);if(d<best){best=d;sg=dx*(z-az)-dz*(x-ax)>=0?1:-1}}return best*sg}
function __tyZ(P,x){for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1];if(x<=b[0]||i===P.length-2){const t=(x-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*t}}return P[0][1]}
function __tyInLawn(x,z){const L=__TY.lawn,r=-L.r*Math.PI/180,dx=x-L.x,dz=z-L.z,u=dx*Math.cos(r)-dz*Math.sin(r),v=dx*Math.sin(r)+dz*Math.cos(r);return (u*u)/(L.a*L.a)+(v*v)/(L.b*L.b)<=1}
function __tyInPoly(P,x,z){let c=!1;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
/* 地面の高さ (ギア配置・カメラ制限にも使用)。zone: 0台地 1護岸 2河川敷 3川 4対岸 5道路 6山側 7法面 */
function __tyHZ(x,z){const A=__TY,sV=__tySD(A.riv,x,z);
 if(sV>A.rw)return[Math.min((sV-A.rw)*.9,40)-.3,4];
 if(sV>-A.rw)return[-.8,3];
 const sR=__tySD(A.road,x,z);
 if(sR<-3.5)return[A.RH+Math.min((-sR-3.5)*.8,45),6];
 if(sR<=3.5)return[A.RH,5];
 const sT=__tySD(A.lev,x,z);let h,zn;
 if(sT<=0){h=A.LH;zn=0}else if(sT>=A.LW){h=.02;zn=2}else{h=A.LH-Math.floor(sT/.8)*.35;zn=1}
 if(sR<10){const e=A.RH+(A.LH-A.RH)*(sR-3.5)/6.5;if(e>h){h=e;zn=7}}
 return[h,zn]}
function __tyH(x,z){return __tyHZ(x,z)[0]}

function __tyPinkTex(lf){if(window.__tyPink)return window.__tyPink;const src=lf.image,c=document.createElement('canvas');c.width=src.width;c.height=src.height;const g=c.getContext('2d');g.drawImage(src,0,0);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(246,186,206,0.88)';g.fillRect(0,0,c.width,c.height);g.globalCompositeOperation='source-over';g.fillStyle='rgba(255,255,255,0.18)';
 for(let i=0;i<400;i++){g.globalCompositeOperation='source-atop';g.fillRect(Math.random()*c.width,Math.random()*c.height,3,3)}
 const t=new Xa(c);t.colorSpace=lf.colorSpace;window.__tyPink=t;return t}
function __tooiCamp(G,site){
 const A=__TY,ox=-A.W/2,oz=-A.D/2,R=__pRng(4242);
 const col=h=>{const c=new ri(h);return[c.r,c.g,c.b]};
 /* ---------- 地形 (高さ場 + 頂点カラー) ---------- */
 {const X0=-110,X1=310,Z0=-100,Z1=190,S=2,NX=Math.round((X1-X0)/S),NZ=Math.round((Z1-Z0)/S);
  const C={lawn:col('#6f9e3c'),lawn2:col('#83ad48'),plat:col('#8f8a5c'),park:col('#5d6166'),grav:col('#b8b2a6'),grav2:col('#a39d92'),
   bed:col('#4d6f63'),hill:col('#2f5326'),hill2:col('#3d6a2c'),road:col('#4f5358'),slope:col('#5f8636'),lev:col('#a7a49b')};
  const pos=new Float32Array((NX+1)*(NZ+1)*3),cl=new Float32Array((NX+1)*(NZ+1)*3),idx=[];
  for(let j=0;j<=NZ;j++)for(let i=0;i<=NX;i++){const x=X0+i*S,z=Z0+j*S,k=(j*(NX+1)+i)*3;let[h,zn]=__tyHZ(x,z),c;
   const n=R();
   if(zn===1){h=A.LH*(1-__tySD(A.lev,x,z)/A.LW)-.45;c=C.lev}
   else if(zn===0){c=__tyInPoly(A.park,x,z)?C.park:__tyInLawn(x,z)?(n<.5?C.lawn:C.lawn2):C.plat}
   else if(zn===2)c=n<.5?C.grav:C.grav2;else if(zn===3)c=C.bed;else if(zn===4||zn===6){c=n<.5?C.hill:C.hill2;h+=n*.6}
   else if(zn===5)c=C.road;else c=C.slope;
   const eb=Math.min(x-X0,X1-x,z-Z0,Z1-z),fo=Math.min(1,Math.max(0,eb/40));if(zn===4||zn===6)h=h*fo-1.2*(1-fo);
   const f=.93+n*.1;pos[k]=x+ox;pos[k+1]=h;pos[k+2]=z+oz;cl[k]=c[0]*f;cl[k+1]=c[1]*f;cl[k+2]=c[2]*f}
  for(let j=0;j<NZ;j++)for(let i=0;i<NX;i++){const a=j*(NX+1)+i,b=a+1,c=a+NX+1,d=c+1;idx.push(a,c,b,b,c,d)}
  const g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('color',new Y(cl,3));g.setIndex(idx);g.computeVertexNormals();
  const m=new Z(g,new Q({vertexColors:!0,roughness:.95,metalness:0}));m.receiveShadow=!0;G.add(m)}
 /* ---------- 階段護岸 (10段) ---------- */
 {const P=[],L=A.lev;for(let i=0;i<L.length-1;i++){const a=L[i],b=L[i+1],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/1.5));for(let k=0;k<n;k++){const t=k/n;P.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}P.push(L[L.length-1]);
  const N=P.map((p,i)=>{const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)],dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz)||1;return[-dz/l,dx/l]});
  const pos=[],cl=[],tr=col('#c4c0b5'),ri2=col('#8e8b83'),q=(p,c)=>{p.forEach(v=>pos.push(v[0]+ox,v[1],v[2]+oz));for(let i=0;i<6;i++)cl.push(c[0],c[1],c[2])};
  for(let i=0;i<P.length-1;i++){const p0=P[i],p1=P[i+1],n0=N[i],n1=N[i+1];
   for(let s=0;s<10;s++){const h=A.LH-s*.35,o0=s*.8,o1=(s+1)*.8,h2=h-.35,
     a=[p0[0]+n0[0]*o0,h,p0[1]+n0[1]*o0],b=[p1[0]+n1[0]*o0,h,p1[1]+n1[1]*o0],c=[p1[0]+n1[0]*o1,h,p1[1]+n1[1]*o1],d=[p0[0]+n0[0]*o1,h,p0[1]+n0[1]*o1],
     e=[c[0],h2,c[2]],f=[d[0],h2,d[2]];
    q([a,d,b,b,d,c],tr);q([d,f,c,c,f,e],ri2)}}
  const g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('color',new Y(cl,3));g.computeVertexNormals();
  const m=new Z(g,new Q({vertexColors:!0,roughness:.9,side:2}));m.receiveShadow=!0;m.castShadow=!0;G.add(m);
  /* 天端の縁石 */
  const cb=new Bo(new vo(P.filter((p,i)=>i%2===0).map(p=>new J(p[0]+ox,A.LH+.06,p[1]+oz))),400,.12,4,!1);G.add(new Z(cb,new Q({color:'#d6d3cb',roughness:.8})))}
 /* ---------- 有田川の水面 ---------- */
 {const Rv=A.riv,pos=[],idx=[];const sm=[];for(let i=0;i<Rv.length-1;i++){const a=Rv[i],b=Rv[i+1];for(let k=0;k<8;k++){const t=k/8;sm.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}sm.push(Rv[Rv.length-1]);
  sm.forEach((p,i)=>{const a=sm[Math.max(0,i-1)],b=sm[Math.min(sm.length-1,i+1)],dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz)||1,nx=-dz/l,nz=dx/l,w=A.rw+.6;pos.push(p[0]-nx*w+ox,-.28,p[1]-nz*w+oz,p[0]+nx*w+ox,-.28,p[1]+nz*w+oz)});
  for(let i=0;i<sm.length-1;i++){const a=i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2)}
  const g=new Qi;g.setAttribute('position',new Y(pos,3));g.setIndex(idx);g.computeVertexNormals();
  const m=new Z(g,new Q({color:'#3f8a83',roughness:.12,metalness:.15,transparent:!0,opacity:.86,side:2}));m.receiveShadow=!0;G.add(m)}
 /* ---------- 県道のガードレールと電柱 ---------- */
 {const gr=[];for(let x=-20;x<=225;x+=4){const z=__tyZ(A.road,x),z2=__tyZ(A.road,x+1),dx=1,dz=z2-z,l=Math.hypot(dx,dz);gr.push(new J(x-dz/l*3.7+ox,A.RH+.7,z+dx/l*3.7+oz))}
  const m=new Q({color:'#e5e7eb',roughness:.4,metalness:.5});G.add(new Z(new Bo(new vo(gr),600,.07,4,!1),m));
  const pm=new Q({color:'#9ca3af',roughness:.7});for(let x=0;x<=200;x+=33){const z=__tyZ(A.road,x)-4.6,p=new Z(new to(.14,.18,9,8),pm);p.position.set(x+ox,A.RH+4.5,z+oz);p.castShadow=!0;G.add(p)}}
 /* ---------- 駐車場の白線 ---------- */
 {const Pk=A.park,lm=new ua({color:'#f1f5f9'}),a=Pk[0],b=Pk[1],d=Pk[3],ux=(b[0]-a[0]),uz=(b[1]-a[1]),L=Math.hypot(ux,uz),vx=d[0]-a[0],vz=d[1]-a[1],W=Math.hypot(vx,vz),ang=Math.atan2(uz,ux);
  for(let s=2.5;s<L-1;s+=2.5)[[.08,.38],[.62,.92]].forEach(([v0,v1])=>{const x=a[0]+ux/L*s+vx*(v0+v1)/2,z=a[1]+uz/L*s+vz*(v0+v1)/2,m=new Z(new eo(.12,.02,W*(v1-v0)),lm);m.position.set(x+ox,A.LH+.02,z+oz);m.rotation.y=-ang;G.add(m)})}
 /* ---------- 炊事棟 (緑の鉄骨・寄棟屋根2連) ---------- */
 {const S=A.shelter,g=new Xr;g.position.set(S.x+ox,A.LH,S.z+oz);g.rotation.y=-S.r*Math.PI/180;G.add(g);
  const gm=new Q({color:'#2fae4a',roughness:.5,metalness:.3}),rf=new Q({color:'#8b96a3',roughness:.6,metalness:.4}),cm=new Q({color:'#9ca3af',roughness:.8});
  [-S.w/2,0,S.w/2].forEach(x=>[-S.d/2,S.d/2].forEach(z=>{const p=new Z(new eo(.18,2.6,.18),gm);p.position.set(x,1.3,z);p.castShadow=!0;g.add(p)}));
  [-S.w/4,S.w/4].forEach(x=>{const r=new Z(new no(Math.hypot(S.w/2,S.d)/2+.35,.9,4),rf);r.rotation.y=Math.PI/4;r.scale.set(S.w/2/S.d*1.0,1,1);r.position.set(x,3.05,0);r.castShadow=!0;g.add(r);
   const e=new Z(new eo(S.w/2,.12,S.d+.4),gm);e.position.set(x,2.62,0);g.add(e)});
  const sk=new Z(new eo(S.w*.8,.85,.8),cm);sk.position.set(0,.43,0);sk.castShadow=!0;g.add(sk);
  const sg=new Z(new Io(2.4,.6),new ua({map:__nkSign('炊事場',2.4,.6,'#14532d','#ffffff',40)}));sg.position.set(0,2.35,S.d/2+.12);g.add(sg)}
 /* ---------- トイレ棟 ---------- */
 {const T=A.toilet,g=new Xr;g.position.set(T.x+ox,A.LH,T.z+oz);g.rotation.y=-T.r*Math.PI/180;G.add(g);
  const w=new Z(new eo(T.w,2.6,T.d),new Q({color:'#e8e6df',roughness:.9}));w.position.y=1.3;w.castShadow=!0;w.receiveShadow=!0;g.add(w);
  const r=new Z(new no(Math.hypot(T.w,T.d)/2+.4,1.1,4),new Q({color:'#6b4a3a',roughness:.85}));r.rotation.y=Math.PI/4;r.scale.set(T.w/T.d,1,1);r.position.y=3.15;r.castShadow=!0;g.add(r);
  const sg=new Z(new Io(2,.55),new ua({map:__nkSign('トイレ',2,.55,'#1e3a8a','#ffffff',40)}));sg.position.set(0,2.2,T.d/2+.03);g.add(sg)}
 /* ---------- 入口看板・ベンチ ---------- */
 {const x=66,z=__tyZ(A.road,66)+11,sg=new Z(new Io(5,1.3),new ua({map:__nkSign('遠井キャンプ場',5,1.3,'#14532d','#ffffff',52),side:2}));sg.position.set(x+ox,A.LH+2.3,z+oz);G.add(sg);
  const pm=new Q({color:'#6b4a2f',roughness:.85});[-2.3,2.3].forEach(k=>{const p=new Z(new to(.08,.08,2.4,8),pm);p.position.set(x+k+ox,A.LH+1.2,z+oz-.05);G.add(p)});
  const bm=new Q({color:'#8a6a48',roughness:.9});[12,21,30,39,48,56].forEach(bx=>{const bz=__tyZ(A.lev,bx)-1.6;if(!__tyInLawn(bx,bz-3)&&bx>14)return;const b=new Z(new eo(1.8,.42,.45),bm);b.position.set(bx+ox,A.LH+.21,bz+oz);b.rotation.y=-Math.atan2(__tyZ(A.lev,bx+1)-__tyZ(A.lev,bx),1);b.castShadow=!0;G.add(b)})}
 /* ---------- 樹木: 常緑の大木・桜並木 ---------- */
 {if(!window.__nkTreeVars){window.__nkTreeVars=[];for(let i=0;i<5;i++)window.__nkTreeVars.push(__treeBuild(i+1))}
  const T=__pineTextures(),lf=__leafTex(),mT=new Q({map:T.bark,color:'#ffffff',vertexColors:!0,roughness:.96}),
   mG=new Q({map:lf,color:'#ffffff',vertexColors:!0,roughness:.85,alphaTest:.4,side:2}),mP=new Q({map:__tyPinkTex(lf),color:'#ffffff',roughness:.85,alphaTest:.4,side:2});
  const tree=(x,z,s,mf)=>{const V=window.__nkTreeVars[Math.floor(R()*5)],g=new Xr;g.position.set(x+ox,__tyH(x,z),z+oz);g.rotation.y=R()*6.28;g.scale.setScalar(s);
   const a=new Z(V.trunk,mT);a.castShadow=!0;g.add(a);const f=new Z(V.foliage,mf);f.castShadow=!0;g.add(f);G.add(g)};
  A.ev.forEach(t=>tree(t[0],t[1],t[2]/4.2,mG));
  for(let x=22;x<=128;x+=9.5){const z=__tyZ(A.road,x)+6.5+R()*1.5;if(__tyInPoly(A.park,x,z+2))continue;tree(x,z,.62+R()*.15,mP)}}
 /* ---------- 山の森 (1メッシュに結合) ---------- */
 {const sph=new Ro(1,6,4),sp=sph.attributes.position.array,si=sph.index.array,pos=[],cl=[],idx=[],pal=['#2a4f22','#355f29','#24461d','#41702f','#2f5a24'].map(col);
  for(let x=-80;x<=280;x+=6.5)for(let z=-70;z<=160;z+=6.5){const px=x+(R()-.5)*5,pz=z+(R()-.5)*5,[h,zn]=__tyHZ(px,pz);
   const near=(zn===6&&__tySD(A.road,px,pz)<-6)||(zn===4&&__tySD(A.riv,px,pz)>A.rw+3);if(!near)continue;
   const eb=Math.min(px+110,310-px,pz+100,190-pz),fo=Math.min(1,Math.max(0,eb/40));if(fo<.3)continue;const hh=h*fo-1.2*(1-fo);
   const r=2.6+R()*2.4,c=pal[Math.floor(R()*pal.length)],b=pos.length/3;
   for(let k=0;k<sp.length;k+=3){pos.push(px+ox+sp[k]*r,hh+r*.9+sp[k+1]*r*1.25,pz+oz+sp[k+2]*r);const f=.85+.3*(sp[k+1]+1)/2;cl.push(c[0]*f,c[1]*f,c[2]*f)}
   for(let k=0;k<si.length;k++)idx.push(si[k]+b)}
  const g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('color',new Y(cl,3));g.setIndex(idx);g.computeVertexNormals();
  const m=new Z(g,new Q({vertexColors:!0,roughness:.9}));m.receiveShadow=!0;G.add(m)}
}

/* 2D平面図の重ね描き (サイト座標そのまま) */
function __ty2D(e,l,U){const A=__TY,W=e.width,D=e.depth,P=(x,z)=>`${x*l},${z*l}`,cz=z=>Math.max(0,Math.min(D,z)),xs=[];for(let x=0;x<=W;x+=2.5)xs.push(x);
 const band=(top,bot)=>xs.map(x=>P(x,cz(top(x)))).concat(xs.slice().reverse().map(x=>P(x,cz(bot(x))))).join(' ');
 const L=A.lawn,Pk=A.park,txt=(x,z,s,f,c)=>(0,U.jsx)(`text`,{x:x*l,y:z*l,textAnchor:`middle`,fontSize:Math.max(8,l*f),fontWeight:`bold`,fill:c||`#ffffff`,stroke:`#0c0a09`,strokeWidth:2.5,paintOrder:`stroke`,children:s},s);
 const stripes=[];{const a=Pk[0],b=Pk[1],d=Pk[3],ux=b[0]-a[0],uz=b[1]-a[1],L2=Math.hypot(ux,uz);for(let s=2.5;s<L2-1;s+=2.5)[[.08,.38],[.62,.92]].forEach(([v0,v1],k)=>{const x0=a[0]+ux/L2*s+(d[0]-a[0])*v0,z0=a[1]+uz/L2*s+(d[1]-a[1])*v0,x1=a[0]+ux/L2*s+(d[0]-a[0])*v1,z1=a[1]+uz/L2*s+(d[1]-a[1])*v1;stripes.push((0,U.jsx)(`line`,{x1:x0*l,y1:z0*l,x2:x1*l,y2:z1*l,stroke:`#e2e8f0`,strokeWidth:1,opacity:.8},`ps${s}${k}`))})}
 const steps=[];for(let k=1;k<10;k++)steps.push((0,U.jsx)(`polyline`,{points:xs.map(x=>P(x,cz(__tyZ(A.lev,x)+k*.8))).join(' '),fill:`none`,stroke:`#6b6962`,strokeWidth:.8,opacity:.7},`st${k}`));
 const box=(o,c,s,key)=>(0,U.jsxs)(`g`,{transform:`translate(${o.x*l},${o.z*l}) rotate(${o.r})`,children:[(0,U.jsx)(`rect`,{x:-o.w*l/2,y:-o.d*l/2,width:o.w*l,height:o.d*l,rx:2,fill:c,stroke:`#1f2937`,strokeWidth:1.2}),(0,U.jsx)(`text`,{y:Math.max(3,l*.4),textAnchor:`middle`,fontSize:Math.max(7,l*1.1),fontWeight:`bold`,fill:`#111827`,children:s})]},key);
 return(0,U.jsxs)(`g`,{id:`tooi-camp`,pointerEvents:`none`,className:`select-none`,children:[
  (0,U.jsx)(`polygon`,{points:band(x=>0,x=>__tyZ(A.road,x)-3.5),fill:`#24461d`,opacity:.95},`hill`),
  (0,U.jsx)(`polygon`,{points:band(x=>__tyZ(A.road,x)+3.5,x=>__tyZ(A.road,x)+10),fill:`#5f8636`,opacity:.9},`slope`),
  (0,U.jsx)(`polygon`,{points:band(x=>__tyZ(A.road,x)+10,x=>__tyZ(A.lev,x)),fill:`#8f8a5c`,opacity:.95},`plat`),
  (0,U.jsx)(`ellipse`,{cx:L.x*l,cy:L.z*l,rx:L.a*l,ry:L.b*l,transform:`rotate(${L.r} ${L.x*l} ${L.z*l})`,fill:`#6f9e3c`,stroke:`#14532d`,strokeWidth:1.5},`lawn`),
  (0,U.jsx)(`polygon`,{points:band(x=>__tyZ(A.lev,x),x=>__tyZ(A.lev,x)+A.LW),fill:`#b3afa5`},`lev`),...steps,
  (0,U.jsx)(`polygon`,{points:band(x=>__tyZ(A.riv,x)-A.rw,x=>__tyZ(A.riv,x)+A.rw),fill:`#2f7f86`,opacity:.95},`riv`),
  (0,U.jsx)(`polygon`,{points:band(x=>__tyZ(A.riv,x)+A.rw,x=>D),fill:`#24461d`,opacity:.95},`bank`),
  (0,U.jsx)(`polyline`,{points:xs.map(x=>P(x,cz(__tyZ(A.road,x)))).join(' '),fill:`none`,stroke:`#4f5358`,strokeWidth:7*l},`road`),
  (0,U.jsx)(`polygon`,{points:Pk.map(p=>P(p[0],p[1])).join(' '),fill:`#5d6166`,stroke:`#cbd5e1`,strokeWidth:1},`park`),...stripes,
  ...A.ev.map((t,i)=>(0,U.jsx)(`circle`,{cx:t[0]*l,cy:t[1]*l,r:t[2]*l,fill:`#14532d`,fillOpacity:.75,stroke:`#166534`},`ev${i}`)),
  box(A.shelter,`#4ade80`,`炊事場`,`sh`),box(A.toilet,`#e8e6df`,`トイレ`,`wc`),
  txt(L.x,L.z,`芝生サイト`,2.2,`#ecfccb`),txt(95,23,`駐車場 (約40台)`,1.8),txt(75,__tyZ(A.lev,75)+4.5,`階段護岸`,1.4,`#1f2937`),
  txt(140,47,`河川敷サイト (砂利)`,2,`#fef3c7`),txt(60,__tyZ(A.riv,60)+1,`有田川`,2.2,`#cffafe`),txt(150,__tyZ(A.road,150)+1,`県道`,1.6)]})}
