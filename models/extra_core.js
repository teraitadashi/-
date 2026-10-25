function __loftSE(G,secs,mat,n,seg){ /* superellipse loft : secs=[[y,a,b]] bottom->top, closed with caps */
 secs=secs.map(s=>s.length<3?[s[0],s[1],s[1]]:s);n=n||4.5;seg=seg||64;const pos=[],idx=[];const se=(a,b,t)=>{const c=Math.cos(t),s=Math.sin(t);return[a*Math.sign(c)*Math.pow(Math.abs(c),2/n),b*Math.sign(s)*Math.pow(Math.abs(s),2/n)]};
 secs.forEach(([y,a,b])=>{for(let k=0;k<seg;k++){const p=se(a,b,k/seg*Math.PI*2);pos.push(p[0],y,p[1])}});
 const S=secs.length;for(let i=0;i<S-1;i++)for(let k=0;k<seg;k++){const a=i*seg+k,b=i*seg+(k+1)%seg,c=(i+1)*seg+(k+1)%seg,d=(i+1)*seg+k;idx.push(a,d,b,b,d,c)}
 let cb=pos.length/3;pos.push(0,secs[0][0],0);let ct=cb+1;pos.push(0,secs[S-1][0],0);
 for(let k=0;k<seg;k++){idx.push(cb,k,(k+1)%seg);idx.push(ct,(S-1)*seg+(k+1)%seg,(S-1)*seg+k)}
 const g=new Qi;g.setAttribute('position',new Y(pos,3));g.setIndex(idx);g.computeVertexNormals();const m=new Z(g,mat);m.castShadow=!0;m.receiveShadow=!0;G.add(m);return m}
function __logoTex(txt,col,w,h,fs){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
 g.strokeStyle=col;g.lineWidth=5;g.beginPath();g.roundRect(8,8,w-16,h-16,h*.2);g.stroke();g.fillStyle=col;g.font='italic bold '+fs+'px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,w/2,h/2+2);return new Xa(c)}
function __cooler(G,it){
 const PI=Math.PI;
 const mRed=new Q({color:'#c9302a',roughness:.55,metalness:.02}),mWhite=new Q({color:'#f4f5f6',roughness:.45,metalness:.02}),mRedH=new Q({color:'#c4301f',roughness:.5,metalness:.1}),mDark=new Q({color:'#2a2d31',roughness:.7});
 /* tub */
 __loftSE(G,[[.004,.150,.112],[.014,.162,.124],[.04,.176,.139],[.185,.195,.155]],mRed,5,72);
 /* lid : overhanging rim + softly domed top */
 __loftSE(G,[[.185,.198,.158],[.196,.199,.159],[.214,.194,.154],[.236,.178,.140],[.248,.150,.116]],mWhite,5,72);
 /* seam shadow line between tub and lid */
 {const r=new Z(new zo(1,.0025,6,64),new Q({color:'#9b9fa4',roughness:.8}));r.rotation.x=PI/2;r.scale.set(.1955,.1555,1);r.position.y=.1855;G.add(r)}
 /* embossed logos : lid + tub front */
 if(!window.__coolerLogoL){window.__coolerLogoL=__logoTex('Coleman','#cdd2d7',256,96,56);window.__coolerLogoR=__logoTex('Coleman','#e9776c',256,96,56)}
 const lid=new Z(new Io(.17,.064),new ua({map:window.__coolerLogoL,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));lid.rotation.x=-PI/2;lid.position.set(0,.2495,.02);G.add(lid);
 [-1,1].forEach(sd=>{const lg=new Z(new Io(.12,.045),new ua({map:window.__coolerLogoR,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));lg.position.set(0,.085,sd*.1595);if(sd<0)lg.rotation.y=PI;G.add(lg)});
 /* front latch recess (both long sides) */
 [-1,1].forEach(sd=>{const r=new Z(new eo(.13,.052,.006),new Q({color:'#b02822',roughness:.6}));r.position.set(0,.158,sd*.1585);G.add(r)});
 /* bail handle (red, rotates on side pivots) */
 const pts=[[-.201,.150,0],[-.212,.205,0],[-.205,.262,0],[-.17,.292,0],[-.09,.304,0],[.09,.304,0],[.17,.292,0],[.205,.262,0],[.212,.205,0],[.201,.150,0]];
 const h=new Z(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2]))),90,.0105,10,!1),mRedH);h.castShadow=!0;G.add(h);
 const grip=new Z(new Bo(new vo([new J(-.085,.3,0),new J(.085,.3,0)]),8,.0155,10,!1),new Q({color:'#a9261a',roughness:.6}));grip.position.y=.0045;G.add(grip);
 [-1,1].forEach(sd=>{const p=new Z(new to(.016,.016,.02,14),mDark);p.rotation.z=PI/2;p.position.set(sd*.2,.15,0);G.add(p)});
 /* feet */
 [-1,1].forEach(sx=>[-1,1].forEach(sz=>{const f=new Z(new to(.012,.012,.006,10),mDark);f.position.set(sx*.12,.002,sz*.085);G.add(f)}));
}
function __pot(G,it){
 const PI=Math.PI;
 const mCast=new Q({color:'#303135',roughness:.72,metalness:.2}),mCast2=new Q({color:'#232427',roughness:.7,metalness:.2}),mSteel=new Q({color:'#d3d8de',roughness:.28,metalness:.55});
 /* body : cast iron, 23.5cm at the flange, tapering down to the base */
 __loftSE(G,[[.002,.086],[.010,.093],[.040,.103],[.085,.1115],[.104,.1160]],mCast,2,72);
 /* flange */
 __loftSE(G,[[.100,.1130],[.103,.1235],[.111,.1235],[.113,.1170]],mCast2,2,72);
 /* flat lid with raised edge */
 __loftSE(G,[[.111,.1235],[.119,.1235],[.1225,.1190],[.1225,.1120]],mCast,2,72);
 {const r=new Z(new zo(.1085,.0032,6,72),mCast2);r.rotation.x=PI/2;r.position.y=.1225;G.add(r)}
 /* arched lid handle */
 {const pts=[[-.036,.1222,0],[-.034,.136,0],[-.018,.1495,0],[.0,.1525,0],[.018,.1495,0],[.034,.136,0],[.036,.1222,0]];
  const t=new Z(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2]))),30,.0075,10,!1),mCast2);t.castShadow=!0;G.add(t)}
 /* Coleman plate */
 if(!window.__dutchLogo){const c=document.createElement('canvas');c.width=256;c.height=64;const g=c.getContext('2d');g.fillStyle='#2b2c30';g.fillRect(0,0,256,64);g.strokeStyle='#4a4c52';g.lineWidth=4;g.strokeRect(4,4,248,56);g.fillStyle='#55575d';g.font='italic bold 38px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Coleman',128,34);window.__dutchLogo=new Xa(c)}
 const lg=new Z(new Io(.096,.024),new ua({map:window.__dutchLogo,color:'#8a8c92',side:2,polygonOffset:!0,polygonOffsetFactor:-2}));lg.rotation.x=-PI/2;lg.position.set(0,.1232,-.055);G.add(lg);
 /* ears + stainless bail handle */
 [-1,1].forEach(sd=>{
  const ear=new Z(new eo(.024,.012,.040),mCast2);ear.position.set(sd*.1285,.106,0);G.add(ear);
  const hole=new Z(new zo(.0085,.0028,6,16),mSteel);hole.rotation.y=PI/2;hole.position.set(sd*.1385,.106,0);G.add(hole)});
 {const pts=[];for(let i=0;i<=24;i++){const a=PI*i/24;pts.push(new J(Math.cos(a)*.1385,.106+Math.sin(a)*.100,0))}
  const b=new Z(new Bo(new vo(pts),48,.0036,8,!1),mSteel);b.castShadow=!0;G.add(b)}
}
