/* ===== 手持ちギアの実カラー (2026年10月 調査) =====
   v: [カラー名, 代表色]。先頭がプリセット(モデル)の標準色。
   t: 3Dモデルで本体色として塗り替える素材の色 (sRGB hex)
   vc: 頂点カラーで塗られた白い素材も塗り替える (vr: その素材の roughness) */
const __CV={
 'my-coleman-outdoor-wagon-nx':{base:'#b3261e',t:['c4382c','7d1a15','c4301f','b3261e'],v:[['レッド','#b3261e'],['ライトグレー','#b9bcbf']]},
 'my-coleman-toughscreen-2room-air-mdx':{base:'#e4e8ee',t:['f0f3f7','e4e8ee','e6e9ee'],v:[['グレー','#e4e8ee'],['モスグリーン (限定)','#7a8160']]},
 'my-pykes-peak-dome-1p':{base:'#e9bfae',t:['e9bfae'],v:[['アプリコットベージュ','#e9bfae'],['オリーブグリーン','#77794f'],['オフホワイト','#ece8df'],['カーディナルレッド','#9e2a2b'],['サンドカーキ','#b9a782']]},
 'my-coleman-healing-chair-hb':{base:'#b3a18f',t:['7d7367'],vc:1,vr:.92,v:[['グレージュ','#b3a18f'],['オリーブ','#7b7a55']]},
 'my-coleman-coolstage-tabletop':{base:'#c42a27',t:['c42a27','a21f1f'],v:[['レッド','#c42a27'],['グリーン','#3f6b4a']]},
 'my-coleman-packaway-lantern':{base:'#26292d',t:['26292d'],v:[['ブラック','#26292d'],['ナチュラルウッド','#a77b4f']]},
 'my-coleman-excursion-cooler-16qt-red':{base:'#c9302a',t:['c9302a','c4301f','b02822','a9261a'],v:[['レッド/ホワイト','#c9302a'],['ライトグレー','#b8bcc0'],['ミント','#9fd3c7'],['ブルー/ホワイト','#2f6fb5'],['オレンジ','#e8742a'],['デイドリーム','#b8c6e8'],['オリーブ','#6f7350']]},
 'my-nissan-elgrand-e52':{base:'#f4f4f1',t:['f4f4f1'],vc:1,vr:.3,v:[['ブリリアントホワイトパール','#f4f4f1'],['ファントムブラック','#1c1d21']]},
 'my-suzuki-mrwagon':{base:'#f4f5f4',t:['f7f8f7','f3f7f8'],vc:1,vr:.34,v:[['パールホワイト','#f4f5f4'],['リーフホワイト','#f1f0e6'],['ブルーイッシュブラックパール3','#1d2230'],['コメットグリーンパールメタリック','#5f7a4e'],['アーバンブラウン','#6b4a36'],['フォレストアクアメタリック','#4f8a87'],['フィズブルーパールメタリック','#3c6fa8'],['シャンパンピンクパールメタリック','#e2c2b6'],['アロマティックアクアメタリック','#7cc0bf'],['エアブルーメタリック','#8fb6d6'],['カシスピンクパールメタリック','#c46b8e'],['ミルクティーベージュメタリック','#cdb79a'],['パールメタリックカシミールブルー','#5d7fa6']]}};
function __cvPick(n){const C=n&&__CV[n.presetId];if(!C||!n.colorName||n.colorName===C.v[0][0])return null;const v=C.v.find(x=>x[0]===n.colorName);return v?[C,v]:null}
const __cvLum=c=>.2126*c.r+.7152*c.g+.0722*c.b;
/* 2D記号用: 標準色の濃淡を、選んだカラーの同じ濃淡に置き換える */
function __cv2(n,hex){const P=__cvPick(n);if(!P)return hex;const V=new ri(P[1][1]),k=Math.min(2.5,Math.max(.25,__cvLum(new ri(hex))/Math.max(.001,__cvLum(new ri(P[0].base)))));V.multiplyScalar(k);V.r=Math.min(1,V.r);V.g=Math.min(1,V.g);V.b=Math.min(1,V.b);return '#'+V.getHexString()}
/* 3Dモデル用: 組み立て後のモデルの本体色の素材だけを選んだカラーに塗り替える */
function __recolor(G,it){const P=__cvPick(it);if(!P)return;const C=P[0],V=new ri(P[1][1]),B=new ri(C.base),bl=Math.max(.001,__cvLum(B)),done=new Map;
 const fix=m=>{if(!m||!m.color)return m;if(done.has(m))return done.get(m);let n=m;const hx=m.color.getHexString();
  if(C.vc&&m.vertexColors&&hx==='ffffff'&&(C.vr==null||Math.abs(m.roughness-C.vr)<.011)){n=m.clone();const w=new ri('#ffffff');n.color.setRGB(Math.min(3,V.r/Math.max(.02,B.r)*w.r),Math.min(3,V.g/Math.max(.02,B.g)),Math.min(3,V.b/Math.max(.02,B.b)));if(n.emissive)n.emissive.multiply(V)}
  else if(C.t.includes(hx)){n=m.clone();const k=Math.min(2.5,Math.max(.25,__cvLum(m.color)/bl));n.color.copy(V).multiplyScalar(k);n.color.r=Math.min(1,n.color.r);n.color.g=Math.min(1,n.color.g);n.color.b=Math.min(1,n.color.b)}
  done.set(m,n);return n};
 G.traverse(o=>{if(o.isMesh)o.material=Array.isArray(o.material)?o.material.map(fix):fix(o.material)})}
