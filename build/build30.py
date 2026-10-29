# Coleman 定番・人気ギア (models/cpop_core.js) を組み込む
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/cpop_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __tent(', core + '\n\nfunction __tent(')
# 3D: ヘキサタープとランタンも既存モデルの伸縮に対応
rep("cooler:[(g,i)=>__cooler(g,i),.39,.31,.29]}[e.cat3d];",
    "cooler:[(g,i)=>__cooler(g,i),.39,.31,.29],hexa:[(g,i)=>__hexa(g,i,{},anim),4.2,4.2,2.2],lantern:[(g,i)=>__packaway(g,i,{night:!1,lights:anim}),.135,.135,.235]}[e.cat3d];")
# ギア追加画面: 一覧と「Coleman 人気」タブ
rep("let j=[...s,...y,...__C26],M=j.filter(", "let j=[...s,...y,...__C26,...__CPOP],M=j.filter(")
rep("if(r===`c26`)t=!!e.isNew2026;return t&&n}", "if(r===`c26`)t=!!e.isNew2026;if(r===`cpop`)t=!!e.isPopular;return t&&n}")
rep("{id:`c26`,label:`Coleman 2026新作 (${__C26.length})`,icon:`🆕`},",
    "{id:`c26`,label:`Coleman 2026新作 (${__C26.length})`,icon:`🆕`},{id:`cpop`,label:`Coleman 定番・人気 (${__CPOP.length})`,icon:`🏆`},")
# 追加時に汎用記号フラグを引き継ぐ
rep("isNew2026:e.isNew2026,description:e.isNew2026?e.description:void 0};",
    "isNew2026:e.isNew2026,genSym:e.genSym,description:e.isNew2026||e.genSym?e.description:void 0};")
# 2D: 汎用記号 (NEW マークは新作のみ)
rep("n.isNew2026||n.presetId&&n.presetId.startsWith(`c26-`)?(()=>{", "n.isNew2026||n.genSym||n.presetId&&(n.presetId.startsWith(`c26-`)||n.presetId.startsWith(`cp-`))?(()=>{")
rep("fill:`#fde047`,stroke:`#0c0a09`,strokeWidth:2,paintOrder:`stroke`,children:`NEW`})", "fill:`#fde047`,stroke:`#0c0a09`,strokeWidth:2,paintOrder:`stroke`,children:n.isNew2026?`NEW`:``})")
rep("children:n.isNew2026?null:c>=35&&u>=25?", "children:n.isNew2026||n.genSym?null:c>=35&&u>=25?")
# 画像 (3Dモデルのレンダリング build/cpop_img/*.webp)
import base64, glob, json, os
m = {os.path.basename(f)[:-5]: 'data:image/webp;base64,' + base64.b64encode(open(f, 'rb').read()).decode() for f in sorted(glob.glob('build/cpop_img/*.webp'))}
if m:
    rep("/* 人気ギアのカラー", "const __CPOPIMG=" + json.dumps(m) + ";__CPOP.forEach(g=>{if(__CPOPIMG[g.id])g.imageUrl=__CPOPIMG[g.id]});\n/* 人気ギアのカラー")

open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a), 'images', len(m))
