/* ===== 2D 軽量化 =====
   平面図はパン・ズーム・ドラッグのたびに全ギアのSVGを作り直していた。
   ギアごとの描画結果を「そのギア・選択状態・倍率・区画・載っている台」が変わらない限り使い回し、キャンプ場の地図レイヤーも倍率が変わるまで使い回す。 */
const __VC=new WeakMap;
function __veC(it,sel,l,site,sup,ve){const c=__VC.get(it);if(c&&c.sel===sel&&c.l===l&&c.site===site&&c.sup===sup)return c.el;const el=ve(it,sel);__VC.set(it,{sel,l,site,sup,el});return el}
const __OC={};
function __ovC(key,site,l,fn){const c=__OC[key];if(c&&c.site===site&&c.l===l)return c.el;const el=fn();__OC[key]={site,l,el};return el}
/* ===== 2D 軽量化 その2: 指で動かしている間は「1枚の絵」として動かす =====
   パン・ピンチのたびに全ギアのSVGを描き直すのをやめ、動かしている間は今の絵をそのまま (GPUの1枚の絵として) ずらす・拡大する。
   0.2秒ごとと指を離したときだけ本当の位置・倍率で描き直す。 */
function __g2Svg(h){return h&&h.querySelector(':scope > svg')}
function __g2Paint(h){const g=h.__g2,sv=__g2Svg(h);if(!sv||!g||!g.cur)return;const t=g.tgt;
 if(!t||t.L===g.cur.L&&t.P.x===g.cur.P.x&&t.P.y===g.cur.P.y){g.tgt=null;sv.style.transform='';sv.style.willChange='';return}
 const s=t.L/g.cur.L,tx=t.P.x-g.cur.P.x*s,ty=t.P.y-g.cur.P.y*s;sv.style.transformOrigin='0 0';sv.style.willChange='transform';sv.style.transform=`translate3d(${tx}px,${ty}px,0) scale(${s})`}
function __g2Sync(h,p,l){if(!h)return;const g=h.__g2||(h.__g2={});g.cur={P:{x:p.x,y:p.y},L:l};__g2Paint(h)}
function __g2Flush(h){const g=h&&h.__g2;if(!g)return;clearTimeout(g.tm);g.tm=0;if(g.tgt&&g.commit){const t=g.tgt;g.commit(t.P,t.L)}}
function __g2Go(h,P,L,commit){const g=h&&h.__g2;if(!g||!g.cur){commit(P,L==null?0:L);return}
 g.tgt={P,L:L==null?(g.tgt?g.tgt.L:g.cur.L):L};g.commit=commit;__g2Paint(h);if(!g.tm)g.tm=setTimeout(()=>{g.tm=0;__g2Flush(h)},200)}
function __g2P(h,p){const g=h&&h.__g2;return g&&g.tgt?g.tgt.P:p}
function __g2L(h,l){const g=h&&h.__g2;return g&&g.tgt?g.tgt.L:l}
