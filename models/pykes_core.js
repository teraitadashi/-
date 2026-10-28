/* ===== PYKES PEAK (パイクスピーク) ドームテント 1人用 アプリコットベージュ =====
   本体 約210×105×110cm / インナー 約200×100×100cm / クロスフレーム(グラスファイバーポール×2)
   前面ドアを跳ね上げてポール2本で張るバイザー付き。ローカル座標: x=幅(2.1m), z=奥行(後ろ -, 前 +) */
function __pykes(G,it,anim){
 const PI=Math.PI,W=it.width||2.1,k=W/2.1,BW=1.05*k,BD=.525*k,H=1.1*k,D=it.depth||2.2,zc=-D/2+BD+.02;
 const add=(geo,mat,cast,recv)=>{const m=new Z(geo,mat);if(cast)m.castShadow=!0;if(recv)m.receiveShadow=!0;G.add(m);return m};
 const tube=(pts,r,mat,seg)=>add(new Bo(new vo(pts.map(p=>new J(p[0],p[1],p[2]))),seg||64,r,6,!1),mat,!0);
 /* 生地 */
 if(!window.__pykesFab){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,128,128);
  for(let i=0;i<1600;i++){g.fillStyle=Math.random()>.5?'rgba(255,255,255,.35)':'rgba(120,80,70,.07)';g.fillRect(Math.random()*128,Math.random()*128,1.5,1.5)}
  g.strokeStyle='rgba(120,80,70,.06)';for(let i=0;i<128;i+=6){g.beginPath();g.moveTo(i,0);g.lineTo(i,128);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(128,i);g.stroke()}
  const t=new Xa(c);t.wrapS=t.wrapT=ze;t.repeat.set(3,2);window.__pykesFab=t}
 const mFly=new Q({map:window.__pykesFab,color:'#e9bfae',roughness:.75,side:2}),mIn=new Q({color:'#d8d6d0',roughness:.9,side:2,transparent:!0,opacity:.92}),
  mFloor=new Q({color:'#3b3d42',roughness:.95}),mPole=new Q({color:'#2b2b2e',roughness:.5,metalness:.3}),mRed=new Q({color:'#c62828',roughness:.6}),
  mVis=new Q({color:'#c9ae86',roughness:.8,side:2,emissive:'#4a3b28'}),mBlack=new Q({color:'#151517',roughness:.4,metalness:.6}),mLine=new ua({color:'#f5f5f4'});
 /* 角の丸い四角ドーム: r=(|u|^4+|v|^4)^(1/4), y=H*sqrt(1-r^2) */
 const P=(u,v,s=1,off=0)=>{const r=Math.min(1,Math.pow(Math.pow(Math.abs(u),4)+Math.pow(Math.abs(v),4),.25)),y=H*s*Math.sqrt(Math.max(0,1-r*r));return[u*BW*s+Math.sign(u)*off*.3,y+off,zc+v*BD*s+Math.sign(v)*off*.3]};
 const dome=(s,mat,hole)=>{const N=44,pos=[],idx=[],uv=[];for(let j=0;j<=N;j++)for(let i=0;i<=N;i++){const u=i/N*2-1,v=j/N*2-1,p=P(u,v,s);pos.push(p[0],p[1],p[2]);uv.push(i/N,j/N)}
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const uc=(i+.5)/N*2-1,vc=(j+.5)/N*2-1;if(hole&&hole(uc,vc))continue;const a=j*(N+1)+i,b=a+1,c=a+N+1,d=c+1;idx.push(a,c,b,b,c,d)}
  const g=new Qi;g.setAttribute('position',new Y(pos,3));g.setAttribute('uv',new Y(uv,2));g.setIndex(idx);g.computeVertexNormals();return g};
 /* 前面ドア(跳ね上げ済み)の開口 */
 const door=(u,v)=>v>.4&&Math.abs(u)<.52&&Math.pow(Math.abs(u)/.52,2.2)+Math.pow(Math.max(0,1-v)/.6,2)<1.1;
 add(dome(1,mFly,door),mFly,!0,!0);
 add(dome(.9,mIn),mIn,!1,!0);
 const fl=add(new eo(2*BW*.95,.02,2*BD*.95),mFloor,!1,!0);fl.position.set(0,.01,zc);
 /* ドアの縁取り */
 {const pts=[];for(let i=0;i<=40;i++){const t=i/40*PI,u=-Math.cos(t)*.52,vv=1-.6*Math.sqrt(Math.max(0,1.1-Math.pow(Math.abs(u)/.52,2.2)));pts.push(P(u,Math.max(.41,vv),1,.008))}tube(pts,.008,new Q({color:'#9b6f63',roughness:.8}),80)}
 /* クロスフレーム (X字のポール2本) */
 [1,-1].forEach(sg=>{const pts=[];for(let i=0;i<=40;i++){const s=i/40*2-1;pts.push(P(s*.995,s*sg*.995,1,.012))}tube(pts,.011,mPole,90)});
 /* 角の赤いテープとペグ */
 [[-1,-1],[1,-1],[1,1],[-1,1],[0,-1.04],[0,1.04]].forEach(([u,v])=>{const p=P(u*.99,v*.99,1,0),b=add(new eo(.05,.04,.05),mRed,!0);b.position.set(p[0],.03,p[2]);
  const pg=add(new to(.006,.006,.18,6),new Q({color:'#cbd5e1',metalness:.9,roughness:.2}));pg.position.set(p[0]*1.04,.06,zc+(p[2]-zc)*1.04)});
 /* バイザー(跳ね上げたドアパネル)と2本のポール */
 {const vw=.8*k,y0=H*.86,z0=zc+BD*.62,vz=z0+Math.min(1.25,D-2*BD-.1),vy=1.18*k,pos=[],idx=[];
  for(let j=0;j<=8;j++)for(let i=0;i<=10;i++){const s=i/10*2-1,t=j/8,x=s*vw*(1+.12*t),y=y0+(vy-y0)*t-.05*Math.sin(PI*t)*(1-s*s*.4),z=z0+(vz-z0)*t;pos.push(x,y,z)}
  for(let j=0;j<8;j++)for(let i=0;i<10;i++){const a=j*11+i,b=a+1,c=a+11,d=c+1;idx.push(a,c,b,b,c,d)}
  const g=new Qi;g.setAttribute('position',new Y(pos,3));g.setIndex(idx);g.computeVertexNormals();add(g,mVis,!0,!0);
  [-1,1].forEach(sd=>{const x=sd*vw*1.12,p=add(new to(.011,.011,vy+.06,8),mBlack,!0);p.position.set(x,(vy+.06)/2,vz);
   const cap=add(new Ro(.022,8,6),mBlack);cap.position.set(x,vy+.07,vz);
   const a=new J(x,vy+.04,vz),b=new J(x+sd*.75,0,vz+.95),l=new La(new Qi().setFromPoints([a,b]),mLine);G.add(l)});
  /* ロゴ風の小さなタグ */
  const tg=add(new Io(.16,.05),new ua({color:'#7a4b42'}));const lp=P(-.55,.55,1,.012);tg.position.set(lp[0],lp[1],lp[2]);tg.lookAt(lp[0]-.6,lp[1]+.4,lp[2]+.8)}
 /* 本体の張り綱 (左右) */
 [-1,1].forEach(sd=>{const p=P(sd*.82,0,1,.01),a=new J(p[0],p[1],p[2]),b=new J(sd*(BW+(it.ropeMargin||.6)),0,zc),l=new La(new Qi().setFromPoints([a,b]),mLine);G.add(l)});
}
