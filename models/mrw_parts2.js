/* ===== MR Wagon : wheels, interior, underbody ===== */
function __mrwWheels(G){
 const M=__MRW,R=M.RW;
 const mTire=new Q({color:'#151517',roughness:.92,metalness:0}),mSide=new Q({color:'#1b1b1e',roughness:.85}),
  mCover=new Q({color:'#cfd4d9',roughness:.35,metalness:.65}),mSlot=new Q({color:'#2c2f34',roughness:.6,metalness:.2}),
  mHub=new Q({color:'#e3e6ea',roughness:.25,metalness:.8}),mBolt=new Q({color:'#8a9097',roughness:.4,metalness:.8});
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{
  const w=new Xr;w.position.set(sx*(sz<0?.6475:.645),R,sz*M.ZW);G.add(w);
  const cyl=(rt,rb,h,mat,x,seg)=>{const m=new Z(new to(rt,rb,h,seg||64),mat);m.rotation.z=Math.PI/2;m.position.x=x;m.castShadow=!0;w.add(m);return m};
  /* tyre : tread + rounded shoulders + sidewalls (145/80R13) */
  cyl(R,R,.108,mTire,0);
  [-1,1].forEach(s=>{
   cyl(R-.001,R-.021,.020,mTire,s*.064).rotation.z=s>0?-Math.PI/2:Math.PI/2;
   cyl(R-.021,R-.050,.016,mTire,s*.082).rotation.z=s>0?-Math.PI/2:Math.PI/2;
   const sw=new Z(new Lo(.172,R-.050,64),mSide);sw.rotation.y=s*Math.PI/2;sw.position.x=s*.090;w.add(sw);
   /* tread grooves */
  });
  for(let i=-1;i<=1;i+=2){const gr=new Z(new zo(R-.001,.0035,6,72),new Q({color:'#0a0a0b',roughness:1}));gr.rotation.y=Math.PI/2;gr.position.x=i*.026;w.add(gr)}
  /* wheel cover (outer side only matters: +x of each wheel group faces outward) */
  const o=sx; /* outward direction in world x */
  const cover=new Z(new to(.168,.150,.020,48),mCover);cover.rotation.z=Math.PI/2;cover.position.x=o*.086;w.add(cover);
  const rim=new Z(new zo(.165,.0075,8,64),mCover);rim.rotation.y=Math.PI/2;rim.position.x=o*.092;w.add(rim);
  const dome=new Z(new Ro(.058,24,12,0,Math.PI*2,0,Math.PI/2),mHub);dome.rotation.z=-o*Math.PI/2;dome.position.x=o*.094;dome.scale.set(.5,1,1);w.add(dome);
  const hubring=new Z(new zo(.062,.005,8,40),mCover);hubring.rotation.y=Math.PI/2;hubring.position.x=o*.099;w.add(hubring);
  for(let i=0;i<5;i++){const a=i*Math.PI*2/5+.3;
   /* dished slot panels */
   const sl=new Z(new eo(.004,.080,.034),mSlot);sl.position.set(o*.096,Math.cos(a)*.108,Math.sin(a)*.108);sl.rotation.x=-a;w.add(sl);
   const sl2=new Z(new eo(.0045,.020,.008),mCover);sl2.position.set(o*.0975,Math.cos(a+.63)*.132,Math.sin(a+.63)*.132);sl2.rotation.x=-(a+.63);w.add(sl2);
   const bolt=new Z(new to(.007,.007,.006,10),mBolt);bolt.rotation.z=Math.PI/2;bolt.position.set(o*.100,Math.cos(a+.63)*.044,Math.sin(a+.63)*.044);w.add(bolt)}
  /* brake disc visible through inner side + suspension arm */
  const disc=new Z(new to(.115,.115,.012,32),new Q({color:'#6b6f75',metalness:.7,roughness:.5}));disc.rotation.z=Math.PI/2;disc.position.x=-o*.03;w.add(disc);
 });
 /* axles / underbody */
 const ub=new Z(new eo(1.0,.04,2.6),new Q({color:'#17181a',roughness:.9}));ub.position.set(0,.22,0);G.add(ub);
 [-1,1].forEach(s=>{const ax=new Z(new to(.026,.026,1.30,12),new Q({color:'#2a2c2f',metalness:.5,roughness:.6}));ax.rotation.z=Math.PI/2;ax.position.set(0,.281,s*M.ZW);G.add(ax)});
 /* exhaust */
 const ex=new Z(new to(.025,.025,.3,14),new Q({color:'#7b8087',metalness:.8,roughness:.35}));ex.rotation.x=Math.PI/2;ex.position.set(-.30,.255,1.58);G.add(ex);
 /* number-plate lamps etc. skipped */
}
function __mrwInterior(G){
 const M=__MRW;
 const fab=new Q({color:'#3a3d42',roughness:.95}),fab2=new Q({color:'#9aa0a7',roughness:.95}),plastic=new Q({color:'#25272b',roughness:.6}),dashTop=new Q({color:'#4b4e53',roughness:.7}),
  floor=new Q({color:'#2a2b2e',roughness:1}),trim=new Q({color:'#b9bec3',roughness:.6});
 const box=(w,h,d,mat,x,y,z,rx,ry,rz)=>{const m=new Z(new eo(w,h,d),mat);m.position.set(x,y,z);if(rx)m.rotation.x=rx;if(ry)m.rotation.y=ry;if(rz)m.rotation.z=rz;G.add(m);return m};
 box(1.20,.02,2.30,floor,0,.40,.35);                   /* cabin floor */
 box(1.26,.18,.40,dashTop,0,.92,-.74,-.18);             /* dashboard top */
 box(1.26,.26,.22,plastic,0,.78,-.62);                  /* dash lower */
 box(.46,.12,.18,plastic,.36,1.02,-.60,-.25);           /* meter hood */
 box(.26,.10,.14,trim,-.05,.93,-.68,-.15);              /* centre cluster */
 box(.22,.30,.50,plastic,0,.56,-.20);                   /* console */
 /* steering wheel (driver = +x) */
 const sw=new Z(new zo(.17,.017,10,40),new Q({color:'#17181a',roughness:.55}));sw.position.set(.36,.97,-.40);sw.rotation.x=-1.05;G.add(sw);
 const hub=new Z(new to(.05,.05,.022,16),new Q({color:'#202225',roughness:.5}));hub.position.set(.36,.97,-.40);hub.rotation.x=-1.05;G.add(hub);
 box(.07,.07,.30,plastic,.36,.88,-.55,-.4);
 /* seats */
 [-.31,.31].forEach(x=>{
  box(.48,.13,.52,fab,x,.52,.05);                       /* cushion */
  box(.48,.66,.12,fab,x,.88,.34,.18);                  /* back */
  box(.30,.18,.10,fab2,x,1.28,.42,.18);                /* headrest */
  box(.38,.04,.30,fab2,x,.60,.07);                     /* centre cushion */
 });
 box(1.18,.14,.55,fab,0,.52,.88);                       /* rear bench */
 box(1.18,.56,.12,fab,0,.90,1.17,.12);                 /* rear back */
 [-.3,.3].forEach(x=>box(.30,.18,.10,fab2,x,1.28,1.2,.12));
 /* door trim cards (inside) */
 [-1,1].forEach(sd=>{box(.04,.55,2.1,plastic,sd*.60,.72,.45)});
 /* headliner */
 box(1.12,.02,1.55,new Q({color:'#cfd2d5',roughness:.95}),0,1.58,.62);
 /* rear view mirror */
 box(.20,.06,.03,plastic,0,1.48,-.50);
}
