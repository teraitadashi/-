/* ===== Coleman 2026年 新作ギア (2026年10月 Web調査) =====
   レイアウトに置くギアのうち、使用時サイズを確認できたもの。isNew2026 でギア追加画面の「Coleman 2026新作」タブに出る。
   cat3d: 3Dは同じ種類の既存モデルを新作の寸法に伸縮して表示 (mdx=2ルーム / dome=ドーム / shade=インスタントシェード / popup=ポップアップシェード / chair / cooler) */
const __C26=[];
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
