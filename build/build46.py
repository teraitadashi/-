# 上部バーに「最初から」ボタン (確認してから区画とギアを初期状態に戻す。上書き保存の対象も外す)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep("(0,U.jsx)(`button`,{onClick:()=>M(!j)",
    "(0,U.jsx)(`button`,{onClick:()=>__src(!0),className:`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700 active:scale-95 transition-all`,title:`区画とギアを最初の状態に戻す`,children:`↺ 最初から`}),"
    "(0,U.jsx)(`button`,{onClick:()=>M(!j)")
rep("__rs=()=>{t({...__DS});r([]);l(null);__src(!1)}", "__rs=()=>{t({...__DS});r([]);l(null);__src(!1);window.__curLayout=null}")
rep("children:`リセットしますか？`", "children:`最初からやり直しますか？`")
rep("children:`区画の設定と配置したギアをすべて初期状態に戻します。「戻す」ボタンで元に戻せます。`",
    "children:`区画の設定と配置したギアをすべて最初の状態に戻します。保存したレイアウトは消えません。「戻す」ボタンで元に戻せます。`")
rep("children:`リセットする`", "children:`最初から`")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
