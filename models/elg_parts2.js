/* ===== Elgrand : wheels (225/55R18, 5 twin-spoke alloy), underbody, interior ===== */
function __elgWheels(G){
 const M=__ELG,R=M.RW;
 const mTire=new Q({color:'#151517',roughness:.92}),mSide=new Q({color:'#1b1b1e',roughness:.85}),
  mAlloy=new Q({color:'#8d939b',roughness:.4,metalness:.35}),mFace=new Q({color:'#d3d8de',roughness:.3,metalness:.4}),mDark=new Q({color:'#26282c',roughness:.7,metalness:.1}),
  mCal=new Q({color:'#a2522a',roughness:.5,metalness:.4}),mDisc=new Q({color:'#80858c',metalness:.3,roughness:.6});
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{
  const w=new Xr;w.position.set(sx*M.TR,R,sz*M.ZW);G.add(w);
  const cyl=(rt,rb,h,mat,x,seg)=>{const m=new Z(new to(rt,rb,h,seg||64,1,!0),mat);mat.side=2;m.rotation.z=Math.PI/2;m.position.x=x;m.castShadow=!0;w.add(m);return m};
  const TW=.225,H=TW/2,RR=.2286;
  cyl(R,R,TW-.04,mTire,0);
  [-1,1].forEach(s=>{
   cyl(R-.001,R-.030,.024,mTire,s*(H-.032)).rotation.z=s>0?-Math.PI/2:Math.PI/2;
   cyl(R-.030,R-.075,.018,mTire,s*(H-.011)).rotation.z=s>0?-Math.PI/2:Math.PI/2;
   const sw=new Z(new Lo(RR+.012,R-.075,64),mSide);sw.rotation.y=s*Math.PI/2;sw.position.x=s*H;w.add(sw)});
  for(let i=-1;i<=1;i++){const gr=new Z(new zo(R-.001,.0035,6,72),new Q({color:'#0a0a0b',roughness:1}));gr.rotation.y=Math.PI/2;gr.position.x=i*.045;w.add(gr)}
  const o=sx; /* outward */
  /* rim barrel + lip */
  const lip=new Z(new zo(RR,.007,8,64),mFace);lip.rotation.y=Math.PI/2;lip.position.x=o*(H-.008);w.add(lip);
  const well=new Z(new to(RR-.004,RR-.004,.16,48,1,!0),new Q({color:'#26282c',roughness:.7,metalness:.1,side:2}));well.rotation.z=Math.PI/2;w.add(well);
  /* dished face : dark gap disc + 5 twin spokes */
  const disc=new Z(new to(RR-.006,RR-.006,.010,48),mDark);disc.rotation.z=Math.PI/2;disc.position.x=o*(H-.050);w.add(disc);
  for(let i=0;i<5;i++){const a=i*Math.PI*2/5+.2;
   [-1,1].forEach(t=>{const aa=a+t*.115;
    const sp=new Z(new eo(.013,.150,.036),mAlloy);sp.position.set(o*(H-.034),Math.cos(aa)*.125,Math.sin(aa)*.125);sp.rotation.x=aa;
    /* spokes taper : twin spokes diverge from the hub */
    sp.rotation.x=(a+t*.062);sp.position.set(o*(H-.034),Math.cos(a+t*.062)*.128,Math.sin(a+t*.062)*.128);w.add(sp);
    const tip=new Z(new eo(.016,.060,.040),mFace);tip.position.set(o*(H-.030),Math.cos(a+t*.075)*.190,Math.sin(a+t*.075)*.190);tip.rotation.x=(a+t*.075);w.add(tip)});
   const web=new Z(new eo(.012,.07,.05),mAlloy);web.position.set(o*(H-.036),Math.cos(a)*.065,Math.sin(a)*.065);web.rotation.x=a;w.add(web)}
  const hub=new Z(new to(.055,.055,.016,28),mAlloy);hub.rotation.z=Math.PI/2;hub.position.x=o*(H-.040);w.add(hub);
  const cap=new Z(new to(.034,.034,.010,24),mFace);cap.rotation.z=Math.PI/2;cap.position.x=o*(H-.030);w.add(cap);
  for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const b=new Z(new to(.006,.006,.008,8),mFace);b.rotation.z=Math.PI/2;b.position.set(o*(H-.040),Math.cos(a)*.048,Math.sin(a)*.048);w.add(b)}
  /* brake disc + caliper seen through the spokes */
  const bd=new Z(new to(.150,.150,.026,40),mDisc);bd.rotation.z=Math.PI/2;bd.position.x=o*.050;w.add(bd);
  const cal=new Z(new eo(.04,.10,.07),mCal);cal.position.set(o*.052,.10,.0);w.add(cal);
 });
 /* underbody + axles */
 const ub=new Z(new eo(1.45,.05,4.2),new Q({color:'#17181a',roughness:.9}));ub.position.set(0,.24,0);G.add(ub);
 [-1,1].forEach(s=>{const ax=new Z(new to(.03,.03,1.5,12),new Q({color:'#2a2c2f',metalness:.5,roughness:.6}));ax.rotation.z=Math.PI/2;ax.position.set(0,.352,s*M.ZW);G.add(ax)});
 /* dual exhaust tips (under rear bumper) */
 [-1,1].forEach(s=>{const ex=new Z(new to(.03,.03,.28,14),new Q({color:'#9aa0a7',metalness:.85,roughness:.3}));ex.rotation.x=Math.PI/2;ex.position.set(s*.45,.285,2.30);G.add(ex)});
}
function __elgInterior(G){
 const fab=new Q({color:'#cfc4b0',roughness:.95}),fab2=new Q({color:'#bdb2a0',roughness:.95}),plastic=new Q({color:'#2b2a28',roughness:.6}),dashTop=new Q({color:'#3a3733',roughness:.7}),
  floor=new Q({color:'#4a4640',roughness:1}),trim=new Q({color:'#a89d8a',roughness:.5,metalness:.3});
 const box=(w,h,d,mat,x,y,z,rx,ry,rz)=>{const m=new Z(new eo(w,h,d),mat);m.position.set(x,y,z);if(rx)m.rotation.x=rx;if(ry)m.rotation.y=ry;if(rz)m.rotation.z=rz;G.add(m);return m};
 box(1.60,.02,3.30,floor,0,.45,.55);
 box(1.60,.22,.50,dashTop,0,1.04,-1.25,-.15);
 box(1.60,.34,.28,plastic,0,.85,-1.15);
 box(.50,.14,.20,plastic,.40,1.18,-1.17,-.25);
 box(.34,.40,.80,plastic,0,.66,-.40);
 const sw=new Z(new zo(.19,.019,10,40),new Q({color:'#17181a',roughness:.55}));sw.position.set(.40,1.12,-.87);sw.rotation.x=-1.05;G.add(sw);
 /* seats : front 2, second row captain x2, third bench */
 [-.42,.42].forEach(x=>{box(.54,.14,.60,fab,x,.62,-.35);box(.52,.74,.14,fab,x,1.02,-.02,.16);box(.34,.20,.10,fab2,x,1.46,.04,.16)});
 [-.45,.45].forEach(x=>{box(.56,.16,.60,fab,x,.64,.62);box(.54,.74,.14,fab,x,1.04,.94,.14);box(.34,.20,.10,fab2,x,1.46,.98,.14)});
 box(1.50,.16,.60,fab,0,.64,1.55);box(1.50,.70,.14,fab,0,1.00,1.86,.12);
 [-.45,0,.45].forEach(x=>box(.34,.20,.10,fab2,x,1.44,1.90,.12));
 [-1,1].forEach(sd=>box(.03,.60,3.0,plastic,sd*.76,.80,.55));
 box(1.30,.02,2.0,new Q({color:'#d8d2c4',roughness:.95}),0,1.72,.9);
 box(.22,.06,.03,plastic,0,1.60,-1.0);
}
