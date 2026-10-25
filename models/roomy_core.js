function __tent(G,it,tx,anim){
const PI=Math.PI,Zr=-2.45,Zf=1.85;
const lerp=(a,b,t)=>a+(b-a)*t;
const ss=(a,b,x)=>{let t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
/* ---- fabric texture (cached) ---- */
if(!window.__tentFab){
 let c=document.createElement('canvas');c.width=c.height=256;let g=c.getContext('2d');
 g.fillStyle='#dcc4a1';g.fillRect(0,0,256,256);
 for(let i=0;i<5000;i++){g.fillStyle=Math.random()>.5?'rgba(255,248,235,0.07)':'rgba(70,50,30,0.06)';g.fillRect(Math.random()*256,Math.random()*256,2,2)}
 g.strokeStyle='rgba(90,70,50,0.07)';g.lineWidth=1;
 for(let i=0;i<256;i+=8){g.beginPath();g.moveTo(i,0);g.lineTo(i,256);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(256,i);g.stroke()}
 let t=new Xa(c);t.wrapS=ze;t.wrapT=ze;t.repeat.set(1.6,1.6);window.__tentFab=t;
}
const fabTex=window.__tentFab;
/* ---- materials ---- */
const mFab=new Q({map:fabTex,color:'#ffffff',roughness:.78,metalness:.02,side:2});
const mFab2=new Q({map:fabTex,color:'#e9d9bf',roughness:.8,metalness:.02,side:2,emissive:'#3b3022'});
const mUnder=new Q({color:'#8d7a62',roughness:.9,side:2});
const mDark=new Q({color:'#3a3733',roughness:.7,metalness:.15,side:2});
const mSleeve=new Q({color:'#5e5348',roughness:.85,side:2});
const mBlack=new Q({color:'#141416',metalness:.85,roughness:.25});
const mSilver=new Q({color:'#d5dbe3',metalness:.95,roughness:.18});
const mMesh=new Q({map:tx.mesh||void 0,color:'#5b5047',roughness:.9,transparent:!0,opacity:.72,side:2,depthWrite:!1});
const mRing=new Q({color:'#2d2924',roughness:.8,side:2});
const mWhiteLine=new ua({color:'#ffffff'});
/* ---- hull profile ---- */
const Ws=1.13,Hs=1.3,Wl=1.3,Hl=1.7;
function prof(z){
 let W,H,q;
 if(z<-1.55){let t=(-1.55-z)/(-1.55-Zr),k=Math.sqrt(Math.max(0,1-t*t));W=Ws*Math.pow(k,.8);H=Hs*Math.pow(k,.9);q=.72}
 else if(z<-.45){W=Ws;H=Hs+.03*Math.sin((z+1.55)/1.1*PI);q=.72}
 else if(z<.3){let s=ss(-.45,.3,z);W=lerp(Ws,Wl,s);H=lerp(Hs,Hl,s);q=lerp(.72,.62,s)}
 else if(z<1.15){W=Wl;H=Hl;q=.62}
 else{let t=(z-1.15)/(Zf-1.15);W=Wl*(1-.06*t);H=Hl*(1-.2*t*t);q=.62}
 return[W,H,q]}
const sp=(z,th,off=0)=>{let[W,H,q]=prof(z),s=Math.max(0,Math.sin(th));return[-(W+off)*Math.cos(th),H*Math.pow(s,q)+off*s,z]};
function surf(nz,nt,z0,z1,t0,t1,off,skip,uvs){
 let pos=[],uv=[],idx=[];
 for(let i=0;i<=nz;i++){let z=lerp(z0,z1,i/nz);for(let j=0;j<=nt;j++){let th=lerp(t0,t1,j/nt),p=sp(z,th,off);pos.push(p[0],p[1],p[2]);uv.push(th/PI*2.8*uvs,(z-Zr)*uvs)}}
 for(let i=0;i<nz;i++)for(let j=0;j<nt;j++){
  let zc=lerp(z0,z1,(i+.5)/nz),tc=lerp(t0,t1,(j+.5)/nt);
  if(skip&&skip(zc,tc))continue;
  let a=i*(nt+1)+j,b=(i+1)*(nt+1)+j,c=(i+1)*(nt+1)+j+1,d=i*(nt+1)+j+1;idx.push(a,b,d,b,c,d)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();return g}
const add=(geo,mat,cast,recv)=>{let m=new Z(geo,mat);if(cast)m.castShadow=!0;if(recv)m.receiveShadow=!0;G.add(m);return m};
const tube=(pts,r,mat,seg,closed)=>add(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2])),closed),seg||Math.max(8,pts.length*3),r,6,!!closed),mat);
/* ---- side window mask (superellipse) ---- */
const WIN={zc:.72,a:.8,tc:.16*PI,b:.14*PI};
const inWin=(z,th)=>{let t=Math.min(th,PI-th),tp=t<=WIN.tc?0:Math.pow((t-WIN.tc)/WIN.b,4);return Math.pow(Math.abs(z-WIN.zc)/WIN.a,4)+tp<=1};
/* ---- hull ---- */
add(surf(300,150,Zr,Zf,0,PI,0,inWin,1),mFab,!0,!0);
/* window mesh + frame */
let winMeshL=surf(160,80,WIN.zc-WIN.a-.02,WIN.zc+WIN.a+.02,0,PI,-.012,(z,t)=>!(inWin(z,t)&&Math.min(t,PI-t)>WIN.tc),5);
add(winMeshL,mMesh);
/* window frame (superellipse outline) on both sides */
[0,1].forEach(sd=>{let pts=[];for(let i=0;i<=120;i++){let a=i/120*2*PI,c=Math.cos(a),sn=Math.sin(a),e=.25;let zz=WIN.zc+WIN.a*Math.sign(c)*Math.pow(Math.abs(c),e),tt=WIN.tc+WIN.b*(.5+.5*Math.sign(sn)*Math.pow(Math.abs(sn),e));let th=sd?PI-tt:tt;pts.push(sp(zz,th,.006))}tube(pts,.011,mSleeve,240,!0)});
/* inner-tent Coleman patch visible through window */
if(tx.logoOval){[.3*PI,.7*PI].forEach((th,k)=>{let m=new Z(new Io(.3,.15),new ua({map:tx.logoOval,transparent:!0,side:2,depthWrite:!1}));let p=sp(WIN.zc-.2,th,-.03);m.position.set(p[0],p[1],p[2]);m.rotation.y=k?-PI/2:PI/2;G.add(m)})}

/* ---- dark ridge band ---- */
add(surf(110,8,-1.9,1.4,.465*PI,.535*PI,.004,null,1),new Q({color:'#4b4037',roughness:.8,side:2}));
/* ---- arch ribs / sleeves ---- */
const rib=(z,off,r,mat,t0=.0,t1=PI)=>{let pts=[];for(let i=0;i<=40;i++)pts.push(sp(z,lerp(t0,t1,i/40),off));return tube(pts,r,mat,80)};
[-1.95,-1.12].forEach(z=>rib(z,.01,.017,mSleeve));
rib(-.15,.012,.02,mSleeve);
rib(1.55,.012,.02,mSleeve);
rib(Zf-.01,.014,.024,mDark);
/* front-left corner pole accent (vertical leg of front arch) */
/* ---- logos ---- */
const place=(mesh,z,th,off,roll)=>{let p=sp(z,th,off),p2=sp(z,th,off+.1),n=new J(p2[0]-p[0],p2[1]-p[1],0).normalize();mesh.position.set(p[0],p[1],p[2]);mesh.lookAt(p[0]+n.x,p[1]+n.y,p[2]);if(roll)mesh.rotateZ(roll);G.add(mesh)};
if(tx.logoBig){[-1,1].forEach(side=>{let m=new Z(new Io(.95,.47),new ua({map:tx.logoBig,transparent:!0,opacity:.95,side:2,depthWrite:!1}));place(m,.78,side<0?.39*PI:.61*PI,.014,0)})}
/* ---- front: border ring + mesh door ---- */
{
 let[Wf,Hf,qf]=prof(Zf);
 const arcp=(k,th,v)=>{let s=Math.max(0,Math.sin(th)),inner=k<1,qq=inner?.34:qf;return[-(Wf*k)*Math.cos(th),Hf*(inner?.92:1)*Math.pow(s,qq)*v,Zf]};
 /* fabric border between outer and inner arc */
 let pos=[],idx=[],uv=[];const N=60;
 for(let j=0;j<=N;j++){let th=j/N*PI,o=arcp(1,th,1),i2=arcp(.9,th,1);pos.push(o[0],o[1],o[2],i2[0],i2[1],i2[2]);uv.push(th,0,th,.3)}
 for(let j=0;j<N;j++){let a=j*2,b=a+1,c=a+2,d=a+3;idx.push(a,b,c,b,d,c)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();add(g,mFab,!0,!0);
 /* sill */
 add(new eo(2*Wf*.9+.04,.03,.06),mBlack).position.set(0,.03,Zf-.03);
 }
/* ---- front door flap (right) + rolled left panel ---- */
{
 let[Wf,Hf,qf]=prof(Zf);const archY=x=>{let c=Math.min(1,Math.abs(x)/Wf);return Hf*Math.pow(Math.sqrt(1-c*c),qf)*.0+Hf*Math.pow(Math.max(0,Math.sin(Math.acos(c))),qf)};
 const flap=(x0,x1,logo)=>{let pos=[],uv=[],idx=[],NX=40,NY=40;
  for(let i=0;i<=NX;i++){let x=lerp(x0,x1,i/NX),yt=archY(x)*.985;for(let j=0;j<=NY;j++){let y=yt*j/NY,b=.1*Math.sin(Math.PI*i/NX)*Math.pow(1-j/NY,.5)+.02*Math.sin(Math.PI*j/NY);pos.push(x,y+.02,Zf+.015+b);uv.push(i/NX*1.5,j/NY*1.5)}}
  for(let i=0;i<NX;i++)for(let j=0;j<NY;j++){let a=i*(NY+1)+j,b=(i+1)*(NY+1)+j,c=b+1,d=a+1;idx.push(a,b,d,b,c,d)}
  let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();return g};
 add(flap(.12*Wf,Wf*.995),mFab,!0,!0);
 /* vertical zipper edge + seams */
 {let pts=[];for(let j=0;j<=24;j++){let y=archY(.12*Wf)*.985*j/24;pts.push([.12*Wf,y+.02,Zf+.015+.02*Math.sin(Math.PI*j/24)])}tube(pts,.012,mDark,48)}
 if(tx.logoPatch){let m=new Z(new Io(.5,.25),new ua({map:tx.logoPatch,transparent:!0,side:2,depthWrite:!1}));m.position.set(.58*Wf,.3,Zf+.13);G.add(m)}
 /* left panel gathered/rolled to the side with tie band */
 {let pts=[],base=-.34*Wf;for(let j=0;j<=24;j++){let y=archY(base)*.97*j/24;pts.push([base-.04*Math.sin(Math.PI*j/24),y+.03,Zf+.05])}tube(pts,.07,mFab,60);[.3,.62].forEach(k=>{let y=archY(base)*.97*k;let b=add(new zo(.075,.01,6,16),mDark);b.position.set(base-.04*Math.sin(Math.PI*k),y+.03,Zf+.05);b.rotation.x=PI/2})}
 /* Coleman + model name on front crown */
 if(tx.logoBig){let m=new Z(new Io(1.0,.5),new ua({map:tx.logoBig,transparent:!0,opacity:.95,side:2,depthWrite:!1}));let p=sp(Zf-.005,.5*PI,.012);m.position.set(0,p[1]-.22,Zf+.02);G.add(m)}
}
/* ---- canopy flap ---- */
const CP={x:1.04,z1:3.22,y0:1.3,y1:1.74};
{
 let pos=[],idx=[],uv=[];const NS=16,NT=16;
 for(let i=0;i<=NT;i++){let t=i/NT;for(let j=0;j<=NS;j++){let s=j/NS*2-1,rr=sp(Zf,lerp(.2*PI,.8*PI,(s+1)/2),.025),fx=s*(CP.x+.02),y=lerp(rr[1],CP.y1,Math.pow(t,.92))-.05*Math.sin(PI*t)-.025*(1-s*s)*Math.sin(PI*t*.5+.2);pos.push(lerp(rr[0],fx,t),y,lerp(rr[2],CP.z1,t));uv.push((s+1)*1.2,t*1.5)}}
 for(let i=0;i<NT;i++)for(let j=0;j<NS;j++){let a=i*(NS+1)+j,b=(i+1)*(NS+1)+j,c=b+1,d=a+1;idx.push(a,b,d,b,c,d)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();add(g,mFab2,!0,!0);{let gu=g.clone();let up=new Z(gu,new Q({color:'#3b3a3a',roughness:.85,side:1}));up.position.y=-.006;up.castShadow=!0;G.add(up)}
 /* hem + seam edges */
 let edgeF=[];for(let j=0;j<=16;j++){let s=j/16*2-1;edgeF.push([s*(CP.x+.02),CP.y1-.003-.0,CP.z1])}
 tube(edgeF,.011,mSleeve,24);
 {let r0=sp(Zf,.2*PI,.025);tube([r0,[-CP.x-.02,CP.y1,CP.z1]],.01,mSleeve,8);let arc=[];for(let i=0;i<=24;i++)arc.push(sp(Zf,lerp(.2*PI,.8*PI,i/24),.03));tube(arc,.016,mDark,48)}
 {let r1=sp(Zf,.8*PI,.025);tube([r1,[CP.x+.02,CP.y1,CP.z1]],.01,mSleeve,8)}
 /* poles */
 [-1,1].forEach(sd=>{
  let x=sd*(CP.x+.02),h=CP.y1+.04;
  let p=add(new to(.012,.012,h,10),mBlack,!0);p.position.set(x,h/2,CP.z1);
  let cap=add(new to(.018,.018,.03,10),mSilver);cap.position.set(x,h-.01,CP.z1);
  let cn=add(new no(.014,.04,8),mBlack);cn.position.set(x,h+.03,CP.z1)});
}
/* ---- inner room (sleeping) ---- */
{
 let mIn=new Q({color:'#38322c',roughness:.88,side:2}),mFloor=new Q({color:'#1a1f26',roughness:.95});
 let fl=add(new eo(2.0,.06,1.5),mFloor,!1,!0);fl.position.set(0,.03,-1.32);
 let dome=add(new to(.95,.95,1.5,24,1,!1,0,PI),mIn,!1,!0);dome.rotation.x=PI/2;dome.rotation.y=PI;dome.scale.set(1,1,1.0/.95);dome.position.set(0,.02,-1.32);
 let mC=new Q({color:'#334155',roughness:.82}),mL=new Q({color:'#94a3b8',metalness:.85,roughness:.25}),mP=new Q({color:'#e2e8f0',roughness:.7});
 [-.46,.46].forEach(x=>{
  let t=add(new eo(.55,.07,1.38),mC,!0,!0);t.position.set(x,.1,-1.32);
  let r=new to(.01,.01,1.38,8);[-.26,.26].forEach(dx=>{let m=add(r,mL);m.rotation.x=PI/2;m.position.set(x+dx,.1,-1.32)});
  let pil=add(new eo(.42,.05,.22),mP);pil.position.set(x,.15,-1.9)});
 let wall=add(new Io(1.9,1.0),new Q({color:'#2b2520',roughness:.85,side:2}));wall.position.set(0,.5,-.55);
 if(tx.logoOval){let m=new Z(new Io(.42,.2),new ua({map:tx.logoOval,transparent:!0,side:2,depthWrite:!1}));m.position.set(0,.62,-.545);G.add(m)}
}
/* ---- lantern ---- */
{
 let ring=add(new zo(.025,.005,6,12,PI*1.5),new Q({color:'#f59e0b',metalness:.8}));ring.position.set(0,1.62,.7);
 let body=add(new to(.04,.04,.08,10),new Q({color:'#166534',roughness:.4,metalness:.2}));body.position.set(0,1.54,.7);
 let bulb=add(new Ro(.035,10,8),new ua({color:'#fef08a'}));bulb.position.set(0,1.5,.7);
 let L=new Ns('#fed7aa',.85,4.5);L.position.set(0,1.48,.7);G.add(L);anim.push({light:L,baseIntensity:.85,speed:1,type:'lantern'})}
/* ---- base trim / skirt ---- */
[0,PI].forEach(th=>{let pts=[];for(let i=0;i<=30;i++){let z=lerp(-1.7,Zf,i/30);pts.push(sp(z,th,.006))}tube(pts,.012,new Q({color:'#2a2622',roughness:.8}),60)});
/* ---- guy lines + pegs ---- */
{
 let Re=it.ropeMargin||.9,tb=new eo(.016,.038,.008),peg=new to(.012,.012,.24,6);
 const rope=(a,b)=>{let p=new J(a[0],a[1],a[2]),q=new J(b[0],b[1],b[2]),l=new La(new Qi().setFromPoints([p,q]),mWhiteLine);G.add(l);
  let m=new Z(tb,new Q({color:'#d97706',metalness:.88,roughness:.22}));m.position.lerpVectors(p,q,.52);m.lookAt(q);G.add(m);
  let pg=new Z(peg,mSilver);pg.position.set(b[0],.08,b[2]);pg.rotation.z=b[0]<0?-.28:.28;pg.rotation.x=b[2]>0?.25:-.25;G.add(pg)};
 let pf=prof(Zf);
 [[-1,1.74,3.26],[1,1.74,3.26]].forEach(([sd,y,z])=>{let x=sd*(CP.x+.02);rope([x,y,z],[x+sd*.9,0,z+1.1]);rope([x,y,z],[x+sd*.15,0,z+1.9])});
 rope([-1.22,1.1,Zf],[-1.22-Re*.9,0,Zf+Re*.9]);rope([1.22,1.1,Zf],[1.22+Re*.9,0,Zf+Re*.9]);
 let a=sp(1.55,.2*PI,.02),b=sp(1.55,.8*PI,.02);rope(a,[a[0]-Re*.95,0,1.55+.1]);rope(b,[b[0]+Re*.95,0,1.55+.1]);
 a=sp(-.15,.25*PI,.02);b=sp(-.15,.75*PI,.02);rope(a,[a[0]-Re*.95,0,-.15]);rope(b,[b[0]+Re*.95,0,-.15]);
 a=sp(-1.95,.25*PI,.02);b=sp(-1.95,.75*PI,.02);rope(a,[a[0]-Re*.9,0,-1.95-.4]);rope(b,[b[0]+Re*.9,0,-1.95-.4]);
 let t=sp(Zr+.25,.5*PI,0);rope(t,[0,0,Zr-Re*.95]);
}
}