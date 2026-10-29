# Coleman 2026 新作ギア (models/c2026_core.js) を組み込む
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
core = open('models/c2026_core.js').read().strip()


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __tent(', core + '\n\nfunction __tent(')
# カラー: al=常に塗る(新作の標準色), ui:0=色ボタンなし
rep("function __cvPick(n){const C=n&&__CV[n.presetId];if(!C||!n.colorName||n.colorName===C.v[0][0])return null;const v=C.v.find(x=>x[0]===n.colorName);return v?[C,v]:null}",
    "function __cvPick(n){const C=n&&__CV[n.presetId];if(!C)return null;const nm=n.colorName||(C.al?C.v[0][0]:null);if(!nm||!C.al&&nm===C.v[0][0])return null;const v=C.v.find(x=>x[0]===nm);return v?[C,v]:null}")
rep("e.presetId&&__CV[e.presetId]&&(0,U.jsxs)(`div`", "e.presetId&&__CV[e.presetId]&&__CV[e.presetId].ui!==0&&(0,U.jsxs)(`div`")
# 3D: 新作は既存モデルを伸縮
rep("s.add(h),e.name.includes(`MRワゴン`)){__mrwagon(s,e)}",
    "s.add(h),e.cat3d&&__cat3d(s,e,p.current,D.current)){}else if(e.name.includes(`MRワゴン`)){__mrwagon(s,e)}")
# 追加時に cat3d を引き継ぐ
rep("capacity:e.capacity};r(e=>[...e,n]),l(n.id)}", "capacity:e.capacity,cat3d:e.cat3d};r(e=>[...e,n]),l(n.id)}")
# ギア追加画面: 「Coleman 2026新作」タブ
rep("let j=[...s,...y],M=j.filter(", "let j=[...s,...y,...__C26],M=j.filter(")
rep("e.description?.toLowerCase().includes(a.toLowerCase());return t&&n}",
    "e.description?.toLowerCase().includes(a.toLowerCase());if(r===`c26`)t=!!e.isNew2026;else if(e.isNew2026)t=!1;return t&&n}")
rep("P=[{id:`all`,label:`すべて (${j.length}点)`,icon:`⭐`},",
    "P=[{id:`all`,label:`すべて (${j.filter(x=>!x.isNew2026).length}点)`,icon:`⭐`},{id:`c26`,label:`Coleman 2026新作 (${__C26.length})`,icon:`🆕`},")
# ポップアップシェード用: PYKESドームのバイザーなし
rep("/* バイザー(跳ね上げたドアパネル)と2本のポール */\n {const vw=", "/* バイザー(跳ね上げたドアパネル)と2本のポール */\n if(!it.noVisor){const vw=")

# (追加) 2D記号・追加時の属性は build 後に手作業で追記 (2026-10-29)
# (追加) 新作の画像(3Dモデルのレンダリング build/c26_img/*.webp)と「すべて」タブへの表示
import base64, glob, json, os
m = {os.path.basename(f)[:-5]: 'data:image/webp;base64,' + base64.b64encode(open(f, 'rb').read()).decode() for f in sorted(glob.glob('build/c26_img/*.webp'))}
b = b.replace("/* 新作のカラー", "const __C26IMG=" + json.dumps(m) + ";__C26.forEach(g=>{g.imageUrl=__C26IMG[g.id]});\n/* 新作のカラー", 1)
b = b.replace("if(r===`c26`)t=!!e.isNew2026;else if(e.isNew2026)t=!1;", "if(r===`c26`)t=!!e.isNew2026;")
b = b.replace("label:`すべて (${j.filter(x=>!x.isNew2026).length}点)`", "label:`すべて (${j.length}点)`")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
