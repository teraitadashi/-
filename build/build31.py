# 有名メーカーのギア (models/brands_core.js、専用3D) を組み込む
import base64, glob, json, os
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/brands_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __tent(', core + '\n\nfunction __tent(')
m = {os.path.basename(f)[:-5]: 'data:image/webp;base64,' + base64.b64encode(open(f, 'rb').read()).decode() for f in sorted(glob.glob('build/brands_img/*.webp'))}
if m:
    rep("Object.assign(__CV,{\n 'br-ddhammocks", "const __CBRIMG=" + json.dumps(m) + ";__CBR.forEach(g=>{if(__CBRIMG[g.id])g.imageUrl=__CBRIMG[g.id]});\nObject.assign(__CV,{\n 'br-ddhammocks")
# 3D: 専用モデル
rep("s.add(h),e.cat3d&&__cat3d(s,e,p.current,D.current)){}", "s.add(h),e.mk3d){__mk3d(s,e)}else if(e.cat3d&&__cat3d(s,e,p.current,D.current)){}")
rep("cat3d:e.cat3d,isNew2026:e.isNew2026,", "cat3d:e.cat3d,mk3d:e.mk3d,isNew2026:e.isNew2026,")
rep("description:e.isNew2026||e.genSym?e.description:void 0};", "description:e.isNew2026||e.genSym?e.description:void 0,manufacturer:e.manufacturer};")
# ギア追加画面
rep("let j=[...s,...y,...__C26,...__CPOP],M=j.filter(", "let j=[...s,...y,...__C26,...__CPOP,...__CBR],M=j.filter(")
rep("if(r===`cpop`)t=!!e.isPopular;return t&&n}", "if(r===`cpop`)t=!!e.isPopular;if(r===`cbr`)t=!!e.isBrand;return t&&n}")
rep("P=[{id:`all`,label:`すべて (${j.length}点)`,icon:`⭐`},", "P=[{id:`all`,label:`すべて (${j.length}点)`,icon:`⭐`},{id:`cbr`,label:`有名メーカー (${__CBR.length})`,icon:`🏕️`},")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a), 'images', len(m))
