/* ===== 有名メーカーのギア (既存ギアと形が異なるもの / 2026年10月 Web調査の公表サイズ) =====
   3Dはそれぞれ専用モデル (mk3d)。2Dは名前入りの汎用記号 (genSym)。 */
const __CBR=[
 {id:'br-tentmark-circus-tc',mk3d:'circus',name:'テンマクデザイン サーカスTC',manufacturer:'テンマクデザイン (tent-Mark DESIGNS)',productName:'サーカスTC',category:'tent',width:4.42,depth:4.2,height:2.8,ropeMargin:1.2,color:'#d8c9a6',capacity:'1〜2人用',
  description:'TC(ポリコットン)素材の五角形ワンポールテント。使用時 約442×420×280(h)cm、重量 約13.1kg。',weight:'約13.1 kg'},
 {id:'br-nordisk-asgard-126',mk3d:'asgard',name:'ノルディスク アスガルド12.6',manufacturer:'ノルディスク (NORDISK)',productName:'アスガルド12.6',category:'tent',width:4,depth:3.75,height:2.5,ropeMargin:1.1,color:'#efeadf',capacity:'6人用',
  description:'センターポールで立てるベル型テント。使用時 約375×400×250(h)cm、収納 約85×20cm、重量 約10kg(PUモデル)、耐水圧3,000mm。',packedSize:'約85 × 20 cm',weight:'約10 kg'},
 {id:'br-ddhammocks-dd-tarp-3x3',mk3d:'ddtarp',name:'DDハンモックス DDタープ 3x3 (Aフレーム張り)',manufacturer:'DDハンモックス (DD Hammocks)',productName:'DDタープ 3x3',category:'tarp',width:2.2,depth:3,height:1.4,ropeMargin:.9,color:'#5a6142',
  description:'3m四方のスクエアタープ。19か所のアタッチメントポイントで張り方が自由。ここではポール2本のAフレーム張り(棟高 約1.4m)で配置。重量 約790g、耐水圧3,000mm。',weight:'約0.79 kg'},
 {id:'br-helinox-cot-one-convertible',mk3d:'cot',name:'ヘリノックス コットワン コンバーチブル',manufacturer:'ヘリノックス (Helinox)',productName:'コットワン コンバーチブル',category:'furniture',width:.68,depth:1.9,height:.16,ropeMargin:0,color:'#1f2124',
  description:'軽量アルミフレームのローコット。使用時 約68×190×16(h)cm、収納 約54×16×16cm、重量 約2.19kg、静荷重145kg。別売レッグで高さ約38cm。',packedSize:'約54 × 16 × 16 cm',weight:'約2.19 kg'},
 {id:'br-snowpeak-pile-driver',mk3d:'piledriver',name:'スノーピーク パイルドライバー (LT-004)',manufacturer:'スノーピーク (snow peak)',productName:'パイルドライバー',modelNumber:'LT-004',category:'furniture',width:.25,depth:.25,height:2,ropeMargin:0,color:'#c9ced3',
  description:'地面に打ち込んで立てるランタンスタンド。収納時 約110cm〜最大 約240cm(ここでは約2m)、重量 約1.6〜1.7kg、クロームメッキスチール。',weight:'約1.7 kg'},
 {id:'br-stanley-water-jug-75',mk3d:'jug',name:'スタンレー ウォータージャグ 7.5L',manufacturer:'スタンレー (STANLEY)',productName:'ウォータージャグ 7.5L',category:'furniture',width:.297,depth:.297,height:.343,ropeMargin:0,color:'#3d6b4a',
  description:'保冷ウォータージャグ。約Φ29.7×34.3(h)cm、容量 7.5L、重量 約1.6〜2.0kg。保冷 6度以下:6時間 / 10度以下:13時間。',weight:'約1.6 kg'}];
__CBR.forEach(g=>{g.isBrand=!0;g.genSym=!0;g.shapeType='br_'+g.mk3d});
Object.assign(__CV,{
 'br-ddhammocks-dd-tarp-3x3':{base:'#5a6142',t:['5a6142'],al:1,v:[['オリーブグリーン','#5a6142'],['コヨーテブラウン','#8b6b4a'],['ジェットブラック','#1d1e21']]}});

/* ---------- 3D ---------- */
function __mk3d(G,it){const PI=Math.PI,add=(geo,mat,cast)=>{const m=new Z(geo,mat);if(cast)m.castShadow=!0;m.receiveShadow=!0;G.add(m);return m};
 const mLine=new ua({color:'#f5f5f4'}),mPeg=new Q({color:'#cbd5e1',metalness:.9,roughness:.25}),
  rope=(a,b)=>{G.add(new La(new Qi().setFromPoints([new J(...a),new J(...b)]),mLine));const p=add(new to(.008,.008,.2,6),mPeg);p.position.set(b[0],.06,b[2])},
  tri=(pts,mat,cast)=>{const g=new Qi;g.setAttribute('position',new Y(pts.flat(),3));g.computeVertexNormals();return add(g,mat,cast)},
  lerp=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t),
  fab=c=>new Q({color:c,roughness:.85,side:2});
 const W=it.width,D=it.depth,H=it.height,k=it.mk3d;
 if(k==='circus'){ /* 五角形ワンポール: 前面の1辺に台形のドア、センターポール、各頂点から張り綱 */
  const R=Math.max(W,D)/2,C=[];for(let i=0;i<5;i++){const a=PI/5+i*2*PI/5;C.push([R*Math.sin(a)*W/(2*R),0,R*Math.cos(a)*D/(2*R)])}
  const top=[0,H,0],mF=fab('#d8c9a6'),mDk=fab('#3a332a');
  for(let i=0;i<5;i++){const a=C[i],b=C[(i+1)%5];tri([a,b,top],mF,!0)}
  /* ドア (前面 = C[4]-C[0] の辺、+z 側) */
  const a=C[4],b=C[0],l1=lerp(a,top,.0),r1=lerp(b,top,.0),pl=lerp(lerp(a,b,.18),top,.02),pr=lerp(lerp(a,b,.82),top,.02),pt=lerp(lerp(a,b,.5),top,.62),off=p=>[p[0],p[1],p[2]+.012];
  tri([off(pl),off(pr),off(pt)],mDk);
  /* スカートの縁取りと頂点のキャップ */
  const mTrim=new Q({color:'#7a6a4e',roughness:.8});C.forEach((p,i)=>{const q=C[(i+1)%5],L=Math.hypot(q[0]-p[0],q[2]-p[2]),m=add(new eo(L,.06,.03),mTrim);m.position.set((p[0]+q[0])/2,.03,(p[2]+q[2])/2);m.rotation.y=-Math.atan2(q[2]-p[2],q[0]-p[0])});
  const cap=add(new no(.12,.2,10),new Q({color:'#4a4236',roughness:.7}));cap.position.y=H+.08;
  const pole=add(new to(.02,.02,H,8),new Q({color:'#2b2b2e',metalness:.5,roughness:.4}));pole.position.y=H/2;
  C.forEach(p=>{const m=add(new to(.008,.008,.22,6),mPeg);m.position.set(p[0]*1.02,.06,p[2]*1.02)});
  C.forEach(p=>{const s=lerp(p,top,.55),L=Math.hypot(p[0],p[2]),e=[p[0]+p[0]/L*(it.ropeMargin||1.1),0,p[2]+p[2]/L*(it.ropeMargin||1.1)];rope(s,e)});
 }else if(k==='asgard'){ /* ベル型: 低い側壁 + 円すいの屋根、前面に三角の出入口と2本のAフレームポール */
  const rx=W/2,rz=D/2,hw=.6,mF=fab('#efeadf'),mDk=fab('#3b3a36'),N=48;
  const wall=new to(1,1,hw,N,1,!0),wm=add(wall,mF,!0);wm.scale.set(rx,1,rz);wm.position.y=hw/2;
  const roof=new no(1,H-hw,N,1,!0),rm=add(roof,mF,!0);rm.scale.set(rx,1,rz);rm.position.y=hw+(H-hw)/2;
  const dz=rz+.015,pts=[[-.55,0,dz],[.55,0,dz],[0,1.75,dz-.18]];tri(pts,mDk);
  const mP=new Q({color:'#6b4f33',roughness:.7});
  [-1,1].forEach(s=>{const a=new J(s*.62,0,rz+.25),b=new J(0,1.85,rz-.05),m=add(new to(.02,.02,a.distanceTo(b),8),mP);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new J(0,1,0),b.clone().sub(a).normalize())});
  const cp=add(new to(.025,.025,H,8),mP);cp.position.y=H/2;
  const top=add(new no(.1,.18,10),new Q({color:'#c9c2b2',roughness:.7}));top.position.y=H+.06;
  const mRing=new Q({color:'#c0b9a8',roughness:.85});const rg=add(new zo(1,.02,6,N),mRing);rg.rotation.x=PI/2;rg.scale.set(rx,rz,1);rg.position.y=hw;
  for(let i=0;i<8;i++){const a=i*PI/4+PI/8,x=Math.sin(a)*rx,z=Math.cos(a)*rz;rope([x,hw,z],[x*(1+(it.ropeMargin||1)/rx*.9),0,z*(1+(it.ropeMargin||1)/rz*.9)])}
 }else if(k==='ddtarp'){ /* Aフレーム: 棟(前後方向)をポール2本で支え、両側の裾をペグダウン */
  const hx=W/2,hz=D/2,eh=.25,mF=fab(it.color||'#5a6142'),NS=10,mk=(sx)=>{const pos=[];for(let i=0;i<NS;i++){const z0=-hz+i*D/NS,z1=z0+D/NS,sg=t=>.05*Math.sin(PI*t);
    const t0=i/NS,t1=(i+1)/NS,A=[0,H-sg(t0),z0],B=[0,H-sg(t1),z1],Cc=[sx*hx,eh,z1],Dd=[sx*hx,eh,z0];pos.push(A,Dd,B,B,Dd,Cc)}tri(pos,mF,!0)};
  mk(-1);mk(1);
  const mP=new Q({color:'#2b2b2e',metalness:.5,roughness:.4});[-1,1].forEach(s=>{const p=add(new to(.012,.012,H+.08,8),mP);p.position.set(0,(H+.08)/2,s*hz);rope([0,H+.06,s*hz],[0,0,s*(hz+(it.ropeMargin||.9))])});
  [-1,1].forEach(sx=>[-1,0,1].forEach(sz=>{const p=add(new to(.008,.008,.2,6),mPeg);p.position.set(sx*(hx+.05),.06,sz*hz*.98)}));
 }else if(k==='cot'){ /* ローコット: 両サイドのアルミパイプ、黒い生地、U字の脚を6か所 */
  const hx=W/2,hz=D/2,mT=new Q({color:'#c9ced3',metalness:.85,roughness:.3}),mS=new Q({color:'#1f2124',roughness:.9,side:2});
  [-1,1].forEach(s=>{const t=add(new to(.012,.012,D,10),mT,!0);t.rotation.x=PI/2;t.position.set(s*hx,H,0)});
  const sh=add(new eo(W*.96,.01,D*.97),mS,!0);sh.position.y=H-.012;
  [-hz*.92,-hz*.3,hz*.3,hz*.92].forEach(z=>{const pts=[new J(-hx,H,z),new J(-hx*.97,.02,z),new J(hx*.97,.02,z),new J(hx,H,z)];add(new Bo(new vo(pts,!1,'catmullrom',.05),40,.009,6,!1),mT,!0)});
  [-1,1].forEach(s=>{const e=add(new to(.01,.01,W,8),mT);e.rotation.z=PI/2;e.position.set(0,H,s*hz)});
 }else if(k==='piledriver'){ /* 打ち込み式ランタンスタンド: 細いポール、上部フック、下部の打ち込みハンマー部 */
  const mC=new Q({color:'#dfe3e7',metalness:.95,roughness:.15}),p=add(new to(.012,.014,H,10),mC,!0);p.position.y=H/2;
  const ham=add(new to(.025,.025,.35,12),mC,!0);ham.position.y=.55;const grip=add(new to(.03,.03,.12,12),new Q({color:'#1b1b1d',roughness:.8}));grip.position.y=.78;
  const hook=add(new Bo(new vo([new J(0,H,0),new J(.08,H+.06,0),new J(.16,H+.02,0),new J(.17,H-.05,0)]),20,.006,6,!1),mC);
  const lt=add(new to(.045,.05,.16,14),new Q({color:'#20232a',roughness:.5,metalness:.3}),!0);lt.position.set(.17,H-.2,0);
  const gl=add(new to(.04,.04,.07,14),new ua({color:'#fde68a'}));gl.position.set(.17,H-.2,0);
 }else if(k==='jug'){ /* 円筒形のウォータージャグ: ハンマートーン塗装の本体、ふた、前面の注ぎ口、上部のハンドル */
  const r=W/2,mB=new Q({color:it.color||'#3d6b4a',roughness:.55,metalness:.35}),mK=new Q({color:'#1b1c1e',roughness:.7}),mS=new Q({color:'#d7dbe0',metalness:.9,roughness:.25});
  const b=add(new to(r,r*.97,H*.84,28),mB,!0);b.position.y=H*.42;
  const lid=add(new to(r*.62,r*.66,H*.07,24),mK,!0);lid.position.y=H*.875;
  const sp=add(new eo(.06,.045,.05),mK);sp.position.set(0,H*.09,r+.012);const sv=add(new to(.009,.009,.03,8),mS);sv.rotation.x=PI/2;sv.position.set(0,H*.06,r+.04);
  const hd=add(new Bo(new vo([new J(-r*.75,H*.84,0),new J(-r*.6,H*1.0,0),new J(r*.6,H*1.0,0),new J(r*.75,H*.84,0)]),24,.012,8,!1),mK,!0);
  const lg=add(new to(r*1.002,r*1.002,.004,28,1,!0),mS);lg.position.y=H*.84;
 }
}
