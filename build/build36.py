# テキストでのレイアウトのバックアップ・復元 / 保存できない環境でもその場では使えるように
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
add = open('models/savefix_core.js').read().split('/* テキストでのバックアップ')[1]


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep('function __tent(', '/* テキストでのバックアップ' + add.strip() + '\n\nfunction __tent(')
# 保存に失敗してもこの画面を開いている間は一覧に残す
rep("if(!__saveLS(Tf,i))return;s(i);", "__saveLS(Tf,i);s(i);")
rep("if(!__saveLS(Tf,t))return;s(t);__sok(!0)", "__saveLS(Tf,t);s(t);__sok(!0)")
# バックアップ欄 (保存したレイアウト一覧の上)
rep("(0,U.jsxs)(`div`,{children:[(0,U.jsxs)(`h4`,{className:`font-bold text-stone-400 mb-2`,children:[`保存したレイアウト (`,o.length,`)`]}),",
    "(0,U.jsxs)(`div`,{className:`bg-stone-800/70 p-3.5 rounded-2xl border border-stone-700/80 space-y-2`,children:[(0,U.jsx)(`span`,{className:`font-bold text-stone-200 block`,children:`📋 テキストでバックアップ`}),"
    "(0,U.jsx)(`p`,{className:`text-[10px] text-stone-400`,children:`Koder などアプリ内で開くと、閉じたときに保存が消えることがあります。保存したレイアウトを文字にしてメモ等に残し、あとで貼り付けて戻せます。`}),"
    "(0,U.jsxs)(`div`,{className:`flex gap-2`,children:[(0,U.jsx)(`button`,{onClick:()=>{if(!o.length){alert('保存したレイアウトがありません。先に「保存」してください。');return}__copyText(__exportLayouts(o))},className:`flex-1 py-2 rounded-xl bg-sky-600 text-white font-bold active:scale-95`,children:`すべてコピー`}),"
    "(0,U.jsx)(`button`,{onClick:()=>{let v=__importLayouts(prompt('コピーしておいたバックアップの文字を貼り付けてください'),o);if(v==null){alert('読み取れませんでした。コピーした文字をそのまま貼り付けてください。');return}s(v);__saveLS(Tf,v);alert('レイアウトを戻しました。一覧の「読込」で開けます。')},className:`flex-1 py-2 rounded-xl bg-stone-700 text-white font-bold active:scale-95`,children:`貼り付けて戻す`})]})]}),"
    "(0,U.jsxs)(`div`,{children:[(0,U.jsxs)(`h4`,{className:`font-bold text-stone-400 mb-2`,children:[`保存したレイアウト (`,o.length,`)`]}),")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
