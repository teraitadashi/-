# レイアウト保存の容量対策 (models/savefix_core.js)
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/savefix_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __tent(', core + '\n\nfunction __tent(')
# 新規保存: 写真を外して保存
rep("site:n,items:r},...o];s(i);window.__curLayout=i[0].id;try{localStorage.setItem(Tf,JSON.stringify(i))}catch{}l(``)}",
    "...__slimLayout(n,r)},...o];if(!__saveLS(Tf,i))return;s(i);window.__curLayout=i[0].id;l(``)}")
# 上書き保存
rep("t=o.map(x=>x.id===id?{...x,site:n,items:r,date:", "t=o.map(x=>x.id===id?{...x,...__slimLayout(n,r),date:")
rep("s(t);try{localStorage.setItem(Tf,JSON.stringify(t))}catch{}__sok(!0)", "if(!__saveLS(Tf,t))return;s(t);__sok(!0)")
# 既存の保存データも読み込み時に軽量化して書き戻す
rep("let e=localStorage.getItem(Tf);e&&s(JSON.parse(e))", "let e=localStorage.getItem(Tf);if(e){let v=JSON.parse(e);if(e.length>2e5){v=v.map(x=>({...x,...__slimLayout(x.site,x.items)}));try{localStorage.setItem(Tf,JSON.stringify(v))}catch{}}s(v)}")
# 読み込み時に写真を付け直す
rep("onLoadSavedLayout:(e,n)=>{t(e),r(n),l(null)}", "onLoadSavedLayout:(e,n)=>{let f=__fatLayout(e,n);t(f.site),r(f.items),l(null)}")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
