# 3D の1本指の左右回転を「触った所の地面が指についてくる」向きにする
# 見ている点 (注視点) より画面の下側を触ったときと上側を触ったときで回転の向きが逆になる (前回は上側に合わせて全体を逆にしていた)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep("(()=>{let rl=_._rotateLeft.bind(_);_._rotateLeft=a=>rl(-a)})(),", "(()=>{let rl=_._rotateLeft.bind(_);_._rotateLeft=a=>rl(a*(window.__rotSg||-1))})(),")
rep("el.addEventListener(`pointerdown`,e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});",
    "el.addEventListener(`pointerdown`,e=>{if(!pts.size){try{n.updateMatrixWorld();let R=el.getBoundingClientRect(),v=_.target.clone().project(n),sy=R.top+(1-v.y)/2*R.height;window.__rotSg=e.clientY>sy?1:-1}catch{window.__rotSg=-1}}pts.set(e.pointerId,{x:e.clientX,y:e.clientY});")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
