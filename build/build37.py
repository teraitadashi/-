# 3D 軽量化 その2: 同じギアのまとめ描き / 軽量モード / 止まっている時は描かない
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
add = open('models/perf3_core.js').read()


def rep(o, n, s=None):
    global b
    seg = b if s is None else s
    assert seg.count(o) == 1, (seg.count(o), o[:80])
    if s is None:
        b = b.replace(o, n)
        return
    return seg.replace(o, n)


rep('function __mergeStatic(root,skip){', add.strip() + '\nfunction __mergeStatic(root,skip){')
# 動かない部品をまとめるとき、見た目が同じ素材 (別々に作られた同色の素材) も1つとして扱う
rep("const m=o.material,key=m.uuid+'|'", "const m=o.material,key=__mKey(m)+'|'")
# LOD: まとめ描きしたギアは「見えている分の一覧」を出し入れする
rep("function __lodTick(cam){const L=window.__lodItems;if(!L||!L.length)return;const wp=new J;\n for(const e of L){const far=e.g.getWorldPosition(wp).distanceTo(cam.position)>40;if(far!==e.far){e.far=far;e.px.visible=far;e.det.forEach(o=>o.visible=!far)}}}",
    "function __lodTick(cam){const L=window.__lodItems;if(!L||!L.length)return;const wp=new J,D=new Set;\n for(const e of L){const far=e.g.getWorldPosition(wp).distanceTo(cam.position)>40;if(far!==e.far){e.far=far;if(e.px)e.px.visible=far;e.det.forEach(o=>o.visible=!far);if(e.sl)e.sl.forEach(q=>{q.q.on=q.px?far:!far;D.add(q.im)})}}D.forEach(m=>m.sync())}")
i = b.find('mf=(')
j = b.find('Ef=({isOpen', i)
m = b[i:j]
m = rep("let r=M.intersectObjects(A.children,!0);if(r.length>0){let e=r[0].object;",
        "let r=M.intersectObjects(A.children,!0);if(r.length>0){let e=r[0].object;if(e.userData.ids){i(e.userData.ids[r[0].instanceId]);return}", m)
m = rep("e.addEventListener(`click`,P);",
        "e.addEventListener(`click`,P);[`pointerdown`,`pointermove`,`wheel`,`touchstart`,`touchmove`].forEach(v=>e.addEventListener(v,()=>__poke(),{passive:!0}));__liteBtn(e);", m)
m = rep("_.addEventListener(`change`,()=>{", "_.addEventListener(`change`,()=>{__poke();", m)
m = rep("let I=new rc,ee=()=>{f.current=requestAnimationFrame(ee);let e=I.getElapsedTime();",
        "let I=new rc,ee=()=>{f.current=requestAnimationFrame(ee);if(_.update(),!__shouldDraw())return;let e=I.getElapsedTime();", m)
m = rep("}),_.update(),__lodTick(n),r.render(t,n)};", "}),__lightTick(),__lodTick(n),r.render(t,n)};", m)
m = rep("n.aspect=e/t,n.updateProjectionMatrix(),r.setSize(e,t)};", "n.aspect=e/t,n.updateProjectionMatrix(),r.setSize(e,t),__poke()};", m)
m = rep("(0,_.useEffect)(()=>{let e=o.current,t=d.current,r=s.current;", "(0,_.useEffect)(()=>{__poke(2e3);let e=o.current,t=d.current,r=s.current;", m)
m = rep("(0,_.useEffect)(()=>{let t=u.current;", "(0,_.useEffect)(()=>{__poke(2e3);let t=u.current;", m)
m = rep("(0,_.useEffect)(()=>{let i=l.current;", "(0,_.useEffect)(()=>{__poke(2e3);let i=l.current;", m)
m = rep("q&&window.__lodItems.push(q)}i.add(s)})},[t,e,r,n])",
        "q&&window.__lodItems.push(q)}i.add(s)});__instAll(i,new Set(m.current.map(q=>q.mesh)));__liteApply()},[t,e,r,n])", m)
b = b[:i] + m + b[j:]
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
