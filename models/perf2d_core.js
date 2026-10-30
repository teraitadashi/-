/* ===== 2D 軽量化 =====
   平面図はパン・ズーム・ドラッグのたびに全ギアのSVGを作り直していた。
   ギアごとの描画結果を「そのギア・選択状態・倍率・区画・載っている台」が変わらない限り使い回し、キャンプ場の地図レイヤーも倍率が変わるまで使い回す。 */
const __VC=new WeakMap;
function __veC(it,sel,l,site,sup,ve){const c=__VC.get(it);if(c&&c.sel===sel&&c.l===l&&c.site===site&&c.sup===sup)return c.el;const el=ve(it,sel);__VC.set(it,{sel,l,site,sup,el});return el}
const __OC={};
function __ovC(key,site,l,fn){const c=__OC[key];if(c&&c.site===site&&c.l===l)return c.el;const el=fn();__OC[key]={site,l,el};return el}
