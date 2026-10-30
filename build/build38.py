# 2D 軽量化 その2: パン・ピンチ中は SVG を1枚の絵として動かし、0.2秒ごと/指を離したときだけ描き直す
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
add = open('models/perf2d_core.js').read().split('/* ===== 2D 軽量化 その2')[1]


def rep(o, n, s=None):
    global b
    seg = b if s is None else s
    assert seg.count(o) == 1, (seg.count(o), o[:80])
    if s is None:
        b = b.replace(o, n)
        return
    return seg.replace(o, n)


rep('const __VC=new WeakMap;', '/* ===== 2D 軽量化 その2' + add.strip() + '\nconst __VC=new WeakMap;')
i = b.find('Ie=(')
j = b.find('let ve=(n,r)=>', i)
m = b[i:j]
# ピンチ
m = rep("l=n.x-s*r,d=n.y-c*r;u(r),m({x:l,y:d})}", "l=n.x-s*r,d=n.y-c*r;__g2Go(c.current,{x:l,y:d},r,(P,L)=>{u(L),m(P)})}", m)
# 1本指パン
m = rep("else P&&m({x:e.clientX-I.x,y:e.clientY-I.y})},he=e=>{", "else P&&__g2Go(c.current,{x:e.clientX-I.x,y:e.clientY-I.y},null,P=>m(P))},he=e=>{__g2Flush(c.current);", m)
# 触り始めは「いま見えている」位置・倍率を基準にする
m = rep("re.current={...p},ie.current=l", "re.current={...__g2P(c.current,p)},ie.current=__g2L(c.current,l)", m)
m = rep("ee({x:e.clientX-p.x,y:e.clientY-p.y})", "ee({x:e.clientX-__g2P(c.current,p).x,y:e.clientY-__g2P(c.current,p).y})", m)
# 描き直しが画面に出たら、ずらしていた分を戻す
m = rep("return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[ce]),",
        "return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[ce]),(0,_.useLayoutEffect)(()=>{__g2Sync(c.current,p,l)}),", m)
b = b[:i] + m + b[j:]
# 「どの台に載っているか」(k) と配置チェック (A) を、ギア一覧が変わらない限り使い回す
# (以前は描き直しのたびに全ギア×全ギアで計算し、並べ替えの比較の中でも呼んでいた)
rep("function k(e,t){if(!O(e))return null;",
    "function k(e,t){let c=k.c||(k.c=new WeakMap),m=c.get(t);if(!m)c.set(t,m=new Map);if(m.has(e))return m.get(e);let r=__k0(e,t);m.set(e,r);return r}function __k0(e,t){if(!O(e))return null;")
rep("function A(e,t){let n=e.width*e.depth",
    "function A(e,t){let c=A.c||(A.c=new WeakMap),h=c.get(t);if(h&&h.e===e)return h.r;let r=__A0(e,t);c.set(t,{e,r});return r}function __A0(e,t){let n=e.width*e.depth")
# MRワゴン2D: ドアの継ぎ目の線の位置が数値になっておらず (NaN) 線が出ていなかった。前ドア前端・B ピラー・後ドア後端に引く
_k = b.find("includes(`MRワゴン`)?(0,U.jsxs)(`g`,{children:[(0,U.jsx)(`rect`,{x:-0.7*l")
_e = b.find("children:`MRワゴン`})]})", _k)
_seg = b[_k:_e]
_ln = "(0,U.jsx)(`line`,{x1:`${%s*l}`,y1:`${z*l}`,x2:`${%s*l}`,y2:`${z*l}`,stroke:`#9aa0a5`,strokeWidth:`0.8`})"
_old = ",".join([_ln % ('-.725', '-.62'), _ln % ('.725', '.62')] * 3)
assert _seg.count(_old) == 1
_new = ",".join(x.replace('${z*l}', '${%s*l}' % zz) for zz in ('-.62', '.12', '.88') for x in (_ln % ('-.725', '-.62'), _ln % ('.725', '.62')))
b = b[:_k] + _seg.replace(_old, _new) + b[_e:]
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
