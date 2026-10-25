function __domeTex(){
const PI=Math.PI;
if(window.__domeFab)return;{
 let c=document.createElement('canvas');c.width=c.height=256;let g=c.getContext('2d');
 g.fillStyle='#ffffff';g.fillRect(0,0,256,256);
 for(let i=0;i<4500;i++){g.fillStyle=Math.random()>.5?'rgba(255,255,255,0.35)':'rgba(120,130,145,0.10)';g.fillRect(Math.random()*256,Math.random()*256,2,2)}
 g.strokeStyle='rgba(110,120,135,0.10)';g.lineWidth=1;
 for(let i=0;i<256;i+=6){g.beginPath();g.moveTo(i,0);g.lineTo(i,256);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(256,i);g.stroke()}
 let t=new Xa(c);t.wrapS=ze;t.wrapT=ze;t.repeat.set(2,2);window.__domeFab=t;
 /* Coleman logo patch */
 let l=document.createElement('canvas');l.width=512;l.height=256;g=l.getContext('2d');
 g.clearRect(0,0,512,256);
 g.fillStyle='#d11a2a';g.beginPath();g.roundRect(60,24,392,112,26);g.fill();
 g.strokeStyle='#fff';g.lineWidth=5;g.beginPath();g.roundRect(70,34,372,92,20);g.stroke();
 g.fillStyle='#fff';g.font='italic bold 78px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Coleman',256,82);
 g.fillStyle='#2d3238';g.font='bold 54px Arial,sans-serif';g.fillText('DARK ROOM',256,176);
 g.fillStyle='#4b5563';g.font='28px Arial,sans-serif';g.fillText('T E C H N O L O G Y',256,224);
 window.__domeLogo=new Xa(l);
 /* model text */
 let m=document.createElement('canvas');m.width=512;m.height=128;g=m.getContext('2d');
 g.fillStyle='#4b5563';g.font='italic 46px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Touring Dome Air/LX+',256,48);
 g.font='bold 34px Arial,sans-serif';g.fillText('DARK ROOM',256,100);
 window.__domeModel=new Xa(m);
 /* small Coleman patch on inner */
 let p=document.createElement('canvas');p.width=256;p.height=96;g=p.getContext('2d');
 g.fillStyle='#d11a2a';g.beginPath();g.roundRect(8,8,240,80,16);g.fill();g.fillStyle='#fff';g.font='italic bold 52px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Coleman',128,50);
 window.__domePatch=new Xa(p);
 /* mesh texture */
 let h=document.createElement('canvas');h.width=h.height=64;g=h.getContext('2d');g.fillStyle='#1a1d21';g.fillRect(0,0,64,64);g.strokeStyle='rgba(120,128,138,0.55)';g.lineWidth=1;
 for(let i=0;i<64;i+=4){g.beginPath();g.moveTo(i,0);g.lineTo(i,64);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(64,i);g.stroke()}
 let ht=new Xa(h);ht.wrapS=ht.wrapT=ze;ht.repeat.set(10,6);window.__domeMesh=ht;
}
}
function __dome(G,it,tx,anim){
const PI=Math.PI;
const lerp=(a,b,t)=>a+(b-a)*t;
const ss=(a,b,x)=>{let t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
/* ---- textures (cached) ---- */
__domeTex();
const ZR=-1.675,ZF=.9,ZV=1.675,ZI0=-1.125,ZI1=.675;
const mFly=new Q({map:window.__domeFab,color:'#f0f3f7',roughness:.68,metalness:.02,side:2});
const mLine=new Q({color:'#15171a',roughness:.85,side:2});
const mBlack=new Q({color:'#101214',roughness:.7,metalness:.2});
const mRed=new Q({color:'#d11a2a',roughness:.55});
const mSleeve=new Q({color:'#aab1b9',roughness:.8,side:2});
const mPole=new Q({color:'#eef1f4',roughness:.4,metalness:.3});
const mSil=new Q({color:'#d5dbe3',metalness:.95,roughness:.18});
const mWL=new ua({color:'#ffffff'});
/* ---- hull profile ---- */
function prof(z){
 let W,H,q=.66;const zb=-.95;
 if(z<zb){let t=(zb-z)/(zb-ZR),k=Math.sqrt(Math.max(0,1-t*t));W=1.05*Math.pow(k,.85);H=.98*Math.pow(k,.8)}
 else if(z<.3){let s=ss(zb,.3,z);W=1.05;H=lerp(.98,1.22,s)}
 else{let s=ss(.3,ZF,z);W=lerp(1.05,.99,s);H=lerp(1.22,1.1,s)}
 return[W,H,q]}
function profI(z){let[W,H]=prof(z);return[Math.min(1.0,W-.035),Math.min(1.12,H*.93),.7]}
const mkSp=P=>(z,th,off=0)=>{let[W,H,q]=P(z),s=Math.max(0,Math.sin(th));return[-(W+off)*Math.cos(th),H*Math.pow(s,q)+off*s,z]};
const sp=mkSp(prof),spI=mkSp(profI);
function surf(S,nz,nt,z0,z1,t0,t1,off,uvs){
 let pos=[],uv=[],idx=[];
 for(let i=0;i<=nz;i++){let z=lerp(z0,z1,i/nz);for(let j=0;j<=nt;j++){let th=lerp(t0,t1,j/nt),p=S(z,th,off);pos.push(p[0],p[1],p[2]);uv.push(th/PI*2.2*uvs,(z-ZR)*uvs)}}
 for(let i=0;i<nz;i++)for(let j=0;j<nt;j++){let a=i*(nt+1)+j,b=(i+1)*(nt+1)+j,c=b+1,d=a+1;idx.push(a,b,d,b,c,d)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();return g}
const add=(geo,mat,cast,recv)=>{let m=new Z(geo,mat);if(cast)m.castShadow=!0;if(recv)m.receiveShadow=!0;G.add(m);return m};
const tube=(pts,r,mat,seg)=>add(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2])),!1),seg||Math.max(8,pts.length*3),r,6,!1),mat);
/* ---- fly + dark lining ---- */
add(surf(sp,130,64,ZR,ZF,.0,PI,0,1),mFly,!0,!0);
add(surf(sp,60,40,ZR,ZF,.0,PI,-.012,1),mLine);
/* black skirt strips along both bottom edges + red piping */
[[0,.006*PI],[.994*PI,PI]].forEach(([a,b])=>add(surf(sp,40,3,ZR+.12,ZF,a,b,.003,1),mBlack));
[.0065*PI,.9935*PI].forEach(th=>{let pts=[];for(let i=0;i<=34;i++){let z=lerp(ZR+.2,ZF,i/34);pts.push(sp(z,th,.007))}tube(pts,.0075,mRed,70)});
/* ---- pole sleeves (cross frame) ---- */
{
 const pole=(zA,zB,r)=>{let pts=[];for(let i=0;i<=44;i++){let t=i/44,z=lerp(zA,zB,t),th=t*PI;pts.push(sp(z,th,.008))}tube(pts,r,mSleeve,90)};
 pole(-1.2,.72,.0155);pole(.72,-1.2,.0155);
 let pr=[];for(let i=0;i<=30;i++)pr.push(sp(-1.42,PI*i/30,.007));tube(pr,.012,mSleeve,60);
 let pf=[];for(let i=0;i<=30;i++)pf.push(sp(ZF-.012,PI*i/30,.011));tube(pf,.02,new Q({color:'#c4cad1',roughness:.7}),60);
 /* hem seam line at the front rim, dark binding inside */
 let pf2=[];for(let i=0;i<=30;i++)pf2.push(sp(ZF-.0,PI*i/30,-.005));tube(pf2,.012,mLine,60);
}
/* ---- dark vent patch near rear top (like the real model) ---- */
{
 let pos=[],idx=[];const N=12;
 const A=sp(-1.18,.22*PI,.006),B=sp(-1.18,.5*PI,.006),C=sp(-.82,.32*PI,.006);
 [A,B,C].forEach(p=>pos.push(p[0],p[1],p[2]));idx.push(0,2,1,0,1,2);
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setIndex(idx);g.computeVertexNormals();add(g,new Q({color:'#17191c',roughness:.85,side:2}));
 tube([A,C,B],.006,mRed,20);
}
/* ---- logos ---- */
const place=(mesh,z,th,off,roll)=>{let p=sp(z,th,off),p2=sp(z,th,off+.1),n=new J(p2[0]-p[0],p2[1]-p[1],0).normalize();mesh.position.set(p[0],p[1],p[2]);mesh.lookAt(p[0]+n.x,p[1]+n.y,p[2]);if(roll)mesh.rotateZ(roll);G.add(mesh)};
[-1,1].forEach(sd=>{
 let m=new Z(new Io(.4,.2),new ua({map:window.__domeLogo,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));place(m,.15,sd<0?.19*PI:.81*PI,.016,0);
 let t=new Z(new Io(.5,.125),new ua({map:window.__domeModel,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));place(t,-.45,sd<0?.33*PI:.67*PI,.016,sd<0?-.12:.12)});
/* ---- inner (black dark-room inner tent) ---- */
{
 add(surf(spI,70,40,ZI0,ZI1,.0,PI,0,1),new Q({color:'#16181b',roughness:.9,side:2}),!1,!0);
 /* back + front arches (flat caps) */
 const cap=(z,col,mapT)=>{let pos=[0,.01,z],uv=[.5,0],idx=[],N=40;for(let j=0;j<=N;j++){let p=spI(z,j/N*PI,0);pos.push(p[0],p[1],p[2]);uv.push(j/N,1)}for(let j=0;j<N;j++)idx.push(0,j+1,j+2);
  let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();
  return add(g,new Q({color:col,roughness:.9,side:2,map:mapT||null,transparent:!!mapT,opacity:mapT?.92:1}),!1,!0)};
 cap(ZI0,'#121417');
 cap(ZI1,'#1b1e22',window.__domeMesh);
 /* mesh door frame + zipper */
 let frame=[];for(let j=0;j<=40;j++)frame.push(spI(ZI1+.004,j/40*PI,.004));tube(frame,.011,new Q({color:'#2b2f35',roughness:.7}),80);
 tube([[0,.02,ZI1+.012],[0,spI(ZI1,PI/2,0)[1]-.03,ZI1+.012]],.006,new Q({color:'#6b7280',roughness:.5}),6);
 let pt=new Z(new Io(.2,.075),new ua({map:window.__domePatch,transparent:!0,side:2}));pt.position.set(.42,.88,ZI1+.016);G.add(pt);
 /* inner floor + vestibule floor */
 let fl=add(new eo(2.02,.02,ZF-ZI0+.02),new Q({color:'#14171a',roughness:.95}),!1,!0);fl.position.set(0,.01,(ZF+ZI0)/2);
 let rf=add(new eo(1.9,.012,.35),new Q({color:'#14171a',roughness:.95}),!1,!0);rf.position.set(0,.006,ZF+.17);
 /* sill / door step */
 let sil=add(new eo(1.9,.03,.05),mBlack);sil.position.set(0,.02,ZF-.02);
 /* sleeping mats (inner is 210 x 180 : 2-3 persons) */
 let mC=new Q({color:'#3a4350',roughness:.85});
 [-.64,0,.64].forEach(x=>{let t=add(new eo(.58,.05,1.62),mC,!0,!0);t.position.set(x,.055,-.28);let p=add(new eo(.34,.05,.2),new Q({color:'#c7ccd3',roughness:.9}),!0);p.position.set(x,.11,-.99)});
}
/* ---- canopy / front flap (propped out like the product photo) ---- */
const VX=1.12,VH=.74,VD=.26;
const rimP=s=>sp(ZF-.0,lerp(.1*PI,.9*PI,(s+1)/2),.012);
const edgeP=s=>{let a=1-s*s;return[s*VX,.02+VH*Math.pow(a,1.15),ZV-VD*a]};
{
 let pos=[],idx=[],uv=[];const NT=14,NS=28;
 for(let i=0;i<=NT;i++){let t=i/NT;for(let j=0;j<=NS;j++){let s=j/NS*2-1,r=rimP(s),e=edgeP(s);
  /* sag between rim and front edge */
  let y=lerp(r[1],e[1],Math.pow(t,.92))-.05*Math.sin(PI*t)*(1-s*s*.6);
  pos.push(lerp(r[0],e[0],t),y,lerp(r[2],e[2],Math.pow(t,1.05)));uv.push((s+1)*1.2,t*1.5)}}
 for(let i=0;i<NT;i++)for(let j=0;j<NS;j++){let a=i*(NS+1)+j,b=(i+1)*(NS+1)+j,c=b+1,d=a+1;idx.push(a,b,d,b,c,d)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();
 let top=new Z(g,new Q({map:window.__domeFab,color:'#f0f3f7',roughness:.68,side:0}));top.castShadow=!0;top.receiveShadow=!0;G.add(top);
 let und=new Z(g,new Q({color:'#17191c',roughness:.85,side:1}));und.position.y=-.004;G.add(und);
 /* bound edges */
 let ef=[];for(let j=0;j<=28;j++)ef.push(edgeP(j/28*2-1));tube(ef,.011,mLine,56);
 let eL=[],eR=[];for(let i=0;i<=10;i++){let t=i/10,r=rimP(-1),e=edgeP(-1);eL.push([lerp(r[0],e[0],t),lerp(r[1],e[1],Math.pow(t,.92))-.05*Math.sin(PI*t)*.4,lerp(r[2],e[2],Math.pow(t,1.05))]);r=rimP(1);e=edgeP(1);eR.push([lerp(r[0],e[0],t),lerp(r[1],e[1],Math.pow(t,.92))-.05*Math.sin(PI*t)*.4,lerp(r[2],e[2],Math.pow(t,1.05))])}
 tube(eL,.007,mRed,30);tube(eR,.007,mRed,30);
 /* front prop pole in the middle + corner stakes */
 let e0=edgeP(0),pl=add(new to(.0105,.0105,e0[1]+.02,10),mPole,!0);pl.position.set(0,(e0[1]+.02)/2,e0[2]);
 let cp=add(new to(.016,.016,.02,10),mSil);cp.position.set(0,e0[1]+.02,e0[2]);
 /* ---- guy lines + pegs ---- */
 let Re=it.ropeMargin||.9,tb=new eo(.016,.036,.008),peg=new to(.011,.011,.24,6),mT=new Q({color:'#d11a2a',metalness:.4,roughness:.4});
 const rope=(a,b)=>{let p=new J(a[0],a[1],a[2]),q=new J(b[0],b[1],b[2]),l=new La(new Qi().setFromPoints([p,q]),mWL);G.add(l);
  let m=new Z(tb,mT);m.position.lerpVectors(p,q,.5);m.lookAt(q);G.add(m);
  let pg=new Z(peg,mSil);pg.position.set(b[0],.08,b[2]);pg.rotation.z=b[0]<0?-.28:.28;pg.rotation.x=b[2]>0?.25:-.25;G.add(pg)};
 [-1,1].forEach(sd=>{
  let t=edgeP(sd);rope(t,[sd*(VX+Re*.75),0,ZV+Re*.85]);
  let a=sp(-.15,sd<0?.1*PI:.9*PI,.01);rope(a,[a[0]+sd*Re*.95,0,-.15]);
  a=sp(.72,sd<0?.06*PI:.94*PI,.01);rope(a,[a[0]+sd*Re*.85,0,.72+Re*.35]);
  a=sp(-1.3,sd<0?.12*PI:.88*PI,.01);rope(a,[a[0]+sd*Re*.8,0,-1.3-Re*.6])});
 let tp=sp(-1.5,.5*PI,.01);rope(tp,[0,0,ZR-Re*.95]);
}
}
