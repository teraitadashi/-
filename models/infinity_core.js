/* ===== コールマン インフィニティチェア (リクライニング3段階) =====
   公表サイズ: 通常 約92×69×110(h)cm / フルリクライニング 約166×69×76(h)cm、座面高 約50cm、重量 約8.8kg、耐荷重 約100kg。
   +z が足側 (前)、-z が頭側。リクライニングで奥行 (depth) と高さが変わる。 */
const __INF_REC=[['up','起こす',.92,1.1],['mid','中間',1.29,.93],['flat','フラット',1.66,.76]];
const __INF_GEAR={id:'br-coleman-infinity-chair',mk3d:'infinity',name:'コールマン インフィニティチェア',manufacturer:'コールマン (Coleman)',productName:'インフィニティチェア',category:'furniture',
 width:.69,depth:.92,height:1.1,ropeMargin:0,color:'#b9a68a',recline:'up',reclines:__INF_REC,
 description:'無段階でリクライニングできるゼログラビティ型のリラックスチェア。使用時 約92×69×110(h)cm (フルリクライニング時 約166×69×76(h)cm)、座面高 約50cm、重量 約8.8kg、耐荷重 約100kg。枕付き。',weight:'約8.8 kg'};
/* 側面から見た座面の線 (z, y)。頭 → 肩 → 腰 → 膝 → 足先。起こす/フラットの間を補間 */
const __INF_UP=[[-.40,1.08],[-.28,.80],[-.10,.43],[.24,.49],[.40,.12]],__INF_FL=[[-.80,.74],[-.45,.61],[-.05,.44],[.40,.56],[.80,.60]];
function __infinity3d(G,it,add,fab){const PI=Math.PI,r=it.recline==='flat'?1:it.recline==='mid'?.5:0,P=__INF_UP.map((p,i)=>[p[0]+(__INF_FL[i][0]-p[0])*r,p[1]+(__INF_FL[i][1]-p[1])*r]);
 const mF=fab(it.color||'#b9a68a'),mK=new Q({color:'#1e1f22',metalness:.55,roughness:.45}),mA=new Q({color:'#232326',roughness:.6}),hw=.27;
 const cv=new vo(P.map(p=>new J(0,p[1],p[0])),!1,'catmullrom',.35),pts=cv.getPoints(40);
 /* 座面 (メッシュ生地) */
 const pos=[];for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];pos.push([-hw,a.y,a.z],[hw,a.y,a.z],[hw,b.y,b.z],[-hw,a.y,a.z],[hw,b.y,b.z],[-hw,b.y,b.z])}
 const g=new Qi;g.setAttribute('position',new Y(pos.flat(),3));g.computeVertexNormals();add(g,mF,!0);
 /* 座面の左右の黒いフレーム (座面に沿って曲がる) と、生地を留めるゴムひも */
 [-1,1].forEach(sx=>{add(new Bo(new vo(pts.map(p=>new J(sx*(hw+.02),p.y,p.z))),60,.012,6,!1),mK,!0);
  for(let i=2;i<pts.length-2;i+=3){const p=pts[i],m=add(new to(.003,.003,.03,4),mA);m.rotation.z=PI/2;m.position.set(sx*(hw+.005),p.y,p.z)}});
 /* 足先と頭側の横パイプ */
 [pts[0],pts[pts.length-1]].forEach(p=>{const m=add(new to(.012,.012,hw*2+.04,8),mK,!0);m.rotation.z=PI/2;m.position.set(0,p.y,p.z)});
 /* 枕 */
 const hp=cv.getPoint(.06),pl=add(new eo(.3,.07,.16),fab(it.color||'#b9a68a'),!0);pl.position.set(0,hp.y+.04,hp.z+.02);pl.rotation.x=-(PI/2-Math.atan2(P[0][1]-P[1][1],P[1][0]-P[0][0]))*.9;
 /* 脚 (左右の A 字) とひじ掛け。ひじ掛けは座面の腰の少し上で支点になる */
 const ah=.62,az=.02;
 [-1,1].forEach(sx=>{const x=sx*.32,tube=(A,B)=>{const a=new J(...A),b=new J(...B),m=add(new to(.012,.012,a.distanceTo(b),8),mK,!0);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new J(0,1,0),b.clone().sub(a).normalize())};
  tube([x,0,.34],[x,ah,az-.08]);tube([x,0,-.36],[x,ah,az+.1]);tube([x,.02,-.36],[x,.02,-.2]);tube([x,.02,.34],[x,.02,.2]);
  const arm=add(new eo(.09,.035,.46),mA,!0);arm.position.set(sx*.3,ah+.03,az);arm.rotation.x=.06;
  const tip=add(new eo(.11,.04,.12),mA,!0);tip.position.set(sx*.3,ah+.05,az+.2)});
 /* 前後の脚をつなぐ横パイプ */
 [[.02,.34],[.02,-.36]].forEach(([y,z])=>{const m=add(new to(.011,.011,.64,8),mK,!0);m.rotation.z=PI/2;m.position.set(0,y,z)})}
