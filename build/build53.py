# 3D のメモリ対策 (動かしているとアプリが落ちてホーム画面に戻る): 作り直し前の解放 / 区画の細部は4区画まで / 共有・大きな部品はまとめない /
# 3D を閉じたら解放 (OrbitControls が document に付けたキー入力の受け口と、three.js 共有の DFG_LUT 模様に登録された後片付けの受け口が外れず、閉じた3D全体が残り続けていた) / アンチエイリアスと影の解像度
import subprocess
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
old4 = subprocess.check_output(['git', 'show', 'HEAD:models/perf4_core.js'], text=True).strip()
new4 = open('models/perf4_core.js').read().strip()
assert b.count(old4) == 1
b = b.replace(old4, new4)
mem = open('models/mem_core.js').read().strip()


def rep(o, n, cnt=1):
    global b
    assert b.count(o) == cnt, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __mergeStatic(root,skip){', mem + '\nfunction __mergeStatic(root,skip){')
i = b.find('mf=(')
j = b.find('Ef=({isOpen', i)
m = b[i:j]
for o, n in [("if(e&&t&&r){for(;t.children.length>0;)t.remove(t.children[0]);", "if(e&&t&&r){__disposeKids(t);"),
             ("let t=u.current;if(!t)return;for(;t.children.length>0;)t.remove(t.children[0]);", "let t=u.current;if(!t)return;__disposeKids(t);"),
             ("for(p.current=[],m.current=[];i.children.length>0;)i.remove(i.children[0]);", "p.current=[],m.current=[];__disposeKids(i);"),
             ("f.current&&cancelAnimationFrame(f.current),r.dispose(),", "f.current&&cancelAnimationFrame(f.current),__disposeObj(t),window.__cells=null,(()=>{try{Td().dispose()}catch{}})(),r.dispose(),r.forceContextLoss&&r.forceContextLoss(),"
               "_.dispose&&_.dispose(),document.removeEventListener(`keydown`,_._interceptControlDown,{capture:!0}),document.removeEventListener(`keyup`,_._interceptControlUp,{capture:!0}),"
               "window.__orbit=window.__scene=window.__rend=window.__lodItems=window.__groundH=window.__reset3D=null,"),
             # 画面の解像度が2倍以上ならアンチエイリアスは不要 (メモリを大きく使う)
             ("new Ed({antialias:!0,", "new Ed({antialias:window.devicePixelRatio<2,")]:
    assert m.count(o) == 1, (m.count(o), o[:60])
    m = m.replace(o, n)
assert m.count("i.shadow.mapSize.width=2048,i.shadow.mapSize.height=2048") == 2
m = m.replace("i.shadow.mapSize.width=2048,i.shadow.mapSize.height=2048", "i.shadow.mapSize.width=__SK>1.5?1024:2048,i.shadow.mapSize.height=__SK>1.5?1024:2048")
b = b[:i] + m + b[j:]
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
