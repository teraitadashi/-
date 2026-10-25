/* ===== MR Wagon : exterior details ===== */
function __mrwPoly(G,pts,z,mat,nz){ /* convex polygon fan facing +z (nz=1) or -z */
 let cx=0,cy=0;pts.forEach(p=>{cx+=p[0];cy+=p[1]});cx/=pts.length;cy/=pts.length;
 const v=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];v.push(cx,cy,z,a[0],a[1],z,b[0],b[1],z)}
 const g=new Qi;g.setAttribute('position',new Y(v,3));g.computeVertexNormals();mat.side=2;const m=new Z(g,mat);G.add(m);return m}
function __mrwRR(cx,cy,w,h,r,n){const p=[];const c=[[cx+w/2-r,cy+h/2-r,0],[cx-w/2+r,cy+h/2-r,1],[cx-w/2+r,cy-h/2+r,2],[cx+w/2-r,cy-h/2+r,3]];
 c.forEach(([x,y,q])=>{for(let i=0;i<=n;i++){const a=(q*90+i*90/n)*Math.PI/180;p.push([x+Math.cos(a)*r,y+Math.sin(a)*r])}});return p}
function __mrwTex(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');fn(g,w,h);return new Xa(c)}
function __mrwExterior(G){
 const M=__MRW,L=M.L,tube=(pts,r,mat,seg)=>{const m=new Z(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2]))),seg||Math.max(8,pts.length*3),r,6,!1),mat);G.add(m);return m};
 const mBlack=new Q({color:'#0d0d10',roughness:.5,metalness:.1}),mDark=new Q({color:'#2a2d31',roughness:.6}),mChrome=new Q({color:'#d9dde2',metalness:.9,roughness:.2}),
  mPaint=new Q({color:'#f7f8f7',roughness:.32,metalness:.03}),mLine=new Q({color:'#9aa0a5',roughness:.7});
 const zf=-L-.0025;
 /* ---- front face ---- */
 [-1,1].forEach(sd=>{
  /* headlamp : D-shaped lamp traced from the photo (flat top along the hood edge, round lower corners, lowest point toward the inside) */
  const HL=(()=>{const C=[[0,1],[0,.55],[.02,.30],[.12,.10],[.30,.015],[.50,0],[.68,.05],[.82,.17],[.93,.36],[.985,.60],[1,.85],[.97,1],[.5,1.0]];
   const cr=(p0,p1,p2,p3,t)=>[.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t*t+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t*t*t),.5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t*t+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t*t*t)];
   const o=[],n=C.length;for(let i=0;i<n;i++){const p0=C[(i+n-1)%n],p1=C[i],p2=C[(i+1)%n],p3=C[(i+2)%n];for(let k=0;k<8;k++)o.push(cr(p0,p1,p2,p3,k/8))}return o})();
  const LW=.330,LH=.205,X0=.315,Y0=.595;
  /* shape in local (u,v) -> world; sc scales about the lamp centre */
  const lamp=(sc,du,dv)=>HL.map(q=>{const u=.5+(q[0]-.5)*sc+(du||0),v=.5+(q[1]-.5)*sc+(dv||0);return[sd*(X0+u*LW),Y0+v*LH]});
  const pt=(u,v)=>[sd*(X0+u*LW),Y0+v*LH];
  __mrwPoly(G,lamp(1.03),zf,new Q({color:'#6b7075',roughness:.5}),-1);                    /* thin dark seam around lamp */
  __mrwPoly(G,lamp(1.0),zf-.0015,new Q({color:'#c9d2d6',emissive:'#6c767b',roughness:.2,metalness:.3}),-1);   /* reflector body */
  /* reflector facets : upper dark band + light lower bowl */
  __mrwPoly(G,lamp(.90,0,.035),zf-.0028,new Q({color:'#8a949a',emissive:'#3a4348',roughness:.3,metalness:.4}),-1);
  __mrwPoly(G,lamp(.62,.04,-.08),zf-.0040,new Q({color:'#e8eef0',emissive:'#8a9499',roughness:.25,metalness:.3}),-1);
  [[.14,.74,.80,.05],[.18,.60,.74,.045],[.26,.48,.62,.04]].forEach(([u0,v0,u1,h])=>{const p=pt(u0,v0),q=pt(u1,v0),c=[p,q,[q[0],q[1]-h*LH],[p[0],p[1]-h*LH]];__mrwPoly(G,c,zf-.0052,new Q({color:'#f3f7f8',emissive:'#a9b3b8',roughness:.3,metalness:.2}),-1)});
  [[.12,.86,.88,.05]].forEach(([u0,v0,u1,h])=>{const p=pt(u0,v0),q=pt(u1,v0),c=[p,q,[q[0],q[1]-h*LH],[p[0],p[1]-h*LH]];__mrwPoly(G,c,zf-.0052,new Q({color:'#4b555b',roughness:.3,metalness:.6}),-1)});
  /* bulb (round, lower-centre) */
  {const c=pt(.60,.24),bz=new Z(new to(.028,.028,.012,28),new Q({color:'#9aa4aa',metalness:.8,roughness:.25}));bz.rotation.x=Math.PI/2;bz.position.set(c[0],c[1],zf-.0075);G.add(bz);
   const bl=new Z(new Ro(.024,20,10,0,Math.PI*2,0,Math.PI/2),new Q({color:'#f2e6c8',roughness:.1,metalness:.3}));bl.rotation.x=-Math.PI/2;bl.position.set(c[0],c[1],zf-.0105);G.add(bl);
   const dk=new Z(new to(.012,.012,.010,16),new Q({color:'#2a2c2f',roughness:.4}));dk.rotation.x=Math.PI/2;dk.position.set(c[0],c[1],zf-.0125);G.add(dk)}
  /* clear polycarbonate lens (slightly smoky, glossy) */
  __mrwPoly(G,lamp(.985),zf-.0090,new Q({color:'#dfe9ee',roughness:.04,metalness:.25,transparent:!0,opacity:.30,depthWrite:!1}),-1);
  /* lens rim highlight */
  {const r=lamp(.985).map(q=>[q[0],q[1],zf-.0095]);r.push(r[0]);tube(r,.0010,new Q({color:'#b6c0c5',metalness:.8,roughness:.2}),160)}
  /* fog lamp */
  const fb=new Z(new to(.052,.052,.012,24),mBlack);fb.rotation.x=Math.PI/2;fb.position.set(sd*.575,.50,zf-.004);G.add(fb);
  const fl=new Z(new to(.038,.038,.014,24),new Q({color:'#f1d89a',roughness:.1,metalness:.5,transparent:!0,opacity:.95}));fl.rotation.x=Math.PI/2;fl.position.set(sd*.575,.50,zf-.005);G.add(fl);
 });
 /* lower grille (trapezoid) + slats */
 __mrwPoly(G,__mrwRR(0,.43,.98,.25,.03,4).map(q=>[q[0]*(1+(q[1]<.43?-.07:0)),q[1]]),zf,mBlack,-1);
 for(let i=0;i<5;i++){const y=.535-i*.04;__mrwPoly(G,[[-.44+i*.004,y],[.44-i*.004,y],[.44-i*.004,y-.006],[-.44+i*.004,y-.006]],zf-.0012,new Q({color:'#2c2f33',roughness:.5}),-1)}
 /* "MRwagon" badge */
 const bt=__mrwTex(256,64,(g,w,h)=>{g.clearRect(0,0,w,h);g.fillStyle='#ffffff';g.font='italic 700 36px "Helvetica Neue",Arial,sans-serif';g.textBaseline='middle';g.fillText('MR',8,34);g.font='italic 400 32px "Helvetica Neue",Arial,sans-serif';g.fillText('wagon',62,36)});
 const bad=new Z(new Io(.17,.042),new ua({map:bt,transparent:!0,side:2,depthWrite:!1}));bad.rotation.y=Math.PI;bad.position.set(-.30,.355,zf-.003);G.add(bad);
 /* bumper/skirt split line + upper slit grille + emblem */
 tube([[-.62,.585,zf],[0,.585,zf-.001],[.62,.585,zf]],.0035,mLine,20);
 __mrwPoly(G,__mrwRR(0,.708,.52,.032,.014,4),zf-.002,mBlack,-1);
 tube([[-.255,.727,zf-.003],[.255,.727,zf-.003]],.0028,mChrome,10);
 const et=__mrwTex(128,128,(g,w,h)=>{g.clearRect(0,0,w,h);const gr=g.createRadialGradient(54,50,6,64,64,60);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#a9afb6');g.fillStyle=gr;g.beginPath();g.arc(64,64,58,0,Math.PI*2);g.fill();g.strokeStyle='#6d737a';g.lineWidth=5;g.stroke();g.fillStyle='#565b62';g.font='italic 700 104px Georgia,"Times New Roman",serif';g.textAlign='center';g.textBaseline='middle';g.fillText('S',66,70)});
 const em=new Z(new Io(.07,.07),new ua({map:et,transparent:!0,side:2}));em.rotation.y=Math.PI;em.position.set(0,.768,zf-.004);G.add(em);
 /* ---- hood : wipers, cowl ---- */
 const wy=z=>M.top(z)+.004;
 tube([[.52,wy(-.86),-.86],[.30,wy(-.78),-.78],[.02,wy(-.70),-.70]],.0055,mBlack,12);
 tube([[-.04,wy(-.84),-.84],[-.28,wy(-.76),-.76],[-.50,wy(-.69),-.69]],.0055,mBlack,12);
 /* ---- roof antenna (car right) ---- */
 const ant=new Z(new to(.004,.007,.22,10),mBlack);ant.position.set(.50,1.735,-.205);ant.rotation.x=.32;G.add(ant);
 const ab=new Z(new to(.014,.020,.012,12),mBlack);ab.position.set(.50,1.628,-.205);G.add(ab);
 /* ---- sides ---- */
 [-1,1].forEach(sd=>{
  const line=(z,y0,y1,out)=>{const pts=[];for(let i=0;i<=14;i++){const y=y0+(y1-y0)*i/14,p=M.sidePt(z,y,sd);pts.push([p[0]+sd*(out||.0025),y,z])}return tube(pts,.0032,new Q({color:'#6e747a',roughness:.8}),30)};
  line(-.70,.30,.97);line(.235,.28,.98);line(.985,.28,.98);
  /* belt-line chrome-ish moulding under windows */
  const belt=[];for(let i=0;i<=40;i++){const z=-.60+i*(2.1/40),p=M.sidePt(z,.995,sd);belt.push([p[0]+sd*.002,.995,z])}
  tube(belt,.0045,mBlack,80);
  /* door handles */
  [[.045,.905],[.80,.925]].forEach(([z,y])=>{const p=M.sidePt(z,y,sd);
   const rec=new Z(new eo(.012,.044,.125),new Q({color:'#2a2d31',roughness:.6}));rec.position.set(p[0]+sd*.002,y,z);G.add(rec);
   const h=new Z(new eo(.016,.026,.105),mPaint);h.position.set(p[0]+sd*.011,y+.004,z);G.add(h)});
  /* door mirror */
  const mx=sd*.80,my=1.035,mz=-.64;
  const hs=new Z(new Ro(1,24,16),mPaint);hs.scale.set(.066,.074,.092);hs.position.set(mx,my,mz);G.add(hs);
  const gl=new Z(new Io(.118,.100),new Q({color:'#6a757a',metalness:.9,roughness:.08}));gl.position.set(mx-sd*.004,my,mz+.091);G.add(gl);
  const st=new Z(new eo(.12,.032,.05),mPaint);st.position.set(sd*.72,.99,-.66);G.add(st);
  const sb=new Z(new no(.05,.09,3),mPaint);sb.position.set(sd*.678,1.0,-.72);sb.rotation.z=sd>0?-Math.PI/2:Math.PI/2;sb.scale.set(1,1,.6);G.add(sb);
  const ind=new Z(new eo(.012,.014,.05),new Q({color:'#e3a640',roughness:.2}));ind.position.set(mx+sd*.052,my+.02,mz-.01);G.add(ind);
  /* side repeater */
  const rep=new Z(new eo(.008,.018,.04),new Q({color:'#e3a640',roughness:.2}));const rp=M.sidePt(-1.50,.62,sd);rep.position.set(rp[0]+sd*.003,.62,-1.50);G.add(rep);
  /* sill lower edge shadow line */
  const sill=[];for(let i=0;i<=40;i++){const z=-.9+i*(1.75/40),p=M.sidePt(z,.285,sd);sill.push([p[0]+sd*.001,.285,z])}
  tube(sill,.003,new Q({color:'#b8bdc1',roughness:.8}),60);
 });
 /* ---- rear ---- */
 const zr=y=>{let lo=1.5,hi=L;for(let i=0;i<30;i++){const mid=(lo+hi)/2;if(M.top(mid)>y)lo=mid;else hi=mid}return lo};
 [-1,1].forEach(sd=>{
  [[.92,1.12,'#9f1822',.3],[.80,.92,'#e0963a',.4],[.665,.80,'#e8ecee',.3]].forEach(([y0,y1,c,e])=>{
   const ym=(y0+y1)/2,zm=zr(ym)+.006,p=M.sidePt(zm,Math.min(ym,.99),sd);
   const b=new Z(new eo(.150,y1-y0-.004,.03),new Q({color:c,roughness:.12,metalness:.25,emissive:c,emissiveIntensity:.0}));
   b.position.set(sd*.568,ym,zm+.01);b.rotation.x=-Math.atan2(zr(y1)-zr(y0),y1-y0)*-1;G.add(b)});
 });
 /* rear bumper reflectors + plate */
 const pl=__mrwTex(256,128,(g,w,h)=>{g.fillStyle='#f4c542';g.fillRect(0,0,w,h);g.strokeStyle='#222';g.lineWidth=5;g.strokeRect(5,5,w-10,h-10);g.fillStyle='#222';g.font='700 34px sans-serif';g.textAlign='center';g.fillText('580',w/2,44);g.font='700 52px sans-serif';g.fillText('12-34',w/2,106)});
 const plate=new Z(new Io(.33,.165),new ua({map:pl,side:2}));plate.position.set(0,.60,L+.003);G.add(plate);
 tube([[-.60,.60,L+.0015],[.60,.60,L+.0015]],.0035,mLine,20);
 /* rear wiper + high stop lamp */
 const rw=new Z(new eo(.30,.008,.008),mBlack);const zz=zr(1.0)+.004;rw.position.set(0,1.02,zz);rw.rotation.x=.2;G.add(rw);
}
