# 3D: 1本指で左右に動かしたときの回転方向を逆にする (上下の回転はそのまま)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
o = "_.enableZoom=!1,_.enablePan=!0,"
assert a.count(o) == 1
b = a.replace(o, "_.enableZoom=!1,_.enablePan=!0,(()=>{let rl=_._rotateLeft.bind(_);_._rotateLeft=a=>rl(-a)})(),")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
