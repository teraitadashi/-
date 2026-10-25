function __wagon(G,it,tx,anim){
const PI=Math.PI;
if(!window.__wagonLogo){
 let l=document.createElement('canvas');l.width=512;l.height=256;let g=l.getContext('2d');
 g.strokeStyle='#ffffff';g.lineWidth=9;g.beginPath();g.roundRect(30,40,452,176,34);g.stroke();
 g.lineWidth=4;g.beginPath();g.roundRect(46,56,420,144,26);g.stroke();
 g.fillStyle='#ffffff';g.font='italic bold 100px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Coleman',256,132);
 window.__wagonLogo=new Xa(l);
 let f=document.createElement('canvas');f.width=f.height=128;g=f.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,128,128);
 for(let i=0;i<1800;i++){g.fillStyle=Math.random()>.5?'rgba(255,255,255,0.5)':'rgba(80,60,60,0.18)';g.fillRect(Math.random()*128,Math.random()*128,2,2)}
 g.strokeStyle='rgba(60,40,40,0.18)';for(let i=0;i<128;i+=4){g.beginPath();g.moveTo(i,0);g.lineTo(i,128);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(128,i);g.stroke()}
 let t=new Xa(f);t.wrapS=t.wrapT=ze;t.repeat.set(3,2);window.__wagonFab=t;
}
const mRed=new Q({map:window.__wagonFab,color:'#c4382c',roughness:.85,metalness:.02,side:2});
const mRedD=new Q({color:'#7d1a15',roughness:.9,side:2});
const mTube=new Q({color:'#c4301f',roughness:.45,metalness:.45});
const mBlack=new Q({color:'#17191c',roughness:.6,metalness:.4});
const mTyre=new Q({color:'#1b1c1e',roughness:.95});
const mHub=new Q({color:'#3a3d42',roughness:.5,metalness:.6});
const add=(geo,mat,cast,recv)=>{let m=new Z(geo,mat);if(cast)m.castShadow=!0;if(recv)m.receiveShadow=!0;G.add(m);return m};
const tube=(pts,r,mat,seg)=>add(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2])),!1),seg||Math.max(8,pts.length*4),r,8,!1),mat,!0);
const BW=.21,BL=.415,FY=.24,TY=.57;           /* bed half-width, half-length, floor, rim heights */
/* ---- bed : fabric box ---- */
add(new eo(2*BW,.012,2*BL),mRedD,!1,!0).position.set(0,FY,0);
[-1,1].forEach(sd=>{let s=add(new eo(.006,TY-FY,2*BL),mRed,!0,!0);s.position.set(sd*BW,(TY+FY)/2,0);
 let e=add(new eo(2*BW,TY-FY,.006),mRed,!0,!0);e.position.set(0,(TY+FY)/2,sd*BL)});
/* top rim (black binding) */
[-1,1].forEach(sd=>{add(new eo(.016,.016,2*BL+.02),mBlack).position.set(sd*BW,TY,0);add(new eo(2*BW+.02,.016,.016),mBlack).position.set(0,TY,sd*BL)});
/* corner posts (red tube) + black brackets */
[-1,1].forEach(sx=>[-1,1].forEach(sz=>{
 let p=add(new to(.012,.012,TY-.1,10),mTube,!0);p.position.set(sx*(BW+.012),(TY+.1)/2,sz*(BL-.01));
 let b=add(new eo(.045,.075,.045),mBlack,!0);b.position.set(sx*(BW+.008),TY-.04,sz*(BL-.005));
 let b2=add(new eo(.04,.05,.04),mBlack,!0);b2.position.set(sx*(BW+.008),FY+.01,sz*(BL-.005))}));
/* scissor lattice on both long sides */
{
 const N=7,z0=-BL+.03,dz=(2*BL-.06)/N,yl=.31,yh=.55,len=Math.hypot(dz,yh-yl),ph=Math.atan2(dz,yh-yl);
 [-1,1].forEach(sd=>{
  for(let i=0;i<N;i++){let zc=z0+dz*(i+.5),yc=(yl+yh)/2;
   [1,-1].forEach(sg=>{let b=add(new eo(.012,len,.012),mTube,!0);b.position.set(sd*(BW+.014),yc,zc);b.rotation.x=sg*ph});
   let jt=add(new to(.009,.009,.016,8),mBlack);jt.rotation.z=PI/2;jt.position.set(sd*(BW+.022),yc,zc)}
  [yl,yh].forEach(y=>{let r=add(new eo(.01,.01,2*BL-.06),mTube,!0);r.position.set(sd*(BW+.014),y,0)});
  /* logos on the fabric below the lattice */
  [-.2,.2].forEach(z=>{let m=new Z(new Io(.13,.065),new ua({map:window.__wagonLogo,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));
   m.position.set(sd*(BW+.005),.275,z);m.rotation.y=sd*PI/2;G.add(m)})});
}
/* ---- wheels (4) with forks ---- */
[-1,1].forEach(sx=>[-1,1].forEach(sz=>{
 let x=sx*.225,z=sz*.31,y=.1;
 let ty=add(new to(.1,.1,.055,26),mTyre,!0);ty.rotation.z=PI/2;ty.position.set(x,y,z);
 [-1,1].forEach(e=>{let tr=add(new zo(.09,.012,8,26),mTyre,!0);tr.rotation.y=PI/2;tr.position.set(x+e*.026,y,z)});
 let hb=add(new to(.052,.052,.062,18),mHub);hb.rotation.z=PI/2;hb.position.set(x,y,z);
 let ax=add(new to(.01,.01,.085,8),mBlack);ax.rotation.z=PI/2;ax.position.set(x,y,z);
 /* fork : red tube from axle up to the bed corner */
 let fk=add(new eo(.016,.17,.016),mTube,!0);fk.position.set(sx*(.225+.035),.18,z);
 let fb=add(new eo(.03,.03,.03),mBlack);fb.position.set(sx*(.225+.035),.27,z)}));
/* ---- push handle (rear, black) ---- */
{
 let pts=[[-.205,.46,-BL+.01],[-.212,.62,-BL-.05],[-.2,.78,-BL-.1],[-.1,.855,-BL-.105],[.1,.855,-BL-.105],[.2,.78,-BL-.1],[.212,.62,-BL-.05],[.205,.46,-BL+.01]];
 tube(pts,.0145,mBlack,80);
 let gp=[[-.16,.84,-BL-.105],[.16,.84,-BL-.105]];tube(gp,.019,new Q({color:'#0e0f11',roughness:.9}),8);
 [-1,1].forEach(sd=>{let k=add(new to(.02,.02,.05,10),new Q({color:'#b3261e',roughness:.5}));k.position.set(sd*.213,.5,-BL-.0);k.rotation.z=PI/2});
}
/* ---- pull (tow) handle at the front : red pole with an oval grip ---- */
{
 let pole=add(new to(.011,.011,.46,10),mTube,!0);pole.position.set(0,.76,BL-.0);
 let sl=add(new to(.014,.014,.1,10),mBlack);sl.position.set(0,.55,BL-.0);
 let ring=add(new zo(.034,.012,10,24),mBlack,!0);ring.scale.set(1.35,1,1);ring.position.set(0,.985,BL-.0);
 let br=add(new eo(.07,.06,.03),mBlack);br.position.set(0,.5,BL-.005)}
}
