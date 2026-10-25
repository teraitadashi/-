import base64,re
s=open('app21.js').read()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:70],s.count(a))
    s=s.replace(a,b)
core=open('harness/extra_core.js').read()
b64=base64.b64encode(open('cooler_img.webp','rb').read()).decode()
i=s.index("const __imgCar=");e=s.index("\n",i)
s=s[:e+1]+"const __imgCooler=`data:image/webp;base64,"+b64+"`;\n"+s[e+1:]
i=s.index("function __tent(");s=s[:i]+core+"\n"+("function __potHost(e,i){let n=i.name||``;return(e.name||``).includes(`鍋`)&&!n.includes(`鍋`)&&/グリル|コンロ|ストーブ|剛炎|バーナー|クールステージ/.test(n)}function __isHost(e){return!(e.name||``).includes(`鍋`)&&/グリル|コンロ|ストーブ|剛炎|バーナー|クールステージ/.test(e.name||``)}\n")+s[i:]
# 1. remove wagon table preset
i=s.index("{id:`my-coleman-outdoor-wagon-table`,");j=s.index("isMyGear:!0},",i)+len("isMyGear:!0},")
s=s[:i]+s[j:]
# 2. presets
pre=("{id:`my-coleman-excursion-cooler-16qt-red`,name:`コールマン エクスカーションクーラー/16QT (レッド)`,manufacturer:`コールマン (Coleman)`,productName:`エクスカーションクーラー/16QT (レッド)`,modelNumber:`2000027860`,category:`furniture`,shapeType:`furn_cooler_box`,width:.39,depth:.31,height:.29,ropeMargin:0,color:`#c9302a`,"
"description:`外寸 約39×31×29(h)cm、容量約15L(16QT)、重量約1.8kg。保冷力は約1日（デイキャンプ・ピクニック向け）。フタはイージークリーントップで拭き取りやすく、耐荷重約60kgで簡易テーブルや腰掛けにも使えます。※型番は旧モデルのレッド(2000027860)の表記で、現行品は型番が異なる場合があります。`,"
"packedSize:`約39 × 31 × 29(h) cm`,weight:`約1.8 kg`,imageUrl:__imgCooler,isMyGear:!0},"
"{id:`my-black-pot-24`,name:`黒い鍋 (直径24cm・フタ付き)`,manufacturer:`(汎用)`,productName:`黒い鍋`,category:`furniture`,shapeType:`furn_pot`,width:.31,depth:.25,height:.18,ropeMargin:0,color:`#2b2d31`,"
"description:`黒い鍋のイメージモデル（直径約24cm・高さ約18cm・両手付き・フタ付き）。グリル・ストーブ・テーブルの上に載せられます。実際の製品に合わせたい場合は、型番かお写真をお知らせください。`,"
"packedSize:`直径 約25 × 高さ 約18 cm`,isMyGear:!0},")
rep("{id:`my-nissan-elgrand-e52`,",pre+"{id:`my-nissan-elgrand-e52`,")
# 3D hooks
rep("e.presetId===`my-nissan-elgrand-e52`||e.name.includes(`エルグランド`)){__elgrand(s,e)}else if(","e.presetId===`my-nissan-elgrand-e52`||e.name.includes(`エルグランド`)){__elgrand(s,e)}else if(e.presetId===`my-coleman-excursion-cooler-16qt-red`||e.shapeType===`furn_cooler_box`){__cooler(s,e)}else if(e.presetId===`my-black-pot-24`||e.shapeType===`furn_pot`){__pot(s,e)}else if(")
# 4. stacking logic
rep("if(i.id===e.id||!D(i))continue;","if(i.id===e.id||!(D(i)||__potHost(e,i)))continue;")
rep("y({x:i.x-n.x,y:i.y-n.y}),D(n)){","y({x:i.x-n.x,y:i.y-n.y}),D(n)||__isHost(n)){")
rep("tabletopChildren:D(I)?","tabletopChildren:D(I)||__isHost(I)?")
rep("if(!(D(r)&&k(a,t)?.id===r.id||D(a)&&k(r,t)?.id===a.id)){","if(!(k(a,t)?.id===r.id||k(r,t)?.id===a.id)){")
# 5. popup
rep("t.length===0&&(0,U.jsx)(`div`,{className:`absolute inset-0 flex items-center justify-center pointer-events-none p-6 text-center`","!1&&(0,U.jsx)(`div`,{className:`absolute inset-0 flex items-center justify-center pointer-events-none p-6 text-center`")
# 6. whole-site photo
rep("surroundedByHedges:!1,imageUrl:__imgNkMap,description:`のかみふれあい公園オートキャンプ場の全21区画","surroundedByHedges:!1,imageUrl:__img7,description:`のかみふれあい公園オートキャンプ場の全21区画")
# 7. 2D symbols
H2=r"""n.name.includes(`黒い鍋`)||n.shapeType===`furn_pot`?(()=>{const R=.125*l;return(0,U.jsxs)(`g`,{children:[
(0,U.jsx)(`rect`,{x:-.155*l,y:-.02*l,width:.31*l,height:.04*l,rx:.012*l,fill:`#17181a`}),
(0,U.jsx)(`circle`,{cx:0,cy:0,r:R+.005*l,fill:`#2b2d31`,stroke:r?`#38bdf8`:d,strokeWidth:r?3:1.5}),
(0,U.jsx)(`circle`,{cx:0,cy:0,r:R*.86,fill:`#3a3d42`,stroke:`#5a5e65`,strokeWidth:`1`}),
(0,U.jsx)(`circle`,{cx:0,cy:0,r:R*.2,fill:`#17181a`,stroke:`#6e7379`,strokeWidth:`0.8`})]})})():n.name.includes(`エクスカーションクーラー`)||n.shapeType===`furn_cooler_box`?(0,U.jsxs)(`g`,{children:[
(0,U.jsx)(`rect`,{x:-c/2,y:-u/2,width:c,height:u,rx:.05*l,fill:`#c9302a`,stroke:r?`#38bdf8`:d,strokeWidth:r?3:1.5}),
(0,U.jsx)(`rect`,{x:-c/2+.006*l,y:-u/2+.006*l,width:c-.012*l,height:u-.012*l,rx:.05*l,fill:`#f4f5f6`,stroke:`#d0d4d8`,strokeWidth:`0.8`}),
(0,U.jsx)(`rect`,{x:-.17*l,y:-.065*l,width:.34*l,height:.13*l,rx:.03*l,fill:`none`,stroke:`#cdd2d7`,strokeWidth:`1`}),
(0,U.jsx)(`path`,{d:`M ${-c/2} ${-.02*l} Q 0 ${-.12*l} ${c/2} ${-.02*l}`,fill:`none`,stroke:`#c4301f`,strokeWidth:`3`,strokeLinecap:`round`})]}):"""
H2=H2.replace("\n","")
a2="n.name.includes(`エルグランド`)?(()=>{"
rep(a2,H2+a2)
open('app22.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app21.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built',len(s))
