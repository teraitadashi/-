# 全体デバッグの残り: 追加ギアは駐車枠を避ける (車は空いていれば駐車枠へ) / 夜の全体表示で遠くの明かりを見せる / 縮小時のマイナス幅の四角形を出さない
import subprocess
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
old4 = subprocess.check_output(['git', 'show', 'HEAD:models/perf4_core.js'], text=True).strip()
new4 = open('models/perf4_core.js').read().strip()
assert b.count(old4) == 1
b = b.replace(old4, new4)


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep("__cellBuild(i,new Set(m.current.map(q=>q.mesh)),__big);", "__cellBuild(i,new Set(m.current.map(q=>q.mesh)),__big,n!==`day`);")
# 追加するギアの種類を置き場所探しに渡す
rep("L=e=>{let t=ee(e.width,e.depth)", "L=e=>{window.__addCat=e.category;let t=ee(e.width,e.depth)")
rep("free=(x,y)=>B.every(o=>x+t/2+.1<=o[0]||x-t/2-.1>=o[2]||y+r/2+.1<=o[1]||y-r/2-.1>=o[3]),[x0,y0]=cl(v.x,v.y),best=[x0,y0];",
    "free=(x,y)=>B.every(o=>x+t/2+.1<=o[0]||x-t/2-.1>=o[2]||y+r/2+.1<=o[1]||y-r/2-.1>=o[3]),[x0,y0]=cl(v.x,v.y),best=[x0,y0],ps=e.parkingSpace&&e.parkingSpace.enabled?e.parkingSpace:null,veh=window.__addCat===`vehicle`;window.__addCat=null;"
    "if(ps){let pc=[ps.x+ps.width/2,ps.y+ps.depth/2];if(veh&&free(pc[0],pc[1]))return{x:Math.round(pc[0]*10)/10,y:Math.round(pc[1]*10)/10};if(!veh)B.push([ps.x,ps.y,ps.x+ps.width,ps.y+ps.depth])}")
# マイナス幅の四角形 (縮小表示で幅が足りないとき) は幅0に
rep("width:c-6,height:2.5*l", "width:Math.max(0,c-6),height:2.5*l")
assert b.count("width:i-6,height:a*.18") == 2
b = b.replace("width:i-6,height:a*.18", "width:Math.max(0,i-6),height:a*.18")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
