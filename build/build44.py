# 3D の2本指: 動き始めで「スライド (移動)」か「ピンチ (ズーム)」かを決め、指を離すまでその操作だけにする
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep("let el=r.domElement,rc=new ec,v2=new q,pts=new Map,pd=0,pm=null;",
    "let el=r.domElement,rc=new ec,v2=new q,pts=new Map,pd=0,pm=null,gm=0,d0=0,m0=null;")
rep("if(pts.size===2){let[a,b]=[...pts.values()];pd=Math.hypot(a.x-b.x,a.y-b.y);pm={x:(a.x+b.x)/2,y:(a.y+b.y)/2}}});",
    "if(pts.size===2){let[a,b]=[...pts.values()];pd=d0=Math.hypot(a.x-b.x,a.y-b.y);pm=m0={x:(a.x+b.x)/2,y:(a.y+b.y)/2};gm=0}});")
# 2本指の間隔が大きく変わったらピンチ、そうでなく中心が動いたらスライド。決まるまでは何もしない
rep("let[a,b]=[...pts.values()],d=Math.hypot(a.x-b.x,a.y-b.y),mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};if(pm&&(mid.x!==pm.x||mid.y!==pm.y))pan(pm,mid);pm=mid;if(pd>0&&d>0&&Math.abs(d-pd)>.5)za(mid.x,mid.y,Math.pow(pd/d,Math.max(1,_.zoomSpeed*.8)));pd=d};",
    "let[a,b]=[...pts.values()],d=Math.hypot(a.x-b.x,a.y-b.y),mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};"
    "if(!gm){let dd=Math.abs(d-d0),dm=m0?Math.hypot(mid.x-m0.x,mid.y-m0.y):0;if(dd>22&&dd>dm*.7)gm=2;else if(dm>12)gm=1;else return}"
    "if(pm&&(mid.x!==pm.x||mid.y!==pm.y))pan(pm,mid);pm=mid;if(gm===2&&pd>0&&d>0&&Math.abs(d-pd)>.5)za(mid.x,mid.y,Math.pow(pd/d,Math.max(1,_.zoomSpeed*.8)));pd=d};")
rep("let pu=e=>{pts.delete(e.pointerId);pd=0;pm=null};", "let pu=e=>{pts.delete(e.pointerId);pd=0;pm=null;gm=0};")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
