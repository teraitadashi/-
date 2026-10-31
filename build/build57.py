# 3D の1本指の上下 (見下ろす角度) も、左右と同じく触った所が指についてくる向きにする
# 見ている点より画面の上側を触ったときは向きを逆にする (下側はそのまま)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
o = "(()=>{let rl=_._rotateLeft.bind(_);_._rotateLeft=a=>rl(a*(window.__rotSg||-1))})(),"
assert a.count(o) == 1
b = a.replace(o, "(()=>{let rl=_._rotateLeft.bind(_),ru=_._rotateUp.bind(_);_._rotateLeft=a=>rl(a*(window.__rotSg||-1));_._rotateUp=a=>ru(a*(window.__rotSg||-1))})(),")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
