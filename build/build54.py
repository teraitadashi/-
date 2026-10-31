# 3D の2本指スライド: 左右は今まで通り地面に沿って移動、上下は視点 (カメラと注視点) の高さを上下させる (前後に動いてズームのように見えていた)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


# 視点の上下: 指の動きに画面がついてくる向き (指を下げると景色が下がる = 視点が上がる)。注視点は地面から30mまで
rep("let pan=(a,b)=>{",
    "let elev=dy=>{let R=el.getBoundingClientRect(),s=2*n.position.distanceTo(_.target)*Math.tan(n.fov*Math.PI/360)/R.height,gH=window.__groundH,g=gH?gH(_.target.x,_.target.z):0,"
    "ny=Math.min(g+30,Math.max(g,_.target.y+dy*s)),d=ny-_.target.y;_.target.y=ny;n.position.y+=d;_.update()};let pan=(a,b)=>{")
rep("if(pm&&(mid.x!==pm.x||mid.y!==pm.y))pan(pm,mid);pm=mid;if(gm===2",
    "if(pm&&(mid.x!==pm.x||mid.y!==pm.y)){if(gm===1){pan(pm,{x:mid.x,y:pm.y});elev(mid.y-pm.y)}else pan(pm,mid)}pm=mid;if(gm===2")
# 地面に沿った移動のあと注視点を地面の高さに戻していたのを、上げた高さを保つように
rep("let gH=window.__groundH;if(gH){let ny=gH(_.target.x,_.target.z),dy=ny-_.target.y;_.target.y=ny;n.position.y+=dy}_.update()};",
    "let gH=window.__groundH;if(gH){let g0=gH(_.target.x-dv.x,_.target.z-dv.z),ny=gH(_.target.x,_.target.z)+Math.max(0,_.target.y-g0),dy=ny-_.target.y;_.target.y=ny;n.position.y+=dy}_.update()};")
# 使い方ガイド
rep("1本指で回転、2本指で上下左右に動かすと画面移動、2本指を広げる", "1本指で回転、2本指を左右に動かすと横へ移動・上下に動かすと視点の高さが上下、2本指を広げる")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
