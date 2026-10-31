/* ===== 3D のメモリ対策 (iPhone でメモリが足りなくなるとアプリごと落ちてホーム画面に戻るため) =====
   1) 作り直す前の3Dの部品は、GPU のメモリ (形・素材・模様) を必ず解放する
   2) 近づいて細かく描いた区画は、遠ざかったら4区画分だけ残して GPU から下ろす (形のデータは残すので、また近づけばすぐ戻る)
   3) 3D 画面を閉じたら描画の仕組みごと解放する */
function __disposeObj(o){o.traverse(q=>{if(q.geometry&&q.geometry.dispose)q.geometry.dispose();const ms=q.material?(Array.isArray(q.material)?q.material:[q.material]):[];
 ms.forEach(m=>{for(const k in m){const v=m[k];if(v&&v.isTexture)v.dispose()}m.dispose&&m.dispose()})})}
function __disposeKids(g){while(g.children.length){const c=g.children[0];g.remove(c);__disposeObj(c)}}
let __cellSeq=0;
function __cellEvict(L){const D=L.filter(c=>c.det&&c.far);if(L.filter(c=>c.det).length<=4)return;D.sort((a,b)=>a.seen-b.seen);
 let n=L.filter(c=>c.det).length-4;for(const c of D){if(n--<=0)break;c.det.forEach(m=>{c.A.remove(m);m.geometry.dispose()});c.cache=c.det;c.det=null}}
