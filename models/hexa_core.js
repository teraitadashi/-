function __hexa(G,it,tx,anim){
const PI=Math.PI;
const lerp=(a,b,t)=>a+(b-a)*t;
__domeTex();
if(!window.__hexaText){
 let m=document.createElement('canvas');m.width=256;m.height=96;let g=m.getContext('2d');
 g.fillStyle='#374151';g.font='italic bold 40px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Hexa Light+',128,34);
 g.font='bold 26px Arial,sans-serif';g.fillText('UV PRO',128,74);
 window.__hexaText=new Xa(m);
}
const HX=2.1,HZ=2.1,CX=1.47,HP=2.2,HC=.9;     /* poles at x=±2.1 (2.2m), corners at x=±1.47 z=±2.1 (0.9m) */
const mTop=new Q({map:window.__domeFab,color:'#c3cddd',roughness:.78,metalness:.02,side:0});
const mUnd=new Q({color:'#1a1c20',roughness:.85,side:1});
const mRed=new Q({color:'#d11a2a',roughness:.55});
const mBlack=new Q({color:'#17191c',roughness:.55,metalness:.55});
const mSil=new Q({color:'#d5dbe3',metalness:.95,roughness:.18});
const mWL=new ua({color:'#ffffff'});
const add=(geo,mat,cast,recv)=>{let m=new Z(geo,mat);if(cast)m.castShadow=!0;if(recv)m.receiveShadow=!0;G.add(m);return m};
const tube=(pts,r,mat,seg)=>add(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2])),!1),seg||Math.max(8,pts.length*3),r,6,!1),mat);
/* corner/pole points of the back half (z<0) ; the front half is a mirror */
const PT=[[-HX,HP,0],[-CX,HC,-HZ],[CX,HC,-HZ],[HX,HP,0]];
const sagMag=[.34,.38,.34];
/* edge curve for one half, sign sg = -1 (back) / +1 (front) */
function edgePts(sg,nPer){
 let out=[];
 for(let k=0;k<3;k++){
  let A=PT[k],B=PT[k+1];
  let dx=B[0]-A[0],dz=(B[2]-A[2])*1;let L=Math.hypot(dx,dz)||1;
  /* inward normal in plan : towards z=0 (ridge) and towards x=0 */
  let nx=-dz/L,nz=dx/L;let mx=(A[0]+B[0])/2,mz=(A[2]-0+B[2])/2;
  /* choose sign so that the normal points to the centroid (0,-0.9) */
  if(nx*(0-mx)+nz*(-.9-mz)<0){nx=-nx;nz=-nz}
  for(let i=(k?1:0);i<=nPer;i++){let s=i/nPer,b=4*s*(1-s);
   out.push([lerp(A[0],B[0],s)+nx*sagMag[k]*b,lerp(A[1],B[1],s)+.14*b,(lerp(A[2],B[2],s)+nz*sagMag[k]*b)])}
 }
 if(sg>0)out=out.map(p=>[p[0],p[1],-p[2]]);
 return out}
const ridgeY=x=>HP-.06*(1-(x/HX)*(x/HX));
function sheet(sg,nPer,nV){
 const E=edgePts(sg,nPer);const pos=[],uv=[],idx=[];const NT=E.length;
 for(let i=0;i<NT;i++){let e=E[i];for(let j=0;j<=nV;j++){let t=j/nV;let rx=e[0],ry=ridgeY(rx);
  /* sag of the sheet between ridge and edge */
  pos.push(lerp(rx,e[0],t),lerp(ry,e[1],t)-.07*Math.sin(PI*t)*(1-Math.abs(e[0])/HX*.5),lerp(0,e[2],t));uv.push(i/NT*3,t*1.2)}}
 for(let i=0;i<NT-1;i++)for(let j=0;j<nV;j++){let a=i*(nV+1)+j,b=(i+1)*(nV+1)+j,c=b+1,d=a+1;
  if(sg<0)idx.push(a,b,d,b,c,d);else idx.push(a,d,b,b,d,c)}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();
 return{g,E}}
const sh=[-1,1].map(sg=>sheet(sg,14,16));
sh.forEach(({g})=>{add(g,mTop,!0,!0);let u=new Z(g,mUnd);u.position.y=-.004;G.add(u)});
/* red binding around the whole perimeter + the ridge seam */
{
 let per=[];sh[0].E.forEach(p=>per.push([p[0],p[1]+.004,p[2]]));
 sh[1].E.slice().reverse().forEach(p=>per.push([p[0],p[1]+.004,p[2]]));
 per.push(per[0]);
 /* remove duplicated end points */
 let clean=[];per.forEach((p,i)=>{if(i===0||Math.hypot(p[0]-clean[clean.length-1][0],p[2]-clean[clean.length-1][2])>.01)clean.push(p)});
 tube(clean,.0085,mRed,300);
 let rd=[];for(let i=0;i<=20;i++){let x=lerp(-HX,HX,i/20);rd.push([x,ridgeY(x)+.004,0])}tube(rd,.006,new Q({color:'#9aa4b5',roughness:.8}),40);
}
/* logo patch + model text on the front half */
{
 const surfPt=(u,v)=>{let E=sh[1].E,i=Math.round(u*(E.length-1)),e=E[i];return[e[0],lerp(ridgeY(e[0]),e[1],v)-.07*Math.sin(PI*v)*(1-Math.abs(e[0])/HX*.5)+.006,lerp(0,e[2],v)]};
 const put=(mesh,u,v,roll)=>{let p=surfPt(u,v),q=surfPt(u+.02,v),r=surfPt(u,v+.02);
  let a=new J(q[0]-p[0],q[1]-p[1],q[2]-p[2]),b=new J(r[0]-p[0],r[1]-p[1],r[2]-p[2]);let n=new J().crossVectors(b,a).normalize();if(n.y<0)n.negate();
  mesh.position.set(p[0],p[1],p[2]);mesh.lookAt(p[0]+n.x,p[1]+n.y,p[2]+n.z);if(roll)mesh.rotateZ(roll);G.add(mesh)};
 let lg=new Z(new Io(.55,.275),new ua({map:window.__domeLogo,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));put(lg,.5,.5,0);
 let tt=new Z(new Io(.4,.15),new ua({map:window.__hexaText,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));put(tt,.86,.45,PI);
}
/* poles with caps and base plates */
[-1,1].forEach(sd=>{
 let h=HP+.02,pl=add(new to(.0125,.0125,h,12),mBlack,!0);pl.position.set(sd*HX,h/2,0);
 let sec=add(new to(.0145,.0145,.06,12),mBlack);sec.position.set(sd*HX,.5,0);
 let sec2=add(new to(.0145,.0145,.06,12),mBlack);sec2.position.set(sd*HX,1.4,0);
 let cap=add(new to(.02,.02,.04,12),mSil);cap.position.set(sd*HX,HP+.03,0);
 let bp=add(new to(.045,.045,.012,16),mSil);bp.position.set(sd*HX,.006,0);
});
/* ---- guy lines + pegs ---- */
{
 let Re=it.ropeMargin||1.2,tb=new eo(.016,.036,.008),peg=new to(.011,.011,.24,6),mT=new Q({color:'#d11a2a',metalness:.4,roughness:.4});
 const rope=(a,b)=>{let p=new J(a[0],a[1],a[2]),q=new J(b[0],b[1],b[2]),l=new La(new Qi().setFromPoints([p,q]),mWL);G.add(l);
  let m=new Z(tb,mT);m.position.lerpVectors(p,q,.5);m.lookAt(q);G.add(m);
  let pg=new Z(peg,mSil);pg.position.set(b[0],.08,b[2]);pg.rotation.z=b[0]<0?-.28:.28;pg.rotation.x=b[2]>0?.25:-.25;G.add(pg)};
 [-1,1].forEach(sx=>[-1,1].forEach(sz=>{
  let c=[sx*CX,HC,sz*HZ];
  rope(c,[sx*(CX+Re*.85),0,sz*(HZ+Re*.95)]);
 }));
 [-1,1].forEach(sd=>{
  let top=[sd*HX,HP+.02,0];
  rope(top,[sd*(HX+Re*1.25),0,0]);
  rope(top,[sd*(HX+Re*.7),0,-Re*.75]);rope(top,[sd*(HX+Re*.7),0,Re*.75]);
 });
}
}
