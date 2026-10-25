import base64
s=open('app24.js').read()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:70],s.count(a))
    s=s.replace(a,b)
# swap pot core
i=s.index("function __pot(G,it){");j=s.index("function __tent(")
j2=s.index("function __potHost",i)
newcore=open('harness/extra_core.js').read()
k=newcore.index("function __pot(G,it){")
s=s[:i]+newcore[k:]+"\n"+s[j2:]
# image
b64=base64.b64encode(open('pot_img.webp','rb').read()).decode()
i=s.index("const __imgCooler=");e=s.index("\n",i)
s=s[:e+1]+"const __imgDutch=`data:image/webp;base64,"+b64+"`;\n"+s[e+1:]
# preset
i=s.index("{id:`my-black-pot-24`,");j=s.index("isMyGear:!0},",i)+len("isMyGear:!0},")
pre=("{id:`my-coleman-dutch-oven-10`,name:`コールマン ダッチオーブン10インチ (型番: 2000039256)`,manufacturer:`コールマン (Coleman)`,productName:`ダッチオーブン10インチ`,modelNumber:`2000039256`,category:`furniture`,shapeType:`furn_pot`,width:.25,depth:.25,height:.135,ropeMargin:0,color:`#232427`,"
"description:`商品サイズ 約Φ25×13.5(h)cm（本体 約Φ23.5×11cm）、重量約5.7kg、満水容量4.2L。鋳鉄製（植物性オイル仕上げでシーズニング不要）。ステンレスのハンドルとボトムプレート（約Φ20.5cm）、リッドリフター、収納ケース付き。脚なしで家庭用コンロにも使えます。モデルはハンドルを立てた状態です。`,"
"packedSize:`約Φ25 × 13.5(h) cm`,weight:`約 5.7 kg`,imageUrl:__imgDutch,isMyGear:!0},")
s=s[:i]+pre+s[j:]
rep("e.presetId===`my-black-pot-24`||e.shapeType===`furn_pot`","e.presetId===`my-coleman-dutch-oven-10`||e.shapeType===`furn_pot`")
# stacking: names
rep("return(e.name||``).includes(`鍋`)&&!n.includes(`鍋`)&&/","return/鍋|ダッチオーブン/.test(e.name||``)&&!/鍋|ダッチオーブン/.test(n)&&/")
rep("return!(e.name||``).includes(`鍋`)&&/","return!/鍋|ダッチオーブン/.test(e.name||``)&&/")
# 2D
i=s.index("n.name.includes(`黒い鍋`)||n.shapeType===`furn_pot`?(()=>{");j=s.index("})():n.name.includes(`エクスカーションクーラー`)",i)+len("})():")
H2=r"""n.name.includes(`ダッチオーブン`)||n.shapeType===`furn_pot`?(()=>{const R=.1235*l;return(0,U.jsxs)(`g`,{children:[
(0,U.jsx)(`rect`,{x:-.14*l,y:-.02*l,width:.28*l,height:.04*l,rx:.012*l,fill:`#17181a`}),
(0,U.jsx)(`circle`,{cx:0,cy:0,r:R,fill:`#303135`,stroke:r?`#38bdf8`:d,strokeWidth:r?3:1.5}),
(0,U.jsx)(`circle`,{cx:0,cy:0,r:R*.9,fill:`#232427`,stroke:`#4a4c52`,strokeWidth:`1`}),
(0,U.jsx)(`path`,{d:`M ${-.036*l} 0 Q 0 ${-.07*l} ${.036*l} 0`,fill:`none`,stroke:`#55575d`,strokeWidth:`3`,strokeLinecap:`round`}),
(0,U.jsx)(`line`,{x1:`${-.1385*l}`,y1:0,x2:`${.1385*l}`,y2:0,stroke:`#c9ced4`,strokeWidth:`1.5`,opacity:.8})]})})():"""
H2=H2.replace("\n","")
s=s[:i]+H2+s[j:]
open('app25.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app24.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built',len(s))
