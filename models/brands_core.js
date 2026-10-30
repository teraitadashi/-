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
  description:'保冷ウォータージャグ。約Φ29.7×34.3(h)cm、容量 7.5L、重量 約1.6〜2.0kg。保冷 6度以下:6時間 / 10度以下:13時間。',weight:'約1.6 kg'},
 {id:'br-doppelganger-ul-hammock',mk3d:'hammock',name:'ドッペルギャンガー ウルトラライトハンモック (スタンド付き)',manufacturer:'ドッペルギャンガー (DOPPELGANGER OUTDOOR)',productName:'ウルトラライトハンモック',modelNumber:'SH1-219',category:'furniture',width:.85,depth:2.3,height:.75,ropeMargin:0,color:'#3f6d8c',
  description:'アルミスタンド付きの自立式ハンモック。設置サイズ 約幅85×長さ230×高さ75cm、重量 約6.3kg、耐荷重 約85kg。木がなくても使える。',weight:'約6.3 kg'},
 {id:'br-logos-wide-firewood-rack-table',mk3d:'woodrack',name:'ロゴス ワイド薪ラックウッドテーブル',manufacturer:'ロゴス (LOGOS)',productName:'ワイド薪ラックウッドテーブル',category:'furniture',width:.4,depth:.36,height:.37,ropeMargin:0,color:'#2a2b2e',
  description:'スチールの薪ラックに木製天板を載せればテーブルにもなる。約40×36×37(h)cm、重量 約2.8kg。',weight:'約2.8 kg'},
 {id:'br-captainstag-trine-tripod-ug10',mk3d:'tripod',name:'キャプテンスタッグ トライン 焚き火三脚 (UG-10)',manufacturer:'キャプテンスタッグ (CAPTAIN STAG)',productName:'トライン 焚き火三脚',modelNumber:'UG-10',category:'furniture',width:.7,depth:.6,height:1.435,ropeMargin:0,color:'#1d1e21',
  description:'焚き火の上に立ててチェーンで鍋を吊るす三脚。約70×60×143.5(h)cm、重量 約2.4kg、耐荷重 約20kg。',weight:'約2.4 kg'},
 {id:'br-honma-asw-60b-stove',mk3d:'woodstove',name:'ホンマ製作所 黒耐熱窓付時計型ストーブ (ASW-60B)',manufacturer:'ホンマ製作所',productName:'黒耐熱窓付時計型ストーブ',modelNumber:'ASW-60B',category:'furniture',width:.4,depth:.6,height:.4,ropeMargin:0,color:'#1b1b1d',
  description:'耐熱窓付きの時計型薪ストーブ。本体 約40×60×40(h)cm、重量 約6.7kg、煙突径106mm(背面)。3Dの煙突(約2m)は別売の煙突を立てた想定。',weight:'約6.7 kg'},
 {id:'br-helinox-chair-one',mk3d:'chairone',name:'ヘリノックス チェアワン',manufacturer:'ヘリノックス (Helinox)',productName:'チェアワン',category:'furniture',width:.52,depth:.5,height:.66,ropeMargin:0,color:'#1f2124',
  description:'超軽量の組み立て式チェア。使用時 約52×50×66(h)cm、座面高 約34cm、重量 約890g、耐荷重145kg。',weight:'約0.89 kg'},
 {id:'br-snowpeak-low-chair-30',mk3d:'lowchair30',name:'スノーピーク ローチェア30 (LV-091)',manufacturer:'スノーピーク (snow peak)',productName:'ローチェア30',modelNumber:'LV-091',category:'furniture',width:.58,depth:.65,height:.86,ropeMargin:0,color:'#5b5a3f',
  description:'竹集成材のアームレストとハイバックのローチェア。使用時 約58×65×86(h)cm、座面高 約30cm、重量 約3.6kg。',weight:'約3.6 kg'},
 {id:'br-coleman-resort-chair',mk3d:'resortchair',name:'コールマン リゾートチェア',manufacturer:'コールマン (Coleman)',productName:'リゾートチェア',category:'furniture',width:.51,depth:.83,height:.87,ropeMargin:0,color:'#1f3355',
  description:'寝そべれるリクライニングチェア。使用時 約83×51×87(h)cm、収納 約14×14×87cm、重量 約3kg。',weight:'約3 kg'},
 {id:'br-snowpeak-igt-slim',mk3d:'igt',name:'スノーピーク IGTスリム (CK-180) テーブル',manufacturer:'スノーピーク (snow peak)',productName:'IGTスリム',modelNumber:'CK-180',category:'furniture',width:.94,depth:.408,height:.403,ropeMargin:0,color:'#b48a5c',
  description:'アイアングリルテーブルのスリム版。天然木の天板は6分割で収納。約94×40.8×40.3(h)cm、重量 約7.4kg。',weight:'約7.4 kg'},
 {id:'br-helinox-table-one-hardtop',mk3d:'tableone',name:'ヘリノックス テーブルワン ハードトップ',manufacturer:'ヘリノックス (Helinox)',productName:'テーブルワン ハードトップ',category:'furniture',width:.59,depth:.4,height:.38,ropeMargin:0,color:'#c4a77a',
  description:'ショックコードのフレームに硬い天板を載せる軽量テーブル。使用時 約59×40×38(h)cm、重量 約816g、耐荷重50kg。',weight:'約0.82 kg'},
 {id:'br-uniflame-takibi-table',mk3d:'takibitable',name:'ユニフレーム 焚き火テーブル (682104)',manufacturer:'ユニフレーム (UNIFLAME)',productName:'焚き火テーブル',modelNumber:'682104',category:'furniture',width:.55,depth:.35,height:.37,ropeMargin:0,color:'#c9ced3',
  description:'熱い鍋も置けるステンレス天板と天然木サイドのテーブル。使用時 約55×35×37(h)cm、収納時の厚さ約2.5cm、重量 約2.3kg、耐荷重 約50kg。',weight:'約2.3 kg'},
 {id:'br-coleman-powerhouse-lp-2burner',mk3d:'twoburner',name:'コールマン パワーハウスLPツーバーナーストーブII',manufacturer:'コールマン (Coleman)',productName:'パワーハウスLPツーバーナーストーブII',category:'furniture',width:.64,depth:.325,height:.52,ropeMargin:0,color:'#2e6b3d',
  description:'定番のツーバーナー(コンロ)。使用時 約64×32.5×52(h)cm(フタと風防を立てた状態)、収納 約54×32.5×7cm、重量 約4.2kg。',weight:'約4.2 kg'},
 {id:'br-iwatani-tafumaru-jr',mk3d:'cassette',name:'イワタニ カセットフー タフまるJr. (カセットコンロ)',manufacturer:'イワタニ (Iwatani)',productName:'カセットフー タフまるJr.',category:'furniture',width:.286,depth:.1925,height:.122,ropeMargin:0,color:'#2b2c2f',
  description:'風に強い防風構造のコンパクトなカセットコンロ。約28.6×19.25×12.2(h)cm、重量 約1.6kg(ケース込み 約2.5kg)。',weight:'約1.6 kg'},
 {id:'br-uniflame-fire-grill',mk3d:'firegrill',name:'ユニフレーム ファイアグリル (焚火台・グリル)',manufacturer:'ユニフレーム (UNIFLAME)',productName:'ファイアグリル',category:'furniture',width:.43,depth:.43,height:.33,ropeMargin:0,color:'#c9ced3',
  description:'焚き火もBBQもできる定番の焚き火台グリル。使用時 約43×43×33(h)cm、収納 約38×38×7cm。',packedSize:'約38 × 38 × 7 cm'}];
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
 }else if(k==='hammock'){ /* 自立スタンド: 床の2本のレール + 両端のアーチ、間に吊ったハンモック生地 */
  const hx=W/2,hz=D/2,mA=new Q({color:'#c9ced3',metalness:.85,roughness:.3}),mF=fab(it.color||'#3f6d8c'),ty=Math.max(H,.75)+.25;
  [-1,1].forEach(s=>{const r=add(new to(.018,.018,D,10),mA,!0);r.rotation.x=PI/2;r.position.set(s*hx*.85,.02,0)});
  [-1,1].forEach(sz=>{const pts=[new J(-hx*.85,.02,sz*hz*.92),new J(-hx*.5,ty*.8,sz*hz*.98),new J(0,ty,sz*hz),new J(hx*.5,ty*.8,sz*hz*.98),new J(hx*.85,.02,sz*hz*.92)];add(new Bo(new vo(pts),40,.018,8,!1),mA,!0)});
  const NU=12,NV=20,pos=[];const P=(u,v)=>{const z=(v-.5)*D*.86,sag=(1-Math.pow(2*v-1,2))*(ty-.42),x=(u-.5)*W*.72*Math.sin(PI*v)+0,y=ty-.05-sag+.08*Math.pow(2*u-1,2)*Math.sin(PI*v);return[x,y,z]};
  for(let i=0;i<NU;i++)for(let j=0;j<NV;j++){const a=P(i/NU,j/NV),b=P((i+1)/NU,j/NV),c=P((i+1)/NU,(j+1)/NV),d=P(i/NU,(j+1)/NV);pos.push(a,b,c,a,c,d)}tri(pos,mF,!0);
  [-1,1].forEach(sz=>{G.add(new La(new Qi().setFromPoints([new J(0,ty,sz*hz),new J(0,ty-.05,sz*D*.43)]),new ua({color:'#2b2b2e'})))});
 }else if(k==='woodrack'){ /* 薪ラック: スチールのU字フレームに薪を積み、上に木の天板 */
  const hx=W/2,hz=D/2,mS=new Q({color:'#2a2b2e',metalness:.6,roughness:.45}),mW=new Q({color:'#a77a4c',roughness:.8}),mBk=new Q({color:'#8a6a4a',roughness:.95}),mEnd=new Q({color:'#c9a77a',roughness:.9});
  [-1,1].forEach(sx=>[-1,1].forEach(sz=>{const l=add(new to(.01,.01,H,8),mS,!0);l.position.set(sx*hx*.95,H/2,sz*hz*.85)}));
  [-1,1].forEach(sz=>{const pts=[new J(-hx*.95,H*.85,sz*hz*.85),new J(-hx*.6,.06,sz*hz*.85),new J(hx*.6,.06,sz*hz*.85),new J(hx*.95,H*.85,sz*hz*.85)];add(new Bo(new vo(pts),30,.008,6,!1),mS,!0)});
  const top=add(new eo(W,.025,D),mW,!0);top.position.y=H;
  [[-.12,.1],[0,.1],[.12,.1],[-.06,.19],[.06,.19],[0,.27]].forEach(([x,y])=>{const lg=add(new to(.045,.045,D*.92,7),[mBk,mBk,mEnd]);lg.rotation.x=PI/2;lg.position.set(x*W/.4,y*H/.37,0)});
 }else if(k==='tripod'){ /* 焚き火三脚: 頂点でまとめた3本脚と、中央に垂らしたチェーンとフック・鍋 */
  const mS=new Q({color:'#1d1e21',metalness:.6,roughness:.4}),top=new J(0,H,0),R=Math.min(W,D)/2*1.05;
  for(let i=0;i<3;i++){const a=i*2*PI/3+PI/6,f=new J(Math.sin(a)*R,0,Math.cos(a)*R),m=add(new to(.013,.013,top.distanceTo(f),8),mS,!0);m.position.copy(top).add(f).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new J(0,1,0),f.clone().sub(top).normalize())}
  const cap=add(new to(.035,.035,.06,10),mS);cap.position.y=H;
  const ch=add(new to(.004,.004,H*.55,6),new Q({color:'#6b6f75',metalness:.9,roughness:.3}));ch.position.y=H-H*.275;
  const pot=add(new to(.11,.1,.13,18),new Q({color:'#2a2a2c',metalness:.4,roughness:.5}),!0);pot.position.y=H*.45-.08;
  const bail=add(new zo(.1,.004,6,16,PI),mS);bail.position.y=H*.45-.02;
 }else if(k==='woodstove'){ /* 時計型薪ストーブ: 箱形の本体と耐熱窓、脚、背面から立ち上がる煙突とT笠 */
  const hx=W/2,hz=D/2,bh=H*.82,mS=new Q({color:'#2c2c30',metalness:.5,roughness:.5}),mSt=new Q({color:'#bfc4c9',metalness:.9,roughness:.25});
  const body=add(new eo(W,bh*.86,D),mS,!0);body.position.y=H-bh*.86/2;const rf=add(new to(1,1,D,24,1,!1,-PI/2,PI),mS,!0);rf.rotation.x=PI/2;rf.scale.set(hx,1,.06);rf.position.y=H;
  [-1,1].forEach(sx=>[-1,1].forEach(sz=>{const l=add(new to(.012,.012,H-bh*.86,8),mS);l.position.set(sx*hx*.85,(H-bh*.86)/2,sz*hz*.85)}));
  const win=add(new Io(W*.6,bh*.45),new ua({color:'#ff9a3c'}));win.position.set(0,H-bh*.86*.5,hz+.009);
  const fr=add(new eo(W*.66,bh*.52,.01),mS);fr.position.set(0,H-bh*.86*.5,hz-.002);
  const CH=2.1,fl=add(new to(.053,.053,CH-H,16),mSt,!0);fl.position.set(0,H+(CH-H)/2,-hz*.75);
  const tc=add(new to(.11,.11,.08,16),mSt);tc.position.set(0,CH+.05,-hz*.75);const tc2=add(new no(.13,.07,16),mSt);tc2.position.set(0,CH+.12,-hz*.75);
 }else if(k==='chairone'){ /* チェアワン: ハブから伸びる黒いアルミ脚、前後の弓形フレーム、袋状のシート */
  const hx=W/2,hz=D/2,mA=new Q({color:'#1c1d20',metalness:.6,roughness:.4}),mF=fab(it.color||'#1f2124'),sh=.34,tb=(a,b,r=.009)=>add(new Bo(new vo(a.map(p=>new J(...p))),24,r,6,!1),mA,!0);
  [-1,1].forEach(sx=>{tb([[sx*hx*.95,0,hz*.85],[sx*hx*.55,sh*.6,hz*.1],[sx*hx*.4,sh,-hz*.1]]);tb([[sx*hx*.95,0,-hz*.85],[sx*hx*.55,sh*.55,-hz*.15],[sx*hx*.4,sh*.9,-hz*.1]]);
   tb([[sx*hx*.4,sh,-hz*.1],[sx*hx*.55,sh+.02,hz*.55]]);tb([[sx*hx*.4,sh*.9,-hz*.1],[sx*hx*.55,H*.75,-hz*.75],[sx*hx*.5,H,-hz*.85]])});
  const pos=[],NU=10,NV=14,Pt=(u,v)=>{const x=(u-.5)*W*.95*(1-.15*Math.sin(PI*v)),z=v<.5?hz*.55-(v/.5)*hz*.6:-hz*.05-((v-.5)/.5)*hz*.8,y=v<.5?sh-.06*Math.sin(PI*v/.5)*(1-Math.pow(2*u-1,2)):sh+((v-.5)/.5)*(H-sh)-.03*Math.sin(PI*(v-.5)/.5);return[x,y,z]};
  for(let i=0;i<NU;i++)for(let j=0;j<NV;j++){const a=Pt(i/NU,j/NV),b=Pt((i+1)/NU,j/NV),c=Pt((i+1)/NU,(j+1)/NV),d=Pt(i/NU,(j+1)/NV);pos.push(a,b,c,a,c,d)}tri(pos,mF,!0);
 }else if(k==='lowchair30'){ /* ローチェア30: 木のアームレスト、ハイバックの帆布、X字の脚 */
  const hx=W/2,hz=D/2,mA=new Q({color:'#c9ced3',metalness:.8,roughness:.3}),mWd=new Q({color:'#b5895a',roughness:.75}),mF=fab(it.color||'#5b5a3f'),sh=.3;
  [-1,1].forEach(sx=>{const arm=add(new eo(.05,.025,D*.85),mWd,!0);arm.position.set(sx*hx*.95,.48,hz*.05);
   [[[sx*hx*.9,0,hz*.85],[sx*hx*.9,.48,-hz*.6]],[[sx*hx*.9,0,-hz*.7],[sx*hx*.9,.48,hz*.7]],[[sx*hx*.9,.2,-hz*.6],[sx*hx*.9,H,-hz*.95]]].forEach(([a,b])=>{const A=new J(...a),B=new J(...b),m=add(new to(.011,.011,A.distanceTo(B),8),mA,!0);m.position.copy(A).add(B).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new J(0,1,0),B.clone().sub(A).normalize())})});
  const seat=add(new eo(W*.82,.02,D*.55),mF,!0);seat.position.set(0,sh,hz*.1);seat.rotation.x=-.08;
  const back=add(new eo(W*.82,H-sh-.05,.02),mF,!0);back.position.set(0,sh+(H-sh)/2,-hz*.72);back.rotation.x=-.2;
 }else if(k==='resortchair'){ /* リゾートチェア: 寝そべれる角度の背もたれ、低い座面、アームレスト */
  const hx=W/2,hz=D/2,mA=new Q({color:'#2b2b2e',metalness:.6,roughness:.4}),mF=fab(it.color||'#1f3355'),mWd=new Q({color:'#9a7350',roughness:.75});
  const pos=[],NU=8,NV=16,Pt=(u,v)=>{const x=(u-.5)*W*.85,z=hz*.9-v*D*.95,y=v<.45?.28+.04*(v/.45)-.04*Math.sin(PI*v/.45):.32+(v-.45)/.55*(H-.32);return[x,y-.03*(1-Math.pow(2*u-1,2)),z-(v>.45?(v-.45)*.05:0)]};
  for(let i=0;i<NU;i++)for(let j=0;j<NV;j++){const a=Pt(i/NU,j/NV),b=Pt((i+1)/NU,j/NV),c=Pt((i+1)/NU,(j+1)/NV),d=Pt(i/NU,(j+1)/NV);pos.push(a,b,c,a,c,d)}tri(pos,mF,!0);
  [-1,1].forEach(sx=>{const side=[[sx*hx,0,hz*.9],[sx*hx,.3,hz*.75],[sx*hx,.32,-hz*.05],[sx*hx,H,-hz*.95]];add(new Bo(new vo(side.map(p=>new J(...p))),30,.011,6,!1),mA,!0);
   const leg=[[sx*hx,0,-hz*.9],[sx*hx,.42,-hz*.1]];const A=new J(...leg[0]),B=new J(...leg[1]),m=add(new to(.011,.011,A.distanceTo(B),8),mA,!0);m.position.copy(A).add(B).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new J(0,1,0),B.clone().sub(A).normalize());
   const arm=add(new eo(.05,.025,D*.45),mWd,!0);arm.position.set(sx*hx*1.02,.45,0)});
 }else if(k==='igt'){ /* IGTスリム: 黒いスチールフレームと脚、天然木の天板6枚 */
  const hx=W/2,hz=D/2,mS=new Q({color:'#2a2b2e',metalness:.6,roughness:.45}),mW1=new Q({color:'#b48a5c',roughness:.7}),mW2=new Q({color:'#a77c50',roughness:.7});
  [-1,1].forEach(sz=>{const r=add(new eo(W,.03,.03),mS,!0);r.position.set(0,H-.015,sz*(hz-.015))});[-1,1].forEach(sx=>{const r=add(new eo(.03,.03,D),mS,!0);r.position.set(sx*(hx-.015),H-.015,0)});
  for(let i=0;i<6;i++){const sw=(W-.06)/6,b=add(new eo(sw-.004,.018,D-.06),i%2?mW1:mW2,!0);b.position.set(-hx+.03+sw*(i+.5),H-.003,0)}
  [-1,1].forEach(sx=>[-1,1].forEach(sz=>{const l=add(new to(.011,.011,H-.03,8),mS,!0);l.position.set(sx*(hx-.05),(H-.03)/2,sz*(hz-.05))}));
  [-1,1].forEach(sx=>{const b=add(new eo(.02,.02,D-.1),mS);b.position.set(sx*(hx-.05),.08,0)});
 }else if(k==='tableone'){ /* テーブルワン: X字に交差するアルミ脚と硬い天板 */
  const hx=W/2,hz=D/2,mA=new Q({color:'#1c1d20',metalness:.6,roughness:.4}),mT=new Q({color:it.color||'#c4a77a',roughness:.75});
  const top=add(new eo(W,.012,D),mT,!0);top.position.y=H;
  [-1,1].forEach(sz=>[-1,1].forEach(sx=>{const A=new J(sx*hx*.9,0,sz*hz*.75),B=new J(-sx*hx*.55,H-.01,sz*hz*.7),m=add(new to(.009,.009,A.distanceTo(B),8),mA,!0);m.position.copy(A).add(B).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new J(0,1,0),B.clone().sub(A).normalize())}));
  const hub=add(new to(.02,.02,D*.95,10),mA);hub.rotation.x=PI/2;hub.position.y=H*.55;
 }else if(k==='takibitable'){ /* 焚き火テーブル: エンボスのステンレス天板、天然木のサイド、U字のステンレス脚 */
  const hx=W/2,hz=D/2,mS=new Q({color:'#d8dcdf',metalness:.35,roughness:.4}),mWd=new Q({color:'#a8794c',roughness:.75});
  const top=add(new eo(W*.84,.012,D),mS,!0);top.position.y=H;[-1,1].forEach(sx=>{const s=add(new eo(W*.08,.025,D),mWd,!0);s.position.set(sx*(hx-W*.04),H,0)});
  [-1,1].forEach(sx=>{const pts=[new J(sx*hx*.75,H-.01,-hz*.85),new J(sx*hx*.75,.01,-hz*.85),new J(sx*hx*.75,.01,hz*.85),new J(sx*hx*.75,H-.01,hz*.85)];add(new Bo(new vo(pts,!1,'catmullrom',.02),40,.008,6,!1),mS,!0)});
 }else if(k==='twoburner'){ /* ツーバーナー: 緑の本体、立てたフタと左右の風防、バーナー2口と五徳 */
  const hx=W/2,hz=D/2,bh=.11,mG=new Q({color:'#2e6b3d',roughness:.5,metalness:.3}),mS=new Q({color:'#c9ced3',metalness:.85,roughness:.3}),mK=new Q({color:'#151517',roughness:.6});
  const body=add(new eo(W*.85,bh,D),mG,!0);body.position.y=bh/2+.01;
  const lid=add(new eo(W*.85,H-bh,.012),mG,!0);lid.position.set(0,bh+(H-bh)/2,-hz);
  [-1,1].forEach(sx=>{const w=add(new eo(.012,(H-bh)*.55,D*.9),mG,!0);w.position.set(sx*hx*.85,bh+(H-bh)*.27,0)});
  const pan=add(new eo(W*.82,.004,D*.9),mS);pan.position.y=bh+.012;
  [-1,1].forEach(sx=>{const b=add(new to(.045,.05,.02,16),mK);b.position.set(sx*W*.2,bh+.02,0);const r=add(new zo(.07,.004,6,18),mK);r.rotation.x=PI/2;r.position.set(sx*W*.2,bh+.045,0)});
  const tank=add(new to(.035,.035,.12,12),new Q({color:'#f2c200',roughness:.5}));tank.rotation.z=PI/2;tank.position.set(hx*1.05,bh*.6,0);
 }else if(k==='cassette'){ /* カセットコンロ: 低い箱形の本体、防風リング、五徳、つまみ */
  const hx=W/2,hz=D/2,mB=new Q({color:'#2b2c2f',roughness:.5,metalness:.3}),mS=new Q({color:'#c9ced3',metalness:.85,roughness:.3});
  const body=add(new eo(W,H*.55,D),mB,!0);body.position.y=H*.275;const top=add(new eo(W*.96,.004,D*.96),mS);top.position.y=H*.55;
  const ring=add(new to(.075,.075,H*.35,20,1,!0),mS,!0);ring.position.set(hx*.2,H*.55+H*.175,0);
  for(let i=0;i<4;i++){const a=i*PI/2,g=add(new eo(.05,.012,.008),new Q({color:'#151517'}));g.rotation.y=a;g.position.set(hx*.2+Math.cos(a)*.06,H*.92,Math.sin(a)*.06)}
  const kn=add(new to(.012,.012,.02,12),new Q({color:'#c62828'}));kn.rotation.x=PI/2;kn.position.set(-hx*.7,H*.3,hz+.01);
 }else if(k==='firegrill'){ /* ファイアグリル: 四角いステンレスの炉、4本脚、炭と炎、焼き網 */
  const hx=W/2,hz=D/2,mS=new Q({color:'#d8dcdf',metalness:.35,roughness:.4}),fh=H*.45,by=H-fh*.9;
  const pan=add(new eo(W*.8,.01,D*.8),mS,!0);pan.position.y=by;
  [[0,1],[0,-1],[1,0],[-1,0]].forEach(([sx,sz])=>{const w=add(new eo(sx?.01:W*.8,fh,sz?.01:D*.8),mS,!0);w.position.set(sx*W*.4,by+fh/2,sz*D*.4);if(sx)w.rotation.z=sx*.25;else w.rotation.x=-sz*.25})
  ;[-1,1].forEach(sx=>[-1,1].forEach(sz=>{const A=new J(sx*hx,0,sz*hz),B=new J(sx*W*.38,by,sz*D*.38),m=add(new to(.008,.008,A.distanceTo(B),8),mS,!0);m.position.copy(A).add(B).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new J(0,1,0),B.clone().sub(A).normalize())}));
  const coal=add(new eo(W*.55,.04,D*.55),new Q({color:'#2a1a12',emissive:'#7a2a0a',roughness:.9}));coal.position.y=by+.03;
  const fl=add(new no(.08,.16,10),new ua({color:'#ff8a2a',transparent:!0,opacity:.85}));fl.position.y=by+.13;
  const net=add(new eo(W*.95,.006,D*.95),new Q({color:'#9aa0a6',metalness:.8,roughness:.4,wireframe:!0}));net.position.y=H;
 }
}
