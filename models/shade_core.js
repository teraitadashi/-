function __shade(G,it,tx,anim){
const PI=Math.PI;
const lerp=(a,b,t)=>a+(b-a)*t;
__domeTex();
if(!window.__shadeText){
 let m=document.createElement('canvas');m.width=512;m.height=96;let g=m.getContext('2d');
 g.fillStyle='#5b6472';g.font='italic 36px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Instant Visor Shade/250+',256,36);
 g.font='bold 24px Arial,sans-serif';g.fillText('DARK ROOM',256,72);
 window.__shadeText=new Xa(m);
}
const HW=1.25,LW=1.025,EH=1.95,PK=2.5;            /* canopy half-size, leg half-spacing, eave height, peak height */
const mTop=new Q({map:window.__domeFab,color:'#bcc7d8',roughness:.78,metalness:.02,side:0});
const mUnd=new Q({color:'#1a1c20',roughness:.85,side:1});
const mRed=new Q({color:'#d11a2a',roughness:.55});
const mBlack=new Q({color:'#17191c',roughness:.55,metalness:.55});
const mSil=new Q({color:'#d5dbe3',metalness:.95,roughness:.18});
const mWL=new ua({color:'#ffffff'});
const add=(geo,mat,cast,recv)=>{let m=new Z(geo,mat);if(cast)m.castShadow=!0;if(recv)m.receiveShadow=!0;G.add(m);return m};
const tube=(pts,r,mat,seg)=>add(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2])),!1),seg||Math.max(8,pts.length*3),r,6,!1),mat);
const C=[[-HW,EH,-HW],[HW,EH,-HW],[HW,EH,HW],[-HW,EH,HW]],P=[0,PK,0];
/* four roof faces (slightly sagging) */
const faces=[];
for(let k=0;k<4;k++){
 const A=C[k],B=C[(k+1)%4];const N=16,M=12;const pos=[],uv=[],idx=[];
 for(let i=0;i<=N;i++){let u=i/N;for(let j=0;j<=M;j++){let v=j/M;
  let x=lerp(lerp(A[0],B[0],u),P[0],v),y=lerp(lerp(A[1],B[1],u),P[1],v)-.05*Math.sin(PI*u)*Math.sin(PI*Math.min(1,v*1.1))*(1-v*.3),z=lerp(lerp(A[2],B[2],u),P[2],v);
  pos.push(x,y,z);uv.push(u*2,v*1.4)}}
 for(let i=0;i<N;i++)for(let j=0;j<M;j++){let a=i*(M+1)+j,b=(i+1)*(M+1)+j,c=b+1,d=a+1;idx.push(a,b,d,b,c,d)}
 /* orient so that the top side faces up */
 let ax=pos[3*((M+1))]-pos[0],ay=pos[3*(M+1)+1]-pos[1],az=pos[3*(M+1)+2]-pos[2];
 let bx=pos[3]-pos[0],by=pos[4]-pos[1],bz=pos[5]-pos[2];
 let ny=az*bx-ax*bz;   /* y of (b x a)... orientation test for a,b,d */
 let tri=[0,(M+1),1];let nyT=(()=>{let p0=[pos[0],pos[1],pos[2]],p1=[pos[3*(M+1)],pos[3*(M+1)+1],pos[3*(M+1)+2]],p2=[pos[3],pos[4],pos[5]];
  let e1=[p1[0]-p0[0],p1[1]-p0[1],p1[2]-p0[2]],e2=[p2[0]-p0[0],p2[1]-p0[1],p2[2]-p0[2]];return e1[2]*e2[0]-e1[0]*e2[2]})();
 if(nyT<0){for(let t=0;t<idx.length;t+=3){let tmp=idx[t+1];idx[t+1]=idx[t+2];idx[t+2]=tmp}}
 let g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();
 add(g,mTop,!0,!0);let u=new Z(g,mUnd);u.position.y=-.004;G.add(u);faces.push(pos)}
/* red piping on the eaves + hanging hem + fold lines */
for(let k=0;k<4;k++){
 const A=C[k],B=C[(k+1)%4];let pts=[];for(let i=0;i<=16;i++){let u=i/16;pts.push([lerp(A[0],B[0],u),EH+.003-.0,lerp(A[2],B[2],u)])}
 tube(pts,.0075,mRed,32);
 let L=Math.hypot(B[0]-A[0],B[2]-A[2]),hem=add(new eo(L,.07,.01),new Q({color:'#c2ccdb',roughness:.8,side:2}),!0);
 let mx=(A[0]+B[0])/2,mz=(A[2]+B[2])/2,ang=Math.atan2(B[2]-A[2],B[0]-A[0]);hem.position.set(mx,EH-.035,mz);hem.rotation.y=-ang;
 let f=[[A[0],A[1]+.002,A[2]],[lerp(A[0],0,.5),lerp(A[1],PK,.5)+.003,lerp(A[2],0,.5)],[0,PK+.002,0]];tube(f,.005,new Q({color:'#a9b4c5',roughness:.8}),20)}
/* logos */
{
 const onFace=(k,u,v,mesh,roll)=>{let A=C[k],B=C[(k+1)%4];let x=lerp(lerp(A[0],B[0],u),0,v),y=lerp(EH,PK,v)-.05*Math.sin(PI*u)*Math.sin(PI*Math.min(1,v*1.1))*(1-v*.3)+.006,z=lerp(lerp(A[2],B[2],u),0,v);
  let u2=u+.02,x2=lerp(lerp(A[0],B[0],u2),0,v),y2=lerp(EH,PK,v)-.05*Math.sin(PI*u2)*Math.sin(PI*Math.min(1,v*1.1))*(1-v*.3)+.006,z2=lerp(lerp(A[2],B[2],u2),0,v);
  let v2=v+.02,x3=lerp(lerp(A[0],B[0],u),0,v2),y3=lerp(EH,PK,v2)-.05*Math.sin(PI*u)*Math.sin(PI*Math.min(1,v2*1.1))*(1-v2*.3)+.006,z3=lerp(lerp(A[2],B[2],u),0,v2);
  let a=new J(x2-x,y2-y,z2-z),b=new J(x3-x,y3-y,z3-z),n=new J().crossVectors(b,a).normalize();if(n.y<0)n.negate();
  mesh.position.set(x,y,z);mesh.lookAt(x+n.x,y+n.y,z+n.z);if(roll)mesh.rotateZ(roll);G.add(mesh)};
 let lg=new Z(new Io(.34,.17),new ua({map:window.__domeLogo,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));onFace(2,.82,.16,lg,0);
 let tt=new Z(new Io(.5,.095),new ua({map:window.__shadeText,transparent:!0,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));onFace(0,.3,.17,tt,0);
}
/* legs (4 steel posts with telescoping collars and foot plates) */
[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sz],k)=>{
 let x=sx*LW,z=sz*LW;
 let lg=add(new to(.016,.016,EH,10),mBlack,!0);lg.position.set(x,EH/2,z);
 [.55,1.1,1.55].forEach((y,i)=>{let c=add(new to(.022,.022,.05,10),i===1?new Q({color:'#9b1c1c',roughness:.5}):mBlack);c.position.set(x,y,z)});
 let ft=add(new to(.05,.05,.012,14),mSil);ft.position.set(x,.006,z);
 let tp=add(new to(.024,.024,.04,10),mBlack);tp.position.set(x,EH-.02,z)});
/* guy ropes at the canopy corners */
{
 let Re=it.ropeMargin||.9,tb=new eo(.016,.036,.008),peg=new to(.011,.011,.24,6),mT=new Q({color:'#d11a2a',metalness:.4,roughness:.4});
 const rope=(a,b)=>{let p=new J(a[0],a[1],a[2]),q=new J(b[0],b[1],b[2]),l=new La(new Qi().setFromPoints([p,q]),mWL);G.add(l);
  let m=new Z(tb,mT);m.position.lerpVectors(p,q,.5);m.lookAt(q);G.add(m);
  let pg=new Z(peg,mSil);pg.position.set(b[0],.08,b[2]);pg.rotation.z=b[0]<0?-.28:.28;pg.rotation.x=b[2]>0?.25:-.25;G.add(pg)};
 C.forEach(c=>{let sx=Math.sign(c[0]),sz=Math.sign(c[2]);rope([c[0],EH-.02,c[2]],[c[0]+sx*Re*.9,0,c[2]+sz*Re*.9])});
}
}
