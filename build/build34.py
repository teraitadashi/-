# 2D 軽量化 (models/perf2d_core.js)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/perf2d_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __tent(', core + '\n\nfunction __tent(')
rep(".map(e=>ve(e,e.id===n)),a&&R&&oe&&", ".map(r=>__veC(r,r.id===n,l,e,k(r,t)?.id,ve)),a&&R&&oe&&")
rep("__nkIs(e)&&(()=>{let ox=e.width/2-__NKX", "__nkIs(e)&&__ovC(`nk`,e,l,()=>(()=>{let ox=e.width/2-__NKX")
# のかみ地図レイヤーの IIFE の終わり (煙樹ヶ浜の松林の直前) を閉じる
rep("})(),__tyIs(e)&&__ty2D(e,l,U),", "})()),__tyIs(e)&&__ovC(`ty`,e,l,()=>__ty2D(e,l,U)),")
# 引いて見ているとき(1mが8px未満)は張り綱を省略、小さいギアの名前ラベルも省略
rep("n.showRopes&&n.ropeMargin>0&&(0,U.jsx)(`g`,{className:`transitio", "n.showRopes&&n.ropeMargin>0&&(l>=8||r)&&(0,U.jsx)(`g`,{className:`transitio")
rep("}):(0,U.jsx)(`text`,{x:`0`,y:u/2+9,", "}):(l<8&&!r)?null:(0,U.jsx)(`text`,{x:`0`,y:u/2+9,")
rep("(0,U.jsx)(`text`,{x:0,y:big?4:u/2+10,", "(big||l>=8||r)&&(0,U.jsx)(`text`,{x:0,y:big?4:u/2+10,")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
