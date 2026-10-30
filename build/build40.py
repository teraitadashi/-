# 見本: のかみふれあい全体だけ残し、煙樹ヶ浜 (松林フリーサイト) と遠井キャンプ場 全体の見本を追加
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
add = open('models/samples2_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __nkSample(){', add + '\nfunction __nkSample(){')
i = b.find('Cf=[{id:`sample-nokami-fureai`')
j = b.find('{id:`sample-nokami-all-full`', i)
assert i > 0 and j > i
b = b[:i] + 'Cf=[' + b[j:]
rep("get items(){return this.__it||(this.__it=__nkSample())}}],wf=",
    "get items(){return this.__it||(this.__it=__nkSample())}},"
    "{id:`sample-enju-free`,title:`【煙樹ヶ浜キャンプ場】松林のフリーサイト 50m × 50m`,tag:`煙樹ヶ浜 フリーサイト`,"
    "description:`和歌山県美浜町・煙樹ヶ浜の松林の中のフリーサイトに7組が設営した見本。テントとリビング (テーブル・チェア・焚き火台・クーラー・ランタン) を、松の幹にかからないよう間隔をあけて配置しています。車は場外の駐車場に停める想定で、サイト内には置いていません。`,"
    "get site(){return{...b.find(x=>x.campsiteId===`enju-gahama`)}},get items(){return this.__it||(this.__it=__enjuSample())}},"
    "{id:`sample-tooi-all`,title:`【遠井キャンプ場 全体】芝生サイト＋河川敷`,tag:`遠井 全体`,"
    "description:`和歌山県有田川町・遠井キャンプ場の全体見本。台地の芝生サイトに5組 (車は駐車場に並べて駐車)、砂利の河川敷に6組 (車を横付けし、リビングは有田川側) が設営しています。芝生の木や炊事場にはかからないように配置しています。`,"
    "get site(){return{...b.find(x=>x.campsiteId===`tooi`)}},get items(){return this.__it||(this.__it=__tooiSample())}}],wf=")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
