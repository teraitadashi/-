# 2D: 区画の下の「枠外・仮置きスペース」の表示を削除 (追加したギアは画面の中央に置かれるため不要)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
s0 = ",(0,U.jsxs)(`g`,{pointerEvents:`none`,className:`select-none font-sans`,children:[(0,U.jsx)(`rect`,{x:`0`,y:(e.depth+.8)*l,"
e0 = "children:`※ 追加したギアはここに配置されます。ドラッグして区画内にレイアウトしてください。`})]})"
i = b.find(s0)
j = b.find(e0, i)
assert b.count(s0) == 1 and j > i
b = b[:i] + b[j + len(e0):]
o = "message:`「${n.name}」は枠外（仮置きスペース）にあります`"
assert b.count(o) == 1
b = b.replace(o, "message:`「${n.name}」は区画の外にあります`")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
