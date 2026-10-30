# 3D 軽量化 (models/perf_core.js)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/perf_core.js').read().strip()


def rep(o, n, cnt=1):
    global b
    assert b.count(o) == cnt, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __tent(', core + '\n\nfunction __tent(')
# ギア: 区画が大きいとき小物の影・点光源を減らし、ギアごとに静的メッシュをまとめる
rep("s.add(t)}i.add(s)})},[t,e,r,n])",
    "s.add(t)}__lightenItems(s,p.current,__big);__mergeStatic(s,new Set(m.current.map(q=>q.mesh)));if(__big){let q=__lodMake(s,e);q&&window.__lodItems.push(q)}i.add(s)})},[t,e,r,n])")
rep("let a=e.width/2,o=e.depth/2,__ty=__tyIs(e);", "let a=e.width/2,o=e.depth/2,__ty=__tyIs(e),__big=e.width>30;window.__lodItems=[];")
rep("_.update(),r.render(t,n)}", "_.update(),__lodTick(n),r.render(t,n)}")
# 地面・景観: まとめて描画
rep("{let __cm=window.__orbit;if(__cm){let cam=__cm.object;",
    "__mergeStatic(t);window.__rend&&window.__rend.setPixelRatio(e.width>30?Math.min(window.devicePixelRatio,1.25):Math.min(window.devicePixelRatio,2));{let __cm=window.__orbit;if(__cm){let cam=__cm.object;")
rep("r.setPixelRatio(Math.min(window.devicePixelRatio,2))", "r.setPixelRatio(Math.min(window.devicePixelRatio,2)),window.__rend=r")
# 影の解像度
rep("__SK>1?4096:2048", "2048", 4)
rep('let t=new oi;o.current=t;', 'let t=new oi;o.current=t;window.__scene=t;')
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
