/* ===== Coleman 定番・人気ギア (2026年10月 Web調査、公表サイズ) =====
   genSym: 2D は名前入りの汎用記号 / cat3d: 3D は同じ種類の既存モデルを寸法に合わせて伸縮 (未指定はテーブル・焚火台・箱の汎用表示) */
const __CPOP=[];
__CPOP.forEach(g=>{g.manufacturer='コールマン (Coleman)';g.isPopular=!0;g.genSym=!0;g.shapeType=g.shapeType||('cp_'+g.category)});
/* 人気ギアのカラー (色を確認できたもの) */
Object.assign(__CV,{
 'cp-steel-belt-cooler-54qt':{base:'#c9302a',t:['c9302a','c4301f','b02822','a9261a'],al:1,v:[['グリーン','#2b7a4b'],['ミッドナイト (マットブラック)','#1c1d20'],['バターナッツ','#d9b46a']]},
 'cp-northstar-lantern':{base:'#26292d',t:['26292d'],al:1,v:[['グリーン','#2e6b3d'],['レッド','#b3261e'],['インディゴレーベル','#2c3550']]}});
