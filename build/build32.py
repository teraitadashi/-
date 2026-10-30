# 見本例「のかみふれあい 全体 (全21区画 満サイト)」(models/nksample_core.js) を追加
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/nksample_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __tent(', core + '\n\nfunction __tent(')
rep("color:`#26292d`,isMyGear:!0}]}],wf=",
    "color:`#26292d`,isMyGear:!0}]},{id:`sample-nokami-all-full`,title:`【のかみふれあい オートキャンプ場 全体】全21区画 満サイト`,tag:`のかみふれあい 全体`,"
    "description:`のかみふれあいオートキャンプ場の全21区画すべてにテントを設営した満サイトの見本。各区画の駐車枠に車を入れ、テーブル・チェア・焚き火台・クーラー・ランタンなどを区画ごとに組み合わせを変えて配置しています(テントは奥、リビングは道路側の芝生)。`,"
    "site:{name:`のかみふれあい オートキャンプ場 全体 (全21区画)`,width:150,depth:140,groundType:`grass`,surroundedByHedges:!1,imageUrl:__img7},get items(){return this.__it||(this.__it=__nkSample())}}],wf=")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
