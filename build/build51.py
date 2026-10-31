# 全体デバッグ: 選択バーの折り返し / 追加ギアを空いた場所へ / 寸法ラベルと生垣の重なり / 使い方ガイド更新 / HTML書き出しの修正
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
exp = open('models/export_core.js').read().strip()


def rep(o, n, src=None):
    global b, h2
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


# 1) アプリ本体の書き出し: 起動直後のHTMLを控える (コード先頭) / コピーと保存ボタン
b = exp + '\n' + b
rep("let e=await fetch(`/hairuka_standalone.html`);if(e.ok){let t=await e.text();await navigator.clipboard.writeText(t),p(!0),setTimeout(()=>p(!1),3e3)}else{let e=document.documentElement.outerHTML;await navigator.clipboard.writeText(e),p(!0),setTimeout(()=>p(!1),3e3)}",
    "await navigator.clipboard.writeText(__appHTML()),p(!0),setTimeout(()=>p(!1),3e3)")
rep("onClick:()=>{let e=document.createElement(`a`);e.href=`/hairuka_standalone.html`,e.download=`hairuka_camp_simulator.html`,document.body.appendChild(e),e.click(),document.body.removeChild(e)}",
    "onClick:()=>__saveAppHTML()")
# 2) 追加したギアは、見ている場所の近くで他のギアと重ならない場所に置く (区画の外には置かない)
i = b.find("__vcen=(t,r)=>{")
j = b.find(",ee=(t,r)=>{", i)
b = b[:i] + ("__vcen=(t,r)=>{let v=null;try{if(i===`3D`&&window.__orbit){let g=window.__orbit.target;v={x:g.x+e.width/2,y:g.z+e.depth/2}}else v=window.__v2c&&window.__v2c()}catch{}"
    "if(!v||!isFinite(v.x)||!isFinite(v.y))v={x:e.width/2,y:e.depth/2};"
    "let mx=Math.min(t/2,e.width/2),my=Math.min(r/2,e.depth/2),cl=(x,y)=>[Math.min(e.width-mx,Math.max(mx,x)),Math.min(e.depth-my,Math.max(my,y))],"
    "B=n.map(q=>{let a=(q.rotation||0)*Math.PI/180,c=Math.abs(Math.cos(a)),s=Math.abs(Math.sin(a)),hw=(q.width*c+q.depth*s)/2,hd=(q.width*s+q.depth*c)/2;return[q.x-hw,q.y-hd,q.x+hw,q.y+hd]}),"
    "free=(x,y)=>B.every(o=>x+t/2+.1<=o[0]||x-t/2-.1>=o[2]||y+r/2+.1<=o[1]||y-r/2-.1>=o[3]),[x0,y0]=cl(v.x,v.y),best=[x0,y0];"
    "if(!free(x0,y0)){let f=!1;for(let R=.5;R<=Math.min(20,Math.max(e.width,e.depth))&&!f;R+=.5){let N=Math.max(8,Math.round(2*Math.PI*R/.5));for(let k=0;k<N;k++){let a=k/N*2*Math.PI,[x,y]=cl(x0+R*Math.cos(a),y0+R*Math.sin(a));if(free(x,y)){best=[x,y];f=!0;break}}}}"
    "return{x:Math.round(best[0]*10)/10,y:Math.round(best[1]*10)/10}}") + b[j:]
# 3) 選択バー: 画面幅に収まらないボタンは次の行へ折り返す (横スクロールで隠れていた)
assert h.count(".__tb{overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;max-width:calc(100vw - 24px)}") == 1
h = h.replace(".__tb{overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;max-width:calc(100vw - 24px)}",
              ".__tb{flex-wrap:wrap;row-gap:4px;width:max-content;max-width:calc(100vw - 32px)}")
# 4) 間口・奥行の表示を生垣の外側へ (生垣の名前と重なっていた)
rep("(0,U.jsxs)(`text`,{x:e.width*l/2,y:`-12`,", "(0,U.jsxs)(`text`,{x:e.width*l/2,y:-12-(e.surroundedByHedges?.55*l:0),")
rep("(0,U.jsxs)(`text`,{x:`-12`,y:e.depth*l/2,textAnchor:`middle`,fill:n.text,fontSize:`12`,fontWeight:`bold`,transform:`rotate(-90 -12 ${e.depth*l/2})`",
    "(0,U.jsxs)(`text`,{x:-12-(e.surroundedByHedges?.55*l:0),y:e.depth*l/2,textAnchor:`middle`,fill:n.text,fontSize:`12`,fontWeight:`bold`,transform:`rotate(-90 ${-12-(e.surroundedByHedges?.55*l:0)} ${e.depth*l/2})`")
# 5) 使い方ガイドを今の操作に合わせる
rep("`: ギアを指でドラッグして移動。上部の丸ハンドルで回転。動かしたくないテントなどは選択して「固定」すると、下にあるギアを動かせます。`",
    "`: ギアを指でドラッグして移動、上の丸ハンドルで回転。何もない所を1本指でなぞると画面移動、2本指で上下左右に動かすと画面移動、2本指を広げる・狭めるとズーム。動かしたくないテントなどは選択して「固定」すると、下にあるギアを動かせます。`")
rep("`: 1本指で回転、2本指でズーム（指の位置に寄ります）・2本指ドラッグで移動。目線ボタンで現場の迫力を体感！`",
    "`: 見るための画面です (ギアの配置は2Dで)。1本指で回転、2本指で上下左右に動かすと画面移動、2本指を広げる・狭めるとズーム（指の位置に寄ります）。右上で昼・夕方・夜、「軽量モード」で動きを軽くできます。`")
rep("`: 置いたギアをまとめて削除します（確認あり・「戻す」で元に戻せます）。`]})]}),",
    "`: 置いたギアをまとめて削除します（確認あり・「戻す」で元に戻せます）。`]}),(0,U.jsxs)(`p`,{children:[`• `,(0,U.jsx)(`b`,{children:`最初から`}),`: 区画とギアを最初の状態に戻します（保存したレイアウトは消えません）。`]})]}),")
open('build/app26.js', 'w').write(b)
assert h.count(a) == 1
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
