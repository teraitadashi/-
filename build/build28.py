# 手持ちギアのカラー選択 (models/colors_core.js) を app26.js / HTML に組み込む
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/colors_core.js').read().strip()


def rep(o, n, cnt=1):
    global b
    assert b.count(o) == cnt, (b.count(o), o[:80])
    b = b.replace(o, n)


# 1. データと関数
rep('function __tent(', core + '\n\nfunction __tent(')
# 2. 3D: モデルを作った後に本体色を塗り替える
rep("if(f){let t=new Z(new Lo(Math.max(e.width,e.depth)*.55", "__recolor(s,e);if(f){let t=new Z(new Lo(Math.max(e.width,e.depth)*.55")
# 3. 操作パネル: カラー選択ボタン (ツールバーの下)
chips = ("e.presetId&&__CV[e.presetId]&&(0,U.jsxs)(`div`,{className:`flex items-center gap-1.5 text-xs select-none __tb pt-0.5`,children:["
         "(0,U.jsx)(`span`,{className:`text-[10px] font-bold text-stone-400 shrink-0 pl-1`,children:`カラー`}),"
         "...__CV[e.presetId].v.map(cv=>{let on=(e.colorName||__CV[e.presetId].v[0][0])===cv[0];"
         "return(0,U.jsxs)(`button`,{onClick:()=>r({color:cv[1],colorName:cv[0]}),className:`flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-bold shrink-0 active:scale-95 transition-all`,"
         "style:on?{borderColor:`#f59e0b`,background:`rgba(245,158,11,.18)`,color:`#fde68a`}:{borderColor:`#44403c`,background:`#292524`,color:`#d6d3d1`},"
         "children:[(0,U.jsx)(`span`,{className:`inline-block rounded-full`,style:{width:14,height:14,background:cv[1],border:`1px solid rgba(255,255,255,.45)`}}),cv[0]]},cv[0])})]}),")
rep("children:`完了`})]}),p&&(0,U.jsxs)(`div`,{className:`pt-2 border-t border-stone-800/90",
    "children:`完了`})]})," + chips + "p&&(0,U.jsxs)(`div`,{className:`pt-2 border-t border-stone-800/90")
# 4. 2D記号: 本体色を選んだカラーに
s = b.index('let ve=(n,r)=>')
e = b.index('};return(0,U.jsxs)(`div`,{ref:c', s)
seg = b[s:e]


def recol(key, length, hexes):
    global seg
    p = seg.index(key)
    w = seg[p:p + length]
    for hx in hexes:
        assert '`' + hx + '`' in w, (key, hx)
        w = w.replace('`' + hx + '`', '__cv2(n,`' + hx + '`)')
    seg = seg[:p] + w + seg[p + length:]


recol('クールステージ`)?', 300, ['#c42a27'])
recol('パックアウェイ`)?', 200, ['#26292d'])
recol('エクスカーションクーラー`)||', 300, ['#c9302a'])
recol('パイクスピーク`)?', 700, ['#e9bfae'])
recol('アウトドアワゴンNX`)||', 1500, ['#b3261e', '#d93a2c', '#e0533f', '#7d1a15'])
recol('タフスクリーン`)||', 1600, ['#eef2f6', '#e3e7ec'])
recol('エルグランド`)?', 1200, ['#f6f6f3'])
recol('MRワゴン`)?', 2600, ['#f4f5f4', '#fbfcfb'])
# (追加) エルグランドの屋根・ボンネット、クーラーの縁
for key, L, hx in [('エルグランド`)?', 2500, ['#ebedee', '#fbfbf9', '#e5e8ea', '#e4e7e9']], ('エクスカーションクーラー`)||', 600, ['#c4301f'])]:
    p = seg.index(key)
    w = seg[p:p + L]
    for x in hx:
        w = w.replace('fill:`' + x + '`', 'fill:__cv2(n,`' + x + '`)')
    seg = seg[:p] + w + seg[p + L:]
seg = seg.replace("fill:`none`,stroke:`#c4301f`,strokeWidth:`3`", "fill:`none`,stroke:__cv2(n,`#c4301f`),strokeWidth:`3`")
b = b[:s] + seg + b[e:]

open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
