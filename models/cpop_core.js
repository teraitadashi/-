/* ===== Coleman 定番・人気ギア (2026年10月 Web調査、公表サイズ) =====
   genSym: 2D は名前入りの汎用記号 / cat3d: 3D は同じ種類の既存モデルを寸法に合わせて伸縮 (未指定はテーブル・焚火台・箱の汎用表示) */
const __CPOP=[
 {id:'cp-natural-wood-roll-table-110',name:'コールマン ナチュラルウッドロールテーブル(110)',productName:'ナチュラルウッドロールテーブル(110)',category:'furniture',width:1.12,depth:.7,height:.7,ropeMargin:0,color:'#b48a5c',description:'天然木天板の定番ロールテーブル。使用時 約112×70×40/70(h)cm、重量 約5.3kg。',weight:'約5.3 kg'},
 {id:'cp-natural-mosaic-living-table-120',name:'コールマン ナチュラルモザイクリビングテーブル/120プラス',productName:'ナチュラルモザイクリビングテーブル/120プラス',category:'furniture',width:1.2,depth:.6,height:.7,ropeMargin:0,color:'#a8794c',description:'木目調天板のリビングテーブル。使用時 約120×60×40/70(h)cm、重量 約4.5kg。',weight:'約4.5 kg'},
 {id:'cp-butterfly-table-nx-120',name:'コールマン バタフライテーブルNX/120',productName:'バタフライテーブルNX/120',category:'furniture',width:1.2,depth:.6,height:.7,ropeMargin:0,color:'#9a9184',description:'高さ3段階のバタフライテーブル。天板 約120×60cm、高さ 70/60/41cm、重量 約5kg。',weight:'約5 kg'},
 {id:'cp-fireplace-table',name:'コールマン ファイアープレイステーブル',productName:'ファイアープレイステーブル',category:'furniture',width:1,depth:1,height:.27,ropeMargin:0,color:'#c9ced3',description:'焚き火台を囲むオールステンレスのテーブル。約100×100×27(h)cm、重量 約6kg。',weight:'約6 kg'},
 {id:'cp-fire-disk',name:'コールマン ファイアーディスク (焚火台)',productName:'ファイアーディスク',category:'furniture',shapeType:'furn_bonfire',width:.45,depth:.45,height:.23,ropeMargin:0,color:'#c9ced3',description:'脚を広げるだけの人気焚き火台。使用時 約Φ45×23(h)cm、重量 約1.6kg、耐荷重 約30kg。',weight:'約1.6 kg'},
 {id:'cp-fire-disk-solo',name:'コールマン ファイアーディスクソロ (焚火台)',productName:'ファイアーディスクソロ',category:'furniture',shapeType:'furn_bonfire',width:.3,depth:.3,height:.16,ropeMargin:0,color:'#c9ced3',description:'ソロ用の焚き火台。使用時 約Φ30×16(h)cm、重量 約620g。',weight:'約0.62 kg'},
 {id:'cp-powerhouse-lp-2burner',name:'コールマン パワーハウスLPツーバーナーストーブII',productName:'パワーハウスLPツーバーナーストーブII',category:'furniture',width:.64,depth:.325,height:.52,ropeMargin:0,color:'#2e6b3d',description:'定番のツーバーナー。使用時 約64×32.5×52(h)cm(風防込み)、収納 約54×32.5×7cm、重量 約4.2kg。',weight:'約4.2 kg'},
 {id:'cp-trailhead-cot',name:'コールマン トレイルヘッドコット',productName:'トレイルヘッドコット',category:'furniture',width:.87,depth:1.9,height:.4,ropeMargin:0,color:'#3c4a3a',description:'ベンチにもなる人気コット。展開時 約190×87×40(h)cm、収納 約14×18×93cm、重量 約9kg。',weight:'約9 kg'}];
__CPOP.forEach(g=>{g.manufacturer='コールマン (Coleman)';g.isPopular=!0;g.genSym=!0;g.shapeType=g.shapeType||('cp_'+g.category)});
/* 人気ギアのカラー (色を確認できたもの) */
Object.assign(__CV,{
 'cp-steel-belt-cooler-54qt':{base:'#c9302a',t:['c9302a','c4301f','b02822','a9261a'],al:1,v:[['グリーン','#2b7a4b'],['ミッドナイト (マットブラック)','#1c1d20'],['バターナッツ','#d9b46a']]},
 'cp-northstar-lantern':{base:'#26292d',t:['26292d'],al:1,v:[['グリーン','#2e6b3d'],['レッド','#b3261e'],['インディゴレーベル','#2c3550']]}});
