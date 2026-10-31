# コールマン インフィニティチェアを追加 (専用3D、カラー4色、リクライニング3段階: 起こす/中間/フラット)
import base64, json, os
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/infinity_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep("const __CBR=[", core + "\nconst __CBR=[")
rep("{id:'br-uniflame-fire-grill'", "__INF_GEAR,{id:'br-uniflame-fire-grill'")
rep("}else if(k==='resortchair'){", "}else if(k==='infinity'){__infinity3d(G,it,add,fab)}else if(k==='resortchair'){")
rep("'br-ddhammocks-dd-tarp-3x3':{base:'#5a6142'",
    "'br-coleman-infinity-chair':{base:'#b9a68a',t:['b9a68a'],al:1,v:[['ベージュ','#b9a68a'],['オリーブ','#55593f'],['ナチュラル','#d9d2c1'],['ブラック','#2b2b2d']]},\n 'br-ddhammocks-dd-tarp-3x3':{base:'#5a6142'")
# ギア追加でリクライニングの情報も引き継ぐ
rep("cat3d:e.cat3d,mk3d:e.mk3d,", "cat3d:e.cat3d,mk3d:e.mk3d,recline:e.recline,reclines:e.reclines,")
# 選択中のバー: カラーの下にリクライニングの切り替え (奥行・高さも変わる)
rep("p&&(0,U.jsxs)(`div`,{className:`pt-2 border-t border-stone-800/90 flex flex-col gap-2 animate-fade-in text-xs max-w-lg`",
    "e.reclines&&(0,U.jsxs)(`div`,{className:`flex items-center gap-1.5 text-xs select-none __tb pt-0.5`,children:[(0,U.jsx)(`span`,{className:`text-[10px] font-bold text-stone-400 shrink-0 pl-1`,children:`リクライニング`}),"
    "...e.reclines.map(q=>{let on=(e.recline||e.reclines[0][0])===q[0];return(0,U.jsx)(`button`,{onClick:()=>r({recline:q[0],depth:q[2],height:q[3]}),className:`px-2.5 py-1 rounded-full border text-[10px] font-bold shrink-0 active:scale-95 transition-all`,"
    "style:on?{borderColor:`#f59e0b`,background:`rgba(245,158,11,.18)`,color:`#fde68a`}:{borderColor:`#44403c`,background:`#292524`,color:`#d6d3d1`},children:q[1]+` (`+Math.round(q[2]*100)+`cm)`},q[0])})]}),"
    "p&&(0,U.jsxs)(`div`,{className:`pt-2 border-t border-stone-800/90 flex flex-col gap-2 animate-fade-in text-xs max-w-lg`")
img = 'build/brands_img/br-coleman-infinity-chair.webp'
if os.path.exists(img):
    rep("const __CBRIMG={", "const __CBRIMG={" + json.dumps('br-coleman-infinity-chair') + ":" + json.dumps('data:image/webp;base64,' + base64.b64encode(open(img, 'rb').read()).decode()) + ",")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
