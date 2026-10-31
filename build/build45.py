# 上部バー: 地面を変えるアイコンと「距離計測」ボタンを削除 (3D の昼・夕・夜と使い方ガイドは残す)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


i = b.find("(0,U.jsx)(`div`,{className:`inline-flex p-0.5 rounded-xl bg-stone-800/90 border border-stone-700/60 text-xs`,children:[{id:`grass`,icon:`🌿`")
j = b.find("(0,U.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[i===`3D`?", i)
assert i > 0 and j > i
b = b[:i] + b[j:]
i = b.find(":(0,U.jsxs)(`button`,{onClick:()=>{d(!u),u&&p(null)}")
j = b.find("(0,U.jsx)(`button`,{onClick:()=>M(!j)", i)
assert i > 0 and j > i and b[j - 1] == ','
b = b[:i] + ':null,' + b[j:]
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
