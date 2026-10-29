/* ===== Coleman 2026年 新作ギア (2026年10月 Web調査) =====
   レイアウトに置くギアのうち、使用時サイズを確認できたもの。isNew2026 でギア追加画面の「Coleman 2026新作」タブに出る。
   cat3d: 3Dは同じ種類の既存モデルを新作の寸法に伸縮して表示 (mdx=2ルーム / dome=ドーム / shade=インスタントシェード / popup=ポップアップシェード / chair / cooler) */
const __C26=[
 {id:'c26-tough-speed-dome',name:'コールマン タフスピードドーム (2026新作)',manufacturer:'コールマン (Coleman)',productName:'タフスピードドーム',category:'tent',shapeType:'c26_tent2room',cat3d:'mdx',width:3.6,depth:6.2,height:2.1,ropeMargin:1,color:'#cdbb9c',isNew2026:!0,
  description:'2026年2月発売の2ルームテント。センターポールのAフレームで先に自立させてから設営できる。使用時 約360×620×210(h)cm、収納 約Φ31×75cm、重量 約17kg。標準色ベージュ、アルペン限定でグレー(DRルーフ)あり。',packedSize:'約Φ31 × 75 cm',weight:'約17 kg'},
 {id:'c26-cocoon3-50ltd',name:'コールマン 50 リミテッド コクーンIII (2026新作)',manufacturer:'コールマン (Coleman)',productName:'50 リミテッド コクーンIII',category:'tent',shapeType:'c26_tent2room',cat3d:'mdx',width:4,depth:6.7,height:2.2,ropeMargin:1.1,color:'#2a2b2e',isNew2026:!0,capacity:'5〜6人用',innerDimensions:{width:3.6,depth:2.4,height:1.95},
  description:'日本創業50周年記念「50 リミテッド」第2弾(2026年9月11日発売)。ブラックで統一した大型2ルームテント。本体 約400×670×220(h)cm、インナー 約360×240×195(h)cm、定員5〜6人。'},
 {id:'c26-touring-dome-sdx',name:'コールマン ツーリングドーム/SDX (2026新作)',manufacturer:'コールマン (Coleman)',productName:'ツーリングドーム/SDX',category:'tent',shapeType:'c26_dome',cat3d:'dome',width:2.1,depth:2.65,height:1.1,ropeMargin:.8,color:'#e3e7ec',isNew2026:!0,capacity:'1〜2人用',innerDimensions:{width:2.1,depth:1.2,height:1},
  description:'2026年秋冬の新作(9月中旬発売)。夏は全面メッシュ、冬はフルスカートのオールシーズン対応ソロドーム。本体 約265×210×110(h)cm、インナー 約210×120×100(h)cm、収納 約Φ19×49cm、重量 約4.3kg。',packedSize:'約Φ19 × 49 cm',weight:'約4.3 kg'},
 {id:'c26-ivs4-m-dr',name:'コールマン インスタントバイザーシェードIV/M DR (2026新作)',manufacturer:'コールマン (Coleman)',productName:'インスタントバイザーシェードIV/M DR',category:'tarp',shapeType:'c26_shade',cat3d:'shade',width:2.7,depth:2.7,height:2.6,ropeMargin:.8,color:'#26272b',isNew2026:!0,
  description:'2026年新商品のワンタッチシェード(ダークルームテクノロジー)。使用時 約270×270×260(h)cm、収納 約19×19×90cm、重量 約13.6kg。ジェットブラック、アルペン限定デザートサンド。',packedSize:'約19 × 19 × 90 cm',weight:'約13.6 kg'},
 {id:'c26-ivs4-l-dr',name:'コールマン インスタントバイザーシェードIV/L DR (2026新作)',manufacturer:'コールマン (Coleman)',productName:'インスタントバイザーシェードIV/L DR',category:'tarp',shapeType:'c26_shade',cat3d:'shade',width:3,depth:3,height:2.67,ropeMargin:.9,color:'#26272b',isNew2026:!0,
  description:'2026年新商品のワンタッチシェード Lサイズ(ダークルームテクノロジー)。使用時 約300×300×267(h)cm、収納 約98×19×19cm、重量 約14.8kg。',packedSize:'約98 × 19 × 19 cm',weight:'約14.8 kg'},
 {id:'c26-quickup-rainblock',name:'コールマン クイックアップシェードDR レインブロック (2026新作)',manufacturer:'コールマン (Coleman)',productName:'クイックアップシェードDR レインブロック',category:'tent',shapeType:'c26_popup',cat3d:'popup',width:2,depth:1.5,height:1.25,ropeMargin:.4,color:'#c6c1b6',isNew2026:!0,capacity:'2〜3人用',
  description:'2026年新商品(品番2235740)のポップアップシェード。縫い目にシームテープを施した簡易防水仕様。展開 約200×150×125(h)cm、収納 約Φ59×8cm、重量 約2.6kg。',packedSize:'約Φ59 × 8 cm',weight:'約2.6 kg'},
 {id:'c26-one-mile-chair',name:'コールマン ワンマイルチェア (ジェットブラック)',manufacturer:'コールマン (Coleman)',productName:'ワンマイルチェア',category:'furniture',shapeType:'c26_chair',cat3d:'chair',width:.58,depth:.64,height:.98,ropeMargin:0,color:'#2a2b2e',isNew2026:!0,
  description:'キャリーとしても使えるタイヤ付きチェア。ジェットブラックは公式通販の2026年新商品(チェア)に掲載。使用時 約58×64×98(h)cm、座面幅 約48cm、座面高 約41cm、タイヤ径 約12cm。希望小売価格 9,350円。'},
 {id:'c26-deck-chair-nx',name:'コールマン デッキチェアNX (ヘザーグレー)',manufacturer:'コールマン (Coleman)',productName:'デッキチェアNX',category:'furniture',shapeType:'c26_chair',cat3d:'chair',width:.6,depth:.72,height:1,ropeMargin:0,color:'#9c9ea1',isNew2026:!0,
  description:'2026年2月発売。フレームを見直し収納時の高さが従来より約22cm低い。座面幅 約53cm、座面高 約46cm、耐荷重 約100kg、希望小売価格 11,550円。※全体の使用時寸法は未公表のため約60×72×100cmの概算で配置。'},
 {id:'c26-flat-table-60',name:'コールマン フラットテーブル/60 (ブラック)',manufacturer:'コールマン (Coleman)',productName:'フラットテーブル/60',category:'furniture',shapeType:'furn_table',width:.6,depth:.42,height:.4,ropeMargin:0,color:'#2b2b2e',isNew2026:!0,
  description:'2026年新作の薄型テーブル。天板の一部を外してデュアルガスバーナーストーブを組み込める。使用時 約60×42×30/40(h)cm、収納時 厚さ約4cm、重量 約1.8〜2.2kg、希望小売価格 10,230円。',weight:'約1.8〜2.2 kg'},
 {id:'c26-dual-gas-burner',name:'コールマン デュアルガスバーナーストーブ',manufacturer:'コールマン (Coleman)',productName:'デュアルガスバーナーストーブ',category:'furniture',shapeType:'c26_stove',width:.425,depth:.315,height:.18,ropeMargin:0,color:'#2b2d31',isNew2026:!0,
  description:'2026年新作。OD缶・CB缶の両方が使えるフラットなツーバーナー。フラットテーブル/60に組み込める。サイズ 約42.5×31.5×18(h)cm、収納 約36×31×8cm、重量 約2.2kg。',packedSize:'約36 × 31 × 8 cm',weight:'約2.2 kg'},
 {id:'c26-take9',name:'コールマン テイク9',manufacturer:'コールマン (Coleman)',productName:'テイク9',category:'furniture',shapeType:'c26_cooler',cat3d:'cooler',width:.295,depth:.21,height:.275,ropeMargin:0,color:'#2f6fb5',isNew2026:!0,
  description:'2026年新作の小型ハードクーラー。500mlペットボトル6本/350ml缶9本を収納。サイズ 約29.5×21×27.5(h)cm、容量 約8.3L、重量 約1.2kg、蓋の耐荷重 約60kg。全6色。',weight:'約1.2 kg'},
 {id:'c26-wheel-cooler-60qt',name:'コールマン ホイールクーラー/60QT (ジェットブラック)',manufacturer:'コールマン (Coleman)',productName:'ホイールクーラー/60QT',category:'furniture',shapeType:'c26_cooler',cat3d:'cooler',width:.58,depth:.45,height:.46,ropeMargin:0,color:'#1d1e21',isNew2026:!0,
  description:'2026年2月発売のホイール付き大型クーラー(2238189)。サイズ 約58×45×46(h)cm、容量 56L、重量 5.6kg、希望小売価格 10,890円。',weight:'約5.6 kg'}];
/* 新作のカラー (色が確認できたもの。ui:0 は色ボタンを出さずに表示色だけ合わせる) */
Object.assign(__CV,{
 'c26-tough-speed-dome':{base:'#e4e8ee',t:['f0f3f7','e4e8ee','e6e9ee'],al:1,v:[['ベージュ','#cdbb9c'],['グレー (アルペン限定)','#8e9296']]},
 'c26-cocoon3-50ltd':{base:'#e4e8ee',t:['f0f3f7','e4e8ee','e6e9ee'],al:1,v:[['ブラック','#2a2b2e']]},
 'c26-ivs4-m-dr':{base:'#bcc7d8',t:['bcc7d8','c2ccdb','a9b4c5'],al:1,v:[['ジェットブラック','#26272b'],['デザートサンド (アルペン限定)','#cdb994']]},
 'c26-ivs4-l-dr':{base:'#bcc7d8',t:['bcc7d8','c2ccdb','a9b4c5'],al:1,v:[['ジェットブラック','#26272b'],['デザートサンド (アルペン限定)','#cdb994']]},
 'c26-quickup-rainblock':{base:'#e9bfae',t:['e9bfae'],al:1,ui:0,v:[['標準','#c6c1b6']]},
 'c26-one-mile-chair':{base:'#b3a18f',t:['7d7367'],vc:1,vr:.92,al:1,v:[['ジェットブラック','#2a2b2e']]},
 'c26-deck-chair-nx':{base:'#b3a18f',t:['7d7367'],vc:1,vr:.92,al:1,v:[['ヘザーグレー','#9c9ea1']]},
 'c26-flat-table-60':{base:'#bfa074',t:['bfa074'],al:1,v:[['ブラック','#2b2b2e']]},
 'c26-take9':{base:'#c9302a',t:['c9302a','c4301f','b02822','a9261a'],al:1,v:[['ブルー','#2f6fb5'],['デイドリーム','#b8c6e8'],['ミント','#9fd3c7'],['レッド','#c9302a'],['オレンジ','#e8742a'],['ジェットブラック','#1d1e21']]},
 'c26-wheel-cooler-60qt':{base:'#c9302a',t:['c9302a','c4301f','b02822','a9261a'],al:1,v:[['ジェットブラック','#1d1e21']]}});
/* 既存モデルを新作の寸法に伸縮して置く */
function __cat3d(s,e,anim,logo){const P={mdx:[(g,i)=>__mdx(g,i,{},anim),3.4,5.6,2.15],dome:[(g,i)=>__dome(g,i,{},anim),2.1,3.35,1.22],shade:[(g,i)=>__shade(g,i,{},anim),2.5,2.5,2.5],
  popup:[(g,i)=>__pykes(g,i,anim),2.1,1.07,1.1,{noVisor:1}],chair:[(g,i)=>__chair(g,i,'hb',{logo}),.53,.63,.95],cooler:[(g,i)=>__cooler(g,i),.39,.31,.29]}[e.cat3d];
 if(!P)return!1;const g=new Xr,it={...e,width:P[1],depth:P[2],height:P[3],...(P[4]||{})};P[0](g,it);g.scale.set(e.width/P[1],e.height/P[3],e.depth/P[2]);s.add(g);return!0}
