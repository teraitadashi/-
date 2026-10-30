# 3D 軽量化 その3: 3D は見るだけ (選択なし)・24m 四方ごとに部品をまとめる・遠くは積み木状の簡易形・影は変化時だけ・昼は炎のゆらぎなし
import subprocess
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
old3 = subprocess.check_output(['git', 'show', 'HEAD:models/perf3_core.js'], text=True).strip()
new3 = open('models/perf3_core.js').read().strip()
add4 = open('models/perf4_core.js').read().strip()


def rep(o, n, s=None):
    global b
    seg = b if s is None else s
    assert seg.count(o) == 1, (seg.count(o), o[:80])
    if s is None:
        b = b.replace(o, n)
        return
    return seg.replace(o, n)


rep(old3, new3 + '\n' + add4)
i = b.find('mf=(')
j = b.find('Ef=({isOpen', i)
m = b[i:j]
# 昼・夜を描画ループから参照する
m = rep("let __SK=Math.max(1,e.width/20);", "let __SK=Math.max(1,e.width/20);window.__tod=n;", m)
# 3D ではギアを選ばない (配置は 2D で行う)
m = rep("e.addEventListener(`click`,P);", "", m)
m = rep("let f=e.id===r,", "let f=!1,", m)
m = rep("__mergeStatic(s,new Set(m.current.map(q=>q.mesh)));if(__big){let q=__lodMake(s,e);q&&window.__lodItems.push(q)}i.add(s)});__instAll(i,new Set(m.current.map(q=>q.mesh)));__liteApply()},[t,e,r,n])",
        "i.add(s)});__cellBuild(i,new Set(m.current.map(q=>q.mesh)),__big);__liteApply()},[t,e,n])", m)
# 昼は炎・ランタンのゆらぎを動かさない
m = rep("let e=I.getElapsedTime();p.current.forEach(", "let e=I.getElapsedTime();window.__tod!==`day`&&p.current.forEach(", m)
m = rep("}),m.current.forEach((t,n)=>{let r=1+Math.sin(e*t.speed+n)", "}),window.__tod!==`day`&&m.current.forEach((t,n)=>{let r=1+Math.sin(e*t.speed+n)", m)
m = rep("__lightTick(),__lodTick(n),r.render(t,n)", "__lightTick(),__cellTick(n),r.render(t,n)", m)
b = b[:i] + m + b[j:]
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
