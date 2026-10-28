# 遠井キャンプ場 (models/tooi_core.js) を app26.js / HTML に組み込む
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/tooi_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, o[:80]
    b = b.replace(o, n)


# 1. モデル関数 (__tent の直前)
rep('function __tent(', core + '\n\nfunction __tent(')
# 2. 区画プリセット (煙樹ヶ浜の後)
rep("{name:`標準オートキャンプサイト (10m × 10m)`",
    "{campsiteId:`tooi`,name:`遠井キャンプ場 全体 (芝生サイト＋河川敷)`,width:200,depth:95,groundType:`gravel`,surroundedByHedges:!1,"
    "description:`和歌山県有田川町、有田川沿いの遠井キャンプ場を全体で再現。県道の下の台地に芝生サイト（約15張）と駐車場（約40台）・炊事場・トイレ、"
    "階段護岸を下りると砂利の河川敷サイトが有田川まで広がります。芝生・駐車場は河川敷より約3.5m高く、ギアは地面の高さに合わせて置かれます。寸法は航空写真からの概算です。`},"
    "{name:`標準オートキャンプサイト (10m × 10m)`")
# 3. 3D: 区画の地面・柵・角杭を隠して地形モデルを作る
rep("[[-n,-r],[n,-r],[n,r],[-n,r]].forEach(([e,n])=>{let r=new Z(S,C)",
    "(__tyIs(e)?[]:[[-n,-r],[n,-r],[n,r],[-n,r]]).forEach(([e,n])=>{let r=new Z(S,C)")
rep("!e.surroundedByHedges&&!__nkIs(e)", "!e.surroundedByHedges&&!__nkIs(e)&&!__tyIs(e)")
rep("__nkIs(e)&&__nokamiCamp(t);",
    "__nkIs(e)&&__nokamiCamp(t);window.__groundH=__tyIs(e)?((x,z)=>__tyH(x+e.width/2,z+e.depth/2)):null;"
    "__tyIs(e)&&(p.position.y=-1.3,p.material.color.set(`#24401d`),_.visible=!1,b.visible=!1,__tooiCamp(t,e));")
# 4. ギアを地面の高さに載せる
rep("let a=e.width/2,o=e.depth/2;t.forEach(e=>{let s=new Xr;s.userData={itemId:e.id};",
    "let a=e.width/2,o=e.depth/2,__ty=__tyIs(e);t.forEach(e=>{let s=new Xr;s.userData={itemId:e.id};")
rep("s.position.set(c,d,l)", "s.position.set(c,d+(__ty?__tyH(c+a,l+o):0),l)")
# 5. カメラ: 地面の高さより下に潜らない / ズームの着地点を地形で求める
rep("if(cm.position.y<.8){let dy=.8-cm.position.y;cm.position.y+=dy;tg.y+=dy}if(tg.y<0){tg.y=0;cm.lookAt(tg)}",
    "let gH=window.__groundH,cy=(gH?gH(cm.position.x,cm.position.z):0)+.8,ty=gH?gH(tg.x,tg.z):0;"
    "if(cm.position.y<cy){let dy=cy-cm.position.y;cm.position.y+=dy;tg.y+=dy}if(tg.y<ty){tg.y=ty;cm.lookAt(tg)}")
rep("let O=rc.ray.origin,D=rc.ray.direction,t=D.y<-.001?-O.y/D.y:n.position.distanceTo(_.target);",
    "let O=rc.ray.origin,D=rc.ray.direction,t=D.y<-.001?-O.y/D.y:n.position.distanceTo(_.target),gH=window.__groundH;"
    "if(gH){let tt=0,hit=-1;for(;tt<_.maxDistance*1.5;tt+=Math.max(.5,tt*.01)){let px=O.x+D.x*tt,py=O.y+D.y*tt,pz=O.z+D.z*tt;if(py<=gH(px,pz)){hit=tt;break}}if(hit>0)t=hit}")
rep("if(fw.y<-.02){let tt=-n.position.y/fw.y;",
    "if(fw.y<-.02){let tt=(P.y-n.position.y)/fw.y;")
# 6. 2D平面図
rep("e.name&&e.name.includes(`煙樹ヶ浜`)&&(0,U.jsx)(`g`,{id:`pine-trees`",
    "__tyIs(e)&&__ty2D(e,l,U),e.name&&e.name.includes(`煙樹ヶ浜`)&&(0,U.jsx)(`g`,{id:`pine-trees`")

# 7. 2D: 大きな区画でも画面に収まるよう最小倍率を下げる
rep("o=Math.max(e.width>30?4:18,a)", "o=Math.max(e.width>30?1:18,a)")
rep("Math.min(220,Math.max(4,e*n))", "Math.min(220,Math.max(1,e*n))")
rep("Math.min(220,Math.max(4,ie.current*t))", "Math.min(220,Math.max(1,ie.current*t))")

open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
