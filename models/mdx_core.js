function __mdx(G,it,tx,anim){
const PI=Math.PI;
const lerp=(a,b,t)=>a+(b-a)*t;
const ss=(a,b,x)=>{let t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
__domeTex();
if(!window.__mdxText){
 let m=document.createElement('canvas');m.width=512;m.height=96;let g=m.getContext('2d');
 g.fillStyle='#6b7280';g.font='italic 40px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Tough Screen 2room Air/MDX+',256,48);
 window.__mdxText=new Xa(m);
 let o=document.createElement('canvas');o.width=256;o.height=96;g=o.getContext('2d');
 g.strokeStyle='#7b8490';g.lineWidth=4;g.beginPath();g.roundRect(8,8,240,80,16);g.stroke();g.fillStyle='#7b8490';g.font='italic bold 50px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Coleman',128,50);
 window.__mdxOutline=new Xa(o);
}
const ZR=-2.8,ZF=2.8,ZI0=-2.62,ZI1=-.12;
const mFly=new Q({map:window.__domeFab,color:'#f0f3f7',roughness:.7,metalness:.02,side:2});
const mFlyD=new Q({color:'#e4e8ee',roughness:.8,side:2});
const mLine=new Q({color:'#15171a',roughness:.85,side:2});
const mRed=new Q({color:'#d11a2a',roughness:.55});
const mAlu=new Q({color:'#cfd5db',metalness:.9,roughness:.28});
const mBlack=new Q({color:'#17191c',roughness:.7,metalness:.2});
const mMesh=new Q({map:window.__domeMesh,color:'#a3aab3',roughness:.9,transparent:!0,opacity:.5,side:2,depthWrite:!1});
const mSil=new Q({color:'#d5dbe3',metalness:.95,roughness:.18});
const mWL=new ua({color:'#ffffff'});
const HH=z=>{
 if(z<-1.9)return lerp(1.5,1.82,ss(-2.8,-1.9,z));
 if(z<-.9)return lerp(1.82,1.78,ss(-1.9,-.9,z));
 if(z<.7)return lerp(1.78,2.15,ss(-.9,.7,z));
 if(z<2.0)return lerp(2.15,2.12,ss(.7,2.0,z));
 return lerp(2.12,1.78,ss(2.0,2.8,z))};
const prof=z=>[1.7*(1-.04*ss(1.9,2.8,Math.abs(z))),HH(z),.34];
const profI=z=>[1.5,Math.min(1.75,HH(z)-.08),.42];
const mkSp=P=>(z,th,off=0)=>{let[W,H,q]=P(z),s=Math.max(0,Math.sin(th));return[-(W+off)*Math.cos(th),H*Math.pow(s,q)+off*s,z]};
const sp=mkSp(prof),spI=mkSp(profI);
const yAt=(z,th)=>{let[W,H,q]=prof(z);return H*Math.pow(Math.max(0,Math.sin(th)),q)};
const thFor=(z,y)=>{let[W,H,q]=prof(z);return Math.asin(Math.min(1,Math.pow(y/H,1/q)))};
const pt=(z,y,sd,off)=>{let t=thFor(z,y);return sp(z,sd<0?t:PI-t,off)};
function surf(S,nz,nt,z0,z1,t0,t1,off,uvs,skip){
 let pos=[],uv=[],idx=[];
 for(let i=0;i<=nz;i++){let z=lerp(z0,z1,i/nz);for(let j=0;j<=nt;j++){let th=lerp(t0,t1,j/nt),p=S(z,th,off);pos.push(p[0],p[1],p[2]);uv.push(th/PI*3*uvs,(z-ZR)*uvs)}}
 for(let i=0;i<nz;i++)for(let j=0;j<nt;j++){
  if(skip&&skip(lerp(z0,z1,(i+.5)/nz),lerp(t0,t1,(j+.5)/nt)))continue;
  let a=i*(nt+1)+j,b=(i+1)*(nt+1)+j,c=b+1,d=a+1;idx.push(a,b,d,b,c,d)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();return g}
const add=(geo,mat,cast,recv)=>{let m=new Z(geo,mat);if(cast)m.castShadow=!0;if(recv)m.receiveShadow=!0;G.add(m);return m};
const tube=(pts,r,mat,seg)=>add(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2])),!1),seg||Math.max(8,pts.length*3),r,6,!1),mat);
/* ---- side doors (large mesh openings on both long sides of the living room) ---- */
const OZ0=-.02,OZ1=2.42,OY0=.2,OY1=1.68;
const inOpen=(z,th)=>{if(z<OZ0||z>OZ1)return!1;let t=Math.min(th,PI-th);if(t>.45*PI)return!1;let y=yAt(z,t);return y>OY0&&y<OY1};
/* ---- hull ---- */
add(surf(sp,150,150,ZR,ZF,0,PI,0,1.2,inOpen),mFly,!0,!0);
add(surf(sp,60,60,ZR,ZF,0,PI,-.012,1,(z,th)=>inOpen(z,th)),mLine);
[1].forEach(()=>add(surf(sp,60,150,ZR,ZF,0,PI,-.016,.5,(z,th)=>!inOpen(z,th)),mMesh));
/* ---- end caps ---- */
const capFan=(S,z,mat,sx,sy,y0,dz,uvs)=>{
 let pos=[0,y0,z+dz],uv=[.5,.3],idx=[],N=70;
 for(let j=0;j<=N;j++){let p=S(z,j/N*PI,0);pos.push(p[0]*sx,y0+(p[1]-y0)*sy,z+dz);uv.push((p[0]*sx+2)*uvs,(y0+(p[1]-y0)*sy)*uvs)}
 for(let j=0;j<N;j++)idx.push(0,j+1,j+2);
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();return add(g,mat,!1,!0)};
/* front: fly ring + big mesh panel */
{
 let pos=[],uv=[],idx=[],N=70;const sx=.9,sy=.84,y0=.16;
 for(let j=0;j<=N;j++){let p=sp(ZF,j/N*PI,0);pos.push(p[0],p[1],ZF,p[0]*sx,y0+(p[1]-y0)*sy,ZF);uv.push(j/N,0,j/N,.3)}
 for(let j=0;j<N;j++){let a=j*2,b=a+1,c=a+2,d=a+3;idx.push(a,b,c,b,d,c)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();add(g,mFly,!0,!0);
 let sl=add(new eo(2*1.63,.18,.03),mFly,!0,!0);sl.position.set(0,.08,ZF-.0);
 capFan(sp,ZF,mMesh,sx,sy,y0,.002,.3);
 /* red piping around the mesh panel */
 let r=[];for(let j=0;j<=40;j++){let p=sp(ZF,j/40*PI,0);r.push([p[0]*sx,y0+(p[1]-y0)*sy,ZF+.012])}r.push([r[0][0],y0,ZF+.012]);tube(r,.0065,mRed,90);
 let lp=new Z(new Io(.3,.11),new ua({map:window.__mdxOutline,transparent:!0,side:2,depthWrite:!1}));lp.position.set(-.85,1.22,ZF+.016);G.add(lp);
}
/* rear: sleeping room end wall with a big window */
{
 capFan(sp,ZR,mFly,1,1,0,0,.4);
 let wm=add(new Io(1.5,.78),mMesh);wm.position.set(0,.98,ZR-.006);wm.rotation.y=PI;
 let wf=[];[[-.75,.59],[.75,.59],[.75,1.37],[-.75,1.37],[-.75,.59]].forEach(p=>wf.push([p[0],p[1],ZR-.012]));tube(wf,.013,new Q({color:'#9aa2ab',roughness:.6}),20);
 let wl=add(new Io(1.52,.8),new Q({color:'#14171a',roughness:.9,side:2}));wl.position.set(0,.98,ZR-.002);
}
/* ---- frame : aluminum arches + ridge, red piping on seams ---- */
{
 [-2.62,-1.5,-.12,1.15,2.5].forEach(z=>{let pts=[];for(let i=0;i<=44;i++)pts.push(sp(z,PI*i/44,.014));tube(pts,.0105,mAlu,90)});
 let ridge=[];for(let i=0;i<=40;i++)ridge.push(sp(lerp(ZR+.05,ZF-.05,i/40),.5*PI,.014));tube(ridge,.0105,mAlu,100);
 /* step seam between sleeping and living roofs */
 let sm=[];for(let i=0;i<=44;i++)sm.push(sp(-.55,PI*i/44,.018));tube(sm,.0065,mRed,90);
 [-1,1].forEach(sd=>{
  /* door edge piping + posts + roll-up bar */
  let lo=[];[[OZ0,OY0],[OZ1,OY0],[OZ1,OY1],[OZ0,OY1],[OZ0,OY0]].forEach(([z,y],k)=>{
   let n=k===1||k===2?10:0;lo.push(pt(z,y,sd,.01))});
  let edge=[];
  const seg=(z0,y0,z1,y1)=>{let a=[];for(let i=0;i<=16;i++){let t=i/16;a.push(pt(lerp(z0,z1,t),lerp(y0,y1,t),sd,.012))}tube(a,.0065,mRed,32)};
  seg(OZ0,OY0,OZ1,OY0);seg(OZ1,OY0,OZ1,OY1);seg(OZ1,OY1,OZ0,OY1);seg(OZ0,OY1,OZ0,OY0);
  let bar=[];for(let i=0;i<=12;i++)bar.push(pt(lerp(OZ0,OZ1,i/12),OY1+.02,sd,.03));tube(bar,.019,new Q({color:'#e6e9ee',roughness:.5}),24);
  [OZ0+.01,OZ1-.01,1.2].forEach(z=>{let a=[];for(let i=0;i<=10;i++)a.push(pt(z,lerp(.0,OY1+.06,i/10)+.001,sd,.02));tube(a,.0095,mAlu,20)});
  /* logo patch low on the wall */
  let m=new Z(new Io(.4,.2),new ua({map:window.__domeLogo,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));
  let p=pt(2.62,.52,sd,.016),p2=pt(2.62,.52,sd,.11);m.position.set(p[0],p[1],p[2]);m.lookAt(p[0]+(p2[0]-p[0]),p[1]+(p2[1]-p[1]),p[2]);G.add(m);
  let tt=new Z(new Io(.62,.12),new ua({map:window.__mdxText,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));
  p=pt(-1.5,1.45,sd,.016);p2=pt(-1.5,1.45,sd,.11);tt.position.set(p[0],p[1],p[2]);tt.lookAt(p[0]+(p2[0]-p[0]),p[1]+(p2[1]-p[1]),p[2]);G.add(tt)});
}
/* ---- valance skirt on the ground ---- */
{
 let sk=new Q({color:'#e4e8ee',roughness:.9,side:2});
 [-1,1].forEach(sd=>{let b=add(new eo(.3,.012,5.6),sk,!1,!0);b.position.set(sd*1.8,.008,0);b.rotation.z=sd*.05});
 [-1,1].forEach(sd=>{let b=add(new eo(3.9,.012,.3),sk,!1,!0);b.position.set(0,.008,sd*2.92);b.rotation.x=-sd*.05});
}
/* ---- inner tent (sleeping room) ---- */
{
 add(surf(spI,70,50,ZI0,ZI1,0,PI,0,1),new Q({color:'#3a3f47',roughness:.9,side:2}),!1,!0);
 capFan(spI,ZI0,new Q({color:'#22262b',roughness:.9,side:2}),1,1,0,0,.3);
 let door=capFan(spI,ZI1,new Q({color:'#30353b',roughness:.9,side:2}),1,1,0,.003,.3);
 /* inner door : mesh panel + zip + logo */
 capFan(spI,ZI1,new Q({map:window.__domeMesh,color:'#3b4047',transparent:!0,opacity:.85,side:2}),.62,.7,.1,.008,.3);
 let ph=new Z(new Io(.42,.16),new ua({map:window.__mdxOutline,transparent:!0,side:2,depthWrite:!1}));ph.position.set(.65,1.55,ZI1+.014);G.add(ph);
 let pl=new Z(new Io(.4,.2),new ua({map:window.__domeLogo,transparent:!0,side:2,depthWrite:!1}));pl.position.set(-.7,1.35,ZI1+.014);G.add(pl);
 /* floors */
 let fl=add(new eo(3.34,.022,5.56),new Q({color:'#8f959c',roughness:.95}),!1,!0);fl.position.set(0,.011,0);
 let fi=add(new eo(2.98,.03,ZI1-ZI0),new Q({color:'#20242a',roughness:.95}),!1,!0);fi.position.set(0,.02,(ZI0+ZI1)/2);
 let mC=new Q({color:'#47505e',roughness:.85});
 [-1.05,-.35,.35,1.05].forEach(x=>{let t=add(new eo(.62,.05,2.0),mC,!0,!0);t.position.set(x,.07,-1.35);let p=add(new eo(.4,.05,.24),new Q({color:'#c7ccd3',roughness:.9}),!0);p.position.set(x,.12,-2.3)});
}
/* ---- front canopy flap with two steel poles ---- */
{
 const CX=1.6,CZ=ZF+1.9,y0=1.72,y1=1.84;
 let pos=[],idx=[],uv=[];const NT=10,NS=14;
 for(let i=0;i<=NT;i++){let t=i/NT;for(let j=0;j<=NS;j++){let s=j/NS*2-1,x=s*lerp(1.55,CX,t),y=lerp(y0,y1,t)-.045*Math.sin(PI*t)*(1-s*s*.5);pos.push(x,y,lerp(ZF,CZ,t));uv.push((s+1)*1.2,t*1.5)}}
 for(let i=0;i<NT;i++)for(let j=0;j<NS;j++){let a=i*(NS+1)+j,b=(i+1)*(NS+1)+j,c=b+1,d=a+1;idx.push(a,b,d,b,c,d)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();
 add(g,new Q({map:window.__domeFab,color:'#f0f3f7',roughness:.7,side:2}),!0,!0);
 let eg=[];for(let j=0;j<=14;j++){let s=j/14*2-1;eg.push([s*CX,y1-.03*(1-s*s),CZ])}tube(eg,.01,mFlyD,28);
 let Re=it.ropeMargin||1,tb=new eo(.016,.036,.008),peg=new to(.011,.011,.24,6),mT=new Q({color:'#d11a2a',metalness:.4,roughness:.4});
 const rope=(a,b)=>{let p=new J(a[0],a[1],a[2]),q=new J(b[0],b[1],b[2]),l=new La(new Qi().setFromPoints([p,q]),mWL);G.add(l);
  let m=new Z(tb,mT);m.position.lerpVectors(p,q,.5);m.lookAt(q);G.add(m);
  let pg=new Z(peg,mSil);pg.position.set(b[0],.08,b[2]);pg.rotation.z=b[0]<0?-.28:.28;pg.rotation.x=b[2]>0?.25:-.25;G.add(pg)};
 [-1,1].forEach(sd=>{
  let h=y1+.02,pl=add(new to(.0105,.0105,h,10),mBlack,!0);pl.position.set(sd*CX,h/2,CZ);
  let cp=add(new to(.017,.017,.03,10),mSil);cp.position.set(sd*CX,h,CZ);
  rope([sd*CX,h,CZ],[sd*(CX+Re*.85),0,CZ+Re*1.0]);rope([sd*CX,h,CZ],[sd*(CX+Re*.5),0,CZ-Re*.9]);
  [-2.35,-1.2,.2,1.6,2.5].forEach(z=>{let a=pt(z,.8,sd,.012);rope(a,[a[0]+sd*Re*.95,0,z+(z>ZF-.5?.5:0)])});
  rope(pt(ZF,.9,sd,.012),[sd*(1.7+Re*.7),0,ZF+Re*.8]);rope(pt(ZR,.9,sd,.012),[sd*(1.6+Re*.7),0,ZR-Re*.8])});
 rope([0,1.45,ZR-.002],[0,0,ZR-Re*1.1]);
}
}
