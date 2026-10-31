# 2D の2本指: 動き始めで「スライド (移動)」か「ピンチ (ズーム)」かを決め、スライド中は倍率を変えない
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a


def rep(o, n):
    global b
    assert b.count(o) == 1, (b.count(o), o[:80])
    b = b.replace(o, n)


rep("L.current.size===2&&te.current>0){let e=Array.from(L.current.values()),t=Math.hypot(e[1].x-e[0].x,e[1].y-e[0].y)/te.current,n={x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2},r=Math.min(220,Math.max(1,ie.current*t)),i=ne.current,a=re.current,o=ie.current,s=(i.x-a.x)/o,c=(i.y-a.y)/o,l=n.x-s*r,d=n.y-c*r;__g2Go(c.current,{x:l,y:d},r,(P,L)=>{u(L),m(P)})}",
    "L.current.size===2&&te.current>0){let e=Array.from(L.current.values()),dd0=Math.hypot(e[1].x-e[0].x,e[1].y-e[0].y),n={x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2},i=ne.current;"
    "if(!window.__gm2){let dd=Math.abs(dd0-te.current),dm=Math.hypot(n.x-i.x,n.y-i.y);if(dd>22&&dd>dm*.7)window.__gm2=2;else if(dm>12)window.__gm2=1;else return}"
    "let t=window.__gm2===2?dd0/te.current:1,r=Math.min(220,Math.max(1,ie.current*t)),a=re.current,o=ie.current,s=(i.x-a.x)/o,cc=(i.y-a.y)/o,l=n.x-s*r,d=n.y-cc*r;__g2Go(c.current,{x:l,y:d},r,(P,L)=>{u(L),m(P)})}")
rep("ie.current=__g2L(c.current,l)}", "ie.current=__g2L(c.current,l),window.__gm2=0}")
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
