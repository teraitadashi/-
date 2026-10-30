/* ===== 3D 軽量化 =====
   1) 動かないメッシュを素材ごとに1つにまとめる (描画回数を大幅に削減)。炎などアニメーションするメッシュ、ライン、ライトはそのまま。
   2) 大きな区画では点光源の数を制限、影を落とす対象を大きな物だけに、描画解像度を下げる。 */
function __mergeStatic(root,skip){
 root.updateMatrixWorld(!0);const inv=new Sr().copy(root.matrixWorld).invert(),B=new Map,kill=[];
 root.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||Array.isArray(o.material)||skip&&skip.has(o)||o.userData.noMerge)return;
  const g=o.geometry;if(!g||!g.attributes.position)return;const m=o.material,key=__mKey(m)+'|'+(o.castShadow?1:0)+(o.receiveShadow?1:0)+'|'+(g.attributes.uv?1:0)+(g.attributes.color?1:0);
  if(!B.has(key))B.set(key,[]);B.get(key).push(o)});
 B.forEach(list=>{if(list.length<2)return;const P=[],N=[],U=[],C=[],o0=list[0],hasUV=!!o0.geometry.attributes.uv,hasC=!!o0.geometry.attributes.color;
  list.forEach(o=>{let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();if(!g.attributes.normal)g.computeVertexNormals();g.applyMatrix4(new Sr().multiplyMatrices(inv,o.matrixWorld));
   P.push(g.attributes.position.array);N.push(g.attributes.normal.array);if(hasUV)U.push(g.attributes.uv.array);if(hasC)C.push(g.attributes.color.array);g.dispose();kill.push(o)});
  const cat=A=>{let n=0;A.forEach(a=>n+=a.length);const r=new Float32Array(n);let k=0;A.forEach(a=>{r.set(a,k);k+=a.length});return r};
  const g=new Qi;g.setAttribute('position',new Y(cat(P),3));g.setAttribute('normal',new Y(cat(N),3));if(hasUV)g.setAttribute('uv',new Y(cat(U),2));if(hasC)g.setAttribute('color',new Y(cat(C),o0.geometry.attributes.color.itemSize));
  const m=new Z(g,o0.material);m.castShadow=o0.castShadow;m.receiveShadow=o0.receiveShadow;root.add(m)});
 kill.forEach(o=>o.parent&&o.parent.remove(o))}
/* 大きな区画: 点光源は中心に近い6灯まで、小物は影を落とさない */
function __lightenItems(G,lights,big){if(!big)return;
 const L=[];G.traverse(o=>{if(o.isPointLight)L.push(o)});if(L.length>6){const wp=new J;L.sort((a,b)=>a.getWorldPosition(wp).lengthSq()-b.getWorldPosition(new J).lengthSq());
  L.slice(6).forEach(l=>{l.parent&&l.parent.remove(l);const i=lights.findIndex(x=>x.light===l);i>=0&&lights.splice(i,1)})}
 G.traverse(o=>{if(o.isMesh&&o.castShadow&&o.geometry){if(!o.geometry.boundingSphere)o.geometry.computeBoundingSphere();const s=o.getWorldScale(new J),r=o.geometry.boundingSphere.radius*Math.max(s.x,s.y,s.z);if(r<.6)o.castShadow=!1}})}
/* 大きな区画: カメラから遠いギアは軽い代わりの形で描き、近づくと本来のモデルに切り替える */
function __lodMake(s,it){const tri=g=>(g.index?g.index.count:g.attributes.position.count)/3,det=s.children.filter(o=>o.isMesh&&o.geometry&&tri(o.geometry)>2||o.isLine);if(!det.length)return null;
 const c=new ri(it.color||'#9ca3af'),m=new Q({color:c,roughness:.85}),W=it.width||1,D=it.depth||1,H=it.height||.5;let px;
 if(it.category==='tent'||it.category==='tarp'){px=new Z(new Ro(1,12,6,0,2*Math.PI,0,Math.PI/2),m);px.scale.set(W/2,H,D/2)}
 else if(it.category==='vehicle'){px=new Z(new eo(W,H*.92,D),m);px.position.y=H*.46+.1}
 else{px=new Z(new eo(W,H,D),m);px.position.y=H/2}
 px.visible=!1;s.add(px);return{g:s,px,det,far:!1}}
function __lodTick(cam){const L=window.__lodItems;if(!L||!L.length)return;const wp=new J;
 for(const e of L){const far=e.g.getWorldPosition(wp).distanceTo(cam.position)>40;if(far!==e.far){e.far=far;e.px.visible=far;e.det.forEach(o=>o.visible=!far)}}}
