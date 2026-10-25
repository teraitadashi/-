/* ===== MR Wagon : exterior details ===== */
function __elgPoly(G,pts,z,mat,nz){ /* convex polygon fan facing +z (nz=1) or -z */
 let cx=0,cy=0;pts.forEach(p=>{cx+=p[0];cy+=p[1]});cx/=pts.length;cy/=pts.length;
 const v=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];v.push(cx,cy,z,a[0],a[1],z,b[0],b[1],z)}
 const g=new Qi;g.setAttribute('position',new Y(v,3));g.computeVertexNormals();mat.side=2;const m=new Z(g,mat);G.add(m);return m}
function __elgRR(cx,cy,w,h,r,n){const p=[];const c=[[cx+w/2-r,cy+h/2-r,0],[cx-w/2+r,cy+h/2-r,1],[cx-w/2+r,cy-h/2+r,2],[cx+w/2-r,cy-h/2+r,3]];
 c.forEach(([x,y,q])=>{for(let i=0;i<=n;i++){const a=(q*90+i*90/n)*Math.PI/180;p.push([x+Math.cos(a)*r,y+Math.sin(a)*r])}});return p}
function __elgTex(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');fn(g,w,h);return new Xa(c)}
function __elgExterior(G){
 const M=__ELG,L=M.L,tube=(pts,r,mat,seg)=>{const m=new Z(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2]))),seg||Math.max(8,pts.length*3),r,6,!1),mat);G.add(m);return m};
 const mBlack=new Q({color:'#0b0b0e',roughness:.45,metalness:.2}),mDark=new Q({color:'#202327',roughness:.55,metalness:.3}),mChrome=new Q({color:'#eef1f4',metalness:.45,roughness:.25}),
  mPaint=new Q({color:'#f4f4f1',roughness:.3,metalness:.08}),mLine=new Q({color:'#8d9398',roughness:.7});
 const box=(w,h,d,mat,x,y,z,rx,ry,rz)=>{const m=new Z(new eo(w,h,d),mat);m.position.set(x,y,z);if(rx)m.rotation.x=rx;if(ry)m.rotation.y=ry;if(rz)m.rotation.z=rz;G.add(m);return m};
 const zf=-L-.0025;
 /* ---------- front face (photo-traced : upper grille band, big trapezoid grille, wedge headlamps, LED-DRL fog bezel) ---------- */
 /* upper slim grille */
 __elgPoly(G,[[-.52,.925],[.52,.925],[.50,.855],[-.50,.855]],zf,mBlack,-1);
 [.915,.89,.865].forEach((y,i)=>tube([[-.50+i*.004,y,zf-.003],[.50-i*.004,y,zf-.003]],.0035,mChrome,10));
 tube([[-.52,.925,zf-.003],[.52,.925,zf-.003],[.50,.855,zf-.003],[-.50,.855,zf-.003],[-.52,.925,zf-.003]],.0045,mChrome,40);
 /* main grille (V-shaped lower edge) */
 const gp=[[-.50,.815],[.50,.815],[.47,.70],[.40,.62],[0,.595],[-.40,.62],[-.47,.70]];
 const wAt=y=>{const E=[[.815,.50],[.70,.47],[.62,.40],[.595,0]];for(let i=0;i<E.length-1;i++){if(y<=E[i][0]&&y>=E[i+1][0]){const t=(E[i][0]-y)/(E[i][0]-E[i+1][0]);return E[i][1]+(E[i+1][1]-E[i][1])*t}}return .4};
 __elgPoly(G,gp,zf-.0005,mBlack,-1);
 [.795,.762,.729,.696,.663,.632].forEach((y,i)=>{const w=wAt(y)-.012;tube([[-w,y,zf-.004],[w,y,zf-.004]],.0050,mChrome,10);tube([[-w,y-.014,zf-.0035],[w,y-.014,zf-.0035]],.0022,new Q({color:'#3a3d42',roughness:.5}),10)});
 gp.forEach((p,i)=>{const q=gp[(i+1)%gp.length];tube([[p[0],p[1],zf-.0045],[(p[0]+q[0])/2,(p[1]+q[1])/2,zf-.0045],[q[0],q[1],zf-.0045]],.0075,mChrome,6)});
 /* Nissan badge */
 const et=__elgTex(256,256,(g,w,h)=>{g.clearRect(0,0,w,h);const gr=g.createRadialGradient(100,90,10,128,128,120);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#9aa1a8');
  g.strokeStyle=gr;g.lineWidth=22;g.beginPath();g.arc(128,128,100,0,Math.PI*2);g.stroke();
  g.fillStyle='#d5dade';g.fillRect(8,104,240,48);g.strokeStyle='#6d737a';g.lineWidth=5;g.strokeRect(8,104,240,48);
  g.fillStyle='#2a2e34';g.font='700 34px Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('NISSAN',128,130)});
 const em=new Z(new Io(.13,.13),new ua({map:et,transparent:!0,side:2,depthWrite:!1}));em.rotation.y=Math.PI;em.position.set(0,.795,zf-.006);G.add(em);
 [-1,1].forEach(sd=>{
  /* headlamp : wedge shape hugging the grille corner */
  const HL=[[.47,.905],[.77,.910],[.822,.865],[.818,.775],[.755,.700],[.625,.662],[.545,.655],[.502,.690],[.476,.775]].map(p=>[sd*p[0],p[1]]);
  __elgPoly(G,HL.map(p=>[p[0]*1.012,p[1]]),zf,new Q({color:'#5e646a',roughness:.5}),-1);
  __elgPoly(G,HL,zf-.0015,new Q({color:'#d8e0e4',emissive:'#7c878d',roughness:.2,metalness:.35}),-1);
  __elgPoly(G,HL.map(p=>[sd*.66+(p[0]-sd*.66)*.80,.775+(p[1]-.775)*.78]),zf-.0025,new Q({color:'#aab4ba',emissive:'#4c565c',roughness:.25,metalness:.5}),-1);
  const cx=sd*.668,cy=.775;
  const ring=new Z(new zo(.058,.0075,8,40),new Q({color:'#eef1f4',metalness:.5,roughness:.2}));ring.position.set(cx,cy,zf-.008);G.add(ring);
  const bz=new Z(new to(.052,.052,.014,28),new Q({color:'#26292d',roughness:.4,metalness:.4}));bz.rotation.x=Math.PI/2;bz.position.set(cx,cy,zf-.006);G.add(bz);
  const lens=new Z(new Ro(.036,20,10,0,Math.PI*2,0,Math.PI/2),new Q({color:'#e4eef4',roughness:.06,metalness:.3,emissive:'#5f7380'}));lens.rotation.x=-Math.PI/2;lens.position.set(cx,cy,zf-.013);G.add(lens);
  const lens2=new Z(new Ro(.022,16,8,0,Math.PI*2,0,Math.PI/2),new Q({color:'#cfdce4',roughness:.1,metalness:.3,emissive:'#44525c'}));lens2.rotation.x=-Math.PI/2;lens2.position.set(sd*.552,.745,zf-.009);G.add(lens2);
  const rg2=new Z(new zo(.026,.004,6,24),new Q({color:'#dfe4e8',metalness:.5,roughness:.25}));rg2.position.set(sd*.552,.745,zf-.007);G.add(rg2);
  tube([[sd*.50,.842,zf-.004],[sd*.78,.848,zf-.004],[sd*.80,.83,zf-.004]],.0045,mChrome,16);
  tube([[sd*.52,.700,zf-.004],[sd*.62,.690,zf-.004],[sd*.74,.724,zf-.004]],.0030,mChrome,16);
  /* upper turn / position lamp strip */
  __elgPoly(G,[[sd*.52,.935],[sd*.77,.935],[sd*.80,.90],[sd*.52,.90]],zf-.0015,new Q({color:'#e9d9a8',emissive:'#8d7a3a',roughness:.15,metalness:.2}),-1);
  tube([[sd*.52,.935,zf-.004],[sd*.77,.935,zf-.004],[sd*.80,.90,zf-.004]],.0025,mChrome,12);
  /* fog-lamp bezel with L-shaped LED DRL */
  __elgPoly(G,[[sd*.52,.44],[sd*.70,.44],[sd*.74,.40],[sd*.74,.27],[sd*.55,.27],[sd*.52,.31]],zf-.0005,new Q({color:'#6b7178',roughness:.3,metalness:.7}),-1);
  __elgPoly(G,[[sd*.545,.40],[sd*.70,.40],[sd*.715,.37],[sd*.715,.29],[sd*.56,.29],[sd*.545,.32]],zf-.003,new Q({color:'#2a2d32',roughness:.4}),-1);
  const fb=new Z(new to(.040,.040,.012,24),new Q({color:'#bfc6cc',metalness:.9,roughness:.2}));fb.rotation.x=Math.PI/2;fb.position.set(sd*.62,.345,zf-.005);G.add(fb);
  const fl=new Z(new to(.030,.030,.014,24),new Q({color:'#e9f0f2',roughness:.08,metalness:.4}));fl.rotation.x=Math.PI/2;fl.position.set(sd*.62,.345,zf-.007);G.add(fl);
  tube([[sd*.725,.52,zf-.004],[sd*.725,.47,zf-.004],[sd*.715,.39,zf-.004],[sd*.715,.31,zf-.004]],.0075,new Q({color:'#f7fbff',emissive:'#9fb3c4',roughness:.2,metalness:.2}),20);
  tube([[sd*.745,.52,zf-.002],[sd*.745,.30,zf-.002]],.0035,mChrome,10);
 });
 /* lower intake + plate */
 __elgPoly(G,__elgRR(0,.405,.62,.11,.02,4),zf-.0008,mBlack,-1);
 for(let i=0;i<4;i++){tube([[-.30,.45-i*.025,zf-.003],[.30,.45-i*.025,zf-.003]],.0022,new Q({color:'#2b2e33',roughness:.5}),8)}
 const pl=__elgTex(256,128,(g,w,h)=>{g.fillStyle='#f7f7f5';g.fillRect(0,0,w,h);g.strokeStyle='#4b5358';g.lineWidth=6;g.strokeRect(4,4,w-8,h-8);g.fillStyle='#1f7fd6';g.beginPath();g.roundRect(34,38,188,54,8);g.fill();g.fillStyle='#ffffff';g.fillRect(70,56,116,18)});
 const mkPlate=(z,y,rev)=>{const p=new Z(new Io(.33,.165),new ua({map:pl,side:2}));p.position.set(0,y,z);if(rev)p.rotation.y=Math.PI;G.add(p);return p};
 mkPlate(zf-.008,.47,!0);
 /* front lip spoiler (body colour) */
 box(1.42,.04,.07,mPaint,0,.255,-L-.02);box(.05,.04,.05,mPaint,.70,.255,-L-.02);
 /* bumper split line */
 tube([[-.82,.585,zf],[0,.585,zf-.001],[.82,.585,zf]],.0035,mLine,20);
 /* ---------- hood / cowl ---------- */
 const wy=z=>M.top(z)+.004;
 tube([[.66,wy(-1.08),-1.08],[.35,wy(-1.00),-1.00],[.0,wy(-.94),-.94]],.0062,mBlack,12);
 tube([[-.02,wy(-1.06),-1.06],[-.36,wy(-.98),-.98],[-.66,wy(-.92),-.92]],.0062,mBlack,12);
 /* hood press lines */
 [-1,1].forEach(sd=>tube([[sd*.36,M.top(-2.3)+.004,-2.3],[sd*.40,M.top(-1.8)+.004,-1.8],[sd*.46,M.top(-1.3)+.004,-1.3]],.0025,mLine,20));
 /* ---------- roof rails / chrome drip moulding ---------- */
 [-1,1].forEach(sd=>{
  const dr=[];for(let i=0;i<=40;i++){const z=-.90+i*(2.85/40),y=M.top(z)-.088,p=M.sidePt(z,y,sd);dr.push([p[0]+sd*.003,y,z])}
  tube(dr,.0055,mChrome,100);
  const vz=[];for(let i=0;i<=30;i++){const z=-.86+i*(2.05/30),y=M.top(z)-.098,p=M.sidePt(z,y,sd);vz.push([p[0]+sd*.010,y,z])}if(0)tube(vz,.0085,new Q({color:'#101216',roughness:.35,metalness:.3}),80);
  /* belt-line chrome moulding under the glass */
  const bl=[];for(let i=0;i<=44;i++){const z=-.98+i*(3.05/44),y=1.115,p=M.sidePt(z,y,sd);bl.push([p[0]+sd*.003,y,z])}
  tube(bl,.0045,mChrome,100);
  /* door shut lines (front door, sliding door) */
  const line=(z,y0,y1,out)=>{const pts=[];for(let i=0;i<=14;i++){const y=y0+(y1-y0)*i/14,p=M.sidePt(z,y,sd);pts.push([p[0]+sd*(out||.0025),y,z])}return tube(pts,.0030,new Q({color:'#6e747a',roughness:.8}),30)};
  line(-.98,.30,1.10);line(-.06,.32,1.12);line(1.18,.32,1.12);
  /* sliding-door rail on the rear quarter */
  const rl=[];for(let i=0;i<=20;i++){const z=1.18+i*(.82/20),p=M.sidePt(z,.98,sd);rl.push([p[0]+sd*.003,.98,z])}tube(rl,.011,mBlack,40);
  /* side sill garnish (chrome line) */
  const sl=[];for(let i=0;i<=40;i++){const z=-.95+i*(2.2/40),p=M.sidePt(z,.34,sd);sl.push([p[0]+sd*.004,.34,z])}tube(sl,.0055,mChrome,80);
  const sl2=[];for(let i=0;i<=40;i++){const z=-.95+i*(2.2/40),p=M.sidePt(z,.285,sd);sl2.push([p[0]+sd*.002,.285,z])}tube(sl2,.0025,new Q({color:'#b8bdc1',roughness:.8}),60);
  /* door handles : front door + sliding door (chrome) */
  [[-.20,1.05],[.22,1.05]].forEach(([z,y])=>{const p=M.sidePt(z,y,sd);
   box(.014,.04,.14,mDark,p[0]+sd*.003,y,z);const h=box(.020,.026,.115,mChrome,p[0]+sd*.013,y+.004,z)});
  /* door mirror (white housing, turn lamp, dark glass) */
  const mx=sd*1.01,my=1.215,mz=-.92;
  const hs=new Z(new Ro(1,24,16),mPaint);hs.scale.set(.075,.090,.115);hs.position.set(mx,my,mz);G.add(hs);
  const gl=new Z(new Io(.135,.125),new Q({color:'#6a757a',metalness:.9,roughness:.08,side:2}));gl.position.set(mx-sd*.002,my-.005,mz+.114);G.add(gl);
  const lamp=box(.012,.016,.07,new Q({color:'#e3a640',emissive:'#a8691a',roughness:.2}),mx+sd*.050,my-.07,mz-.02);
  const st=box(.20,.05,.055,mPaint,sd*.93,1.16,-.94);
  const sb=new Z(new no(.07,.12,3),mPaint);sb.position.set(sd*.872,1.19,-1.0);sb.rotation.z=sd>0?-Math.PI/2:Math.PI/2;sb.scale.set(1,1,.6);G.add(sb);
  const mt=box(.012,.24,.012,mBlack,sd*.88,1.19,-.90);mt.visible=!1;
  /* side turn repeater */
  box(.008,.020,.05,new Q({color:'#e3a640',roughness:.2}),M.sidePt(-1.86,.62,sd)[0]+sd*.004,.62,-1.86);
  /* rear-quarter reflector + fuel lid line */
  const fl=[];for(let i=0;i<=10;i++){const a=i/10*Math.PI*2,z=1.72+Math.cos(a)*.06,y=.84+Math.sin(a)*.06,p=M.sidePt(z,y,-sd);fl.push([p[0]-sd*.0025,y,z])}if(sd<0)tube(fl,.0022,new Q({color:'#6e747a',roughness:.8}),30);
 });
 /* ---------- rear ---------- */
 const zr=y=>{let lo=2.0,hi=L;for(let i=0;i<30;i++){const mid=(lo+hi)/2;if(M.top(mid)>y)lo=mid;else hi=mid}return lo};
 const slope=(y0,y1)=>Math.atan2(zr(y1)-zr(y0),y1-y0);
 /* tail-lamp band */
 const yb0=1.07,yb1=1.225,zb=zr((yb0+yb1)/2)+.006,ang=-slope(yb0,yb1);
 [-1,1].forEach(sd=>{
  /* outer red lamp + chrome slat blocks */
  const red=new Q({color:'#a31a22',emissive:'#6a0e14',roughness:.12,metalness:.3});
  const r1=box(.150,.112,.026,red,sd*.665,(yb0+yb1)/2+.01,zb+.007,ang);
  [0,1,2,3,4,5,6].forEach(i=>box(.062,.095,.024,new Q({color:i%2?'#eceff1':'#c5cbd0',roughness:.3,metalness:.35}),sd*(.07+i*.0725),(yb0+yb1)/2+.01,zb+.007,ang))});
 box(1.50,.014,.03,mChrome,0,yb0+.005,zb+.01,ang);
 box(1.55,.018,.022,new Q({color:'#101216',roughness:.3,metalness:.5}),0,yb0-.015,zb+.006,ang);
 /* NISSAN emblem on tailgate */
 const emr=new Z(new Io(.115,.115),new ua({map:et,transparent:!0,side:2,depthWrite:!1}));emr.position.set(0,1.175,zb+.026);emr.rotation.x=ang;G.add(emr);
 /* lower vertical tail lamps (bumper corners) */
 [-1,1].forEach(sd=>{
  box(.075,.30,.034,new Q({color:'#d9dde0',roughness:.15,metalness:.3}),sd*.80,.84,L-.006);
  [0,1,2,3,4].forEach(i=>box(.062,.020,.036,new Q({color:i<2?'#b32a1c':'#e8ecee',emissive:i<2?'#5a1010':'#6d7578',roughness:.15,metalness:.4}),sd*.80,.945-i*.052,L-.004));
  box(.012,.30,.010,mChrome,sd*.755,.84,L+.003)});
 /* reflectors, garnish, plate, tailgate details */
 [-1,1].forEach(sd=>box(.14,.026,.02,new Q({color:'#c4202a',emissive:'#701016',roughness:.2}),sd*.66,.36,L-.003));
 tube([[-.78,.64,L+.0015],[.78,.64,L+.0015]],.0035,mLine,20);
 const plr=mkPlate(L+.004,.95,!1);
 box(.30,.025,.012,mPaint,0,1.05,L+.003);
 tube([[.50,.62,L+.002],[.50,1.0,L+.002]],.0022,mLine,10);
 /* ELGRAND lettering + grade badges */
 {const tx=__elgTex(512,64,(g,w,h)=>{g.clearRect(0,0,w,h);g.fillStyle='#f2f4f6';g.font='700 46px "Trebuchet MS",Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('E L G R A N D',w/2,34)});
  const t1=new Z(new Io(.42,.052),new ua({map:tx,transparent:!0,side:2,depthWrite:!1}));t1.position.set(0,yb0-.012,zb+.0225);t1.rotation.x=ang;G.add(t1);
  const hs=__elgTex(256,64,(g,w,h)=>{g.clearRect(0,0,w,h);g.fillStyle='#8c949b';g.font='italic 600 26px Arial,sans-serif';g.textAlign='center';g.fillText('Highway',w/2,24);g.fillStyle='#7a838a';g.font='italic 700 34px Arial,sans-serif';g.fillText('STAR',w/2,56)});
  const t2=new Z(new Io(.17,.042),new ua({map:hs,transparent:!0,side:2,depthWrite:!1}));t2.position.set(.62,.985,L+.006);G.add(t2);
  const bt=__elgTex(128,48,(g,w,h)=>{g.fillStyle='#2f6fb5';g.fillRect(0,0,w,h);g.fillStyle='#e8eef4';g.fillRect(6,6,w-12,8);g.font='700 22px Arial,sans-serif';g.textAlign='center';g.fillText('S-Hybrid',w/2,38)});
  const t3=new Z(new Io(.075,.028),new ua({map:bt,side:2}));t3.position.set(.52,.78,L+.006);G.add(t3);}
 /* rear lower diffuser + bumper step */
 box(1.30,.07,.025,new Q({color:'#2b2e32',roughness:.6}),0,.34,L+.004);
 box(1.40,.012,.030,mLine,0,.665,L+.006);
 /* roof spoiler + high-mount stop lamp */
 const sp=box(1.22,.045,.30,mPaint,0,M.top(2.14)+.03,2.15,.05);
 box(1.20,.012,.26,mBlack,0,M.top(2.14)+.002,2.17,.05);
 box(.34,.026,.012,new Q({color:'#a31a22',emissive:'#7a1018',roughness:.2}),0,M.top(2.28)+.015,2.31,.12);
 /* rear wiper */
 const rw=new Z(new eo(.34,.008,.008),mBlack);rw.position.set(.05,1.44,zr(1.44)+.006);rw.rotation.x=-.25;G.add(rw);
 /* ---------- roof : shark-fin antenna ---------- */
 const sf=new Z(new eo(.04,.05,.12),mBlack);sf.position.set(0,1.835,.35);G.add(sf);
}
