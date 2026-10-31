/* ===== 見本: 煙樹ヶ浜キャンプ場 (松林のフリーサイト) / 遠井キャンプ場 全体 =====
   どちらも「テント1張＋リビング (テーブル・チェア・焚き火台・クーラー・ランタン)」のグループを、
   松の幹・木・建物・区画の外にかからない場所に置く。グループのローカル座標は +ly がリビング側 (テントの入口側)。 */
/* 見本の車の色: 白ばかりにならないよう、白系は2割ほどに抑える (MRワゴンは15%、エルグランドは30%だけ白で、残りは白以外の色)。車種もMRワゴンを少し多めに */
function __carPick(R){return R()<.62?'my-suzuki-mrwagon':'my-nissan-elgrand-e52'}
function __carPaint(it,R){const cv=__CV[it.presetId||it.id];if(!cv||!cv.v)return;const W=v=>/ホワイト|白/.test(v[0]),nw=cv.v.filter(v=>!W(v)),ws=cv.v.filter(W);
 const L=R()<(it.presetId===`my-nissan-elgrand-e52`?.3:.15)&&ws.length||!nw.length?ws:nw,v=L[Math.floor(R()*L.length)];if(!v)return;it.colorName=v[0];it.color=v[1]}
function __campPool(){const all=[...y,...__CBR];return{P:id=>all.find(g=>g.id===id),
 tents:[['my-coleman-roomy-front-2room',0,-2.6],['my-coleman-toughscreen-2room-air-mdx',0,-2.7],['my-coleman-touring-dome-air-lx',0,-2.4],['my-pykes-peak-dome-1p',0,-2],['br-tentmark-circus-tc',0,-2.4],['br-nordisk-asgard-126',0,-2.6]],
 chairs:['my-coleman-healing-chair-hb','my-coleman-healing-chair-mesh','br-helinox-chair-one','br-snowpeak-low-chair-30','br-coleman-resort-chair'],
 tables:['my-coleman-natural-mini-table','br-snowpeak-igt-slim','br-helinox-table-one-hardtop','br-uniflame-takibi-table'],
 fires:['my-sp-takibitai-ll','br-uniflame-fire-grill'],cook:['my-coleman-coolstage-tabletop','br-iwatani-tafumaru-jr'],coolers:['my-coleman-excursion-cooler-16qt-red','br-stanley-water-jug-75'],
 shades:['my-coleman-instant-visor-shade-250p','br-ddhammocks-dd-tarp-3x3'],cars:['my-nissan-elgrand-e52','my-suzuki-mrwagon']}}
/* 1グループを置く。(ox,oy) を中心に角度 rot (度・時計回り) で回す */
function __campGroup(out,K,R,pfx,ox,oy,rot,o){const pick=a=>a[Math.floor(R()*a.length)],th=rot*Math.PI/180,c=Math.cos(th),s=Math.sin(th);
 const put=(id,lx,ly,lr,ex)=>{const p=K.P(id);if(!p)return;const it={...p,...(ex||{}),id:`${pfx}-${out.length}`,presetId:p.id,x:Math.round((ox+lx*c-ly*s)*100)/100,y:Math.round((oy+lx*s+ly*c)*100)/100,
   rotation:Math.round(((rot+(lr||0))%360+360)%360),showRopes:p.category===`tent`||p.category===`tarp`};const cv=__CV[p.id];if(p.category===`vehicle`)__carPaint(it,R);else if(cv&&cv.ui!==0&&R()<.5){const v=pick(cv.v);it.colorName=v[0];it.color=v[1]}out.push(it)};
 const t=o.tent||pick(K.tents);put(t[0],t[1],t[2],0);
 const small=t[0]===`my-pykes-peak-dome-1p`||t[0]===`my-coleman-touring-dome-air-lx`,tx=0,tz=2.1;
 if(small||R()<.35)put(pick(K.shades),tx,tz,0);
 put(pick(K.tables),tx,tz,0);
 const nC=small?1+Math.floor(R()*2):2+Math.floor(R()*3),ch=pick(K.chairs),sp=[[tx-1,tz+.9,200],[tx+.9,tz+.9,160],[tx-1.15,tz-.3,250],[tx+1.1,tz-.3,110]];
 for(let i=0;i<nC;i++)put(R()<.7?ch:pick(K.chairs),sp[i][0],sp[i][1],sp[i][2]);
 put(pick(K.cook),tx+.12,tz,0);put(pick(K.fires),tx,tz+2.3,0);put(pick(K.coolers),tx+1.7,tz+.3,0);
 /* インフィニティチェア (4割のグループ)。焚き火台の方へ向け、リクライニングはランダム */
 if(R()<.4){const q=pick(__INF_REC);put(`br-coleman-infinity-chair`,tx+2.2,tz+3.6,70,{recline:q[0],depth:q[2],height:q[3]})}
 put(`my-coleman-packaway-lantern`,tx-.15,tz,0);
 if(o.car)put(__carPick(R),o.car[0],o.car[1],o.car[2]||0)}
/* グループの外形 (テントのロープ〜焚き火台の先まで) を回して返す */
function __campFoot(ox,oy,rot,w,y0,y1){const th=rot*Math.PI/180,c=Math.cos(th),s=Math.sin(th),r=[];
 for(let lx=-w;lx<=w+1e-6;lx+=w/3)for(let ly=y0;ly<=y1+1e-6;ly+=(y1-y0)/6)r.push([ox+lx*c-ly*s,oy+lx*s+ly*c]);return r}
function __enjuSample(){const K=__campPool(),R=__pRng(5151),out=[],W=50,D=50,pines=__pinePositions(W,D).filter(p=>p.inside).map(p=>[p.x+W/2,p.z+D/2]),G=[];
 for(let i=0;i<4000&&G.length<7;i++){const ox=4+R()*(W-8),oy=4+R()*(D-8),rot=Math.round(R()*8)*45;
  const F=__campFoot(ox,oy,rot,3,-5.6,5);if(F.some(([x,y])=>x<1||y<1||x>W-1||y>D-1))continue;
  if(F.some(([x,y])=>pines.some(([px,py])=>Math.hypot(x-px,y-py)<1.4)))continue;
  if(G.some(g=>Math.hypot(g[0]-ox,g[1]-oy)<12))continue;G.push([ox,oy,rot])}
 G.sort((a,b)=>Math.hypot(a[0]-25,a[1]-25)-Math.hypot(b[0]-25,b[1]-25));
 G.forEach((g,i)=>__campGroup(out,K,R,`en${i}`,g[0],g[1],g[2],{tent:i===0?K.tents[0]:null}));return out}
function __tooiSample(){const K=__campPool(),R=__pRng(7373),out=[],A=__TY,G=[];
 const lawnOK=(x,z)=>__tyInLawn(x,z)&&__tyHZ(x,z)[1]===0&&!A.ev.some(e=>Math.hypot(x-e[0],z-e[1])<e[2]+.6)&&Math.hypot(x-A.shelter.x,z-A.shelter.z)>6;
 const beachOK=(x,z)=>{const h=__tyHZ(x,z);return h[1]===2&&__tySD(A.riv,x,z)<-A.rw-1.5&&__tySD(A.lev,x,z)>A.LW+1};
 /* 芝生サイト: 車は駐車場、テントは台地の芝生 */
 /* 細長い芝生なので、テントの向きは芝生の長軸に直交 (リビングは南の川側 or 北の駐車場側) */
 for(let i=0;i<20000&&G.filter(g=>g[3]).length<5;i++){const ox=4+R()*62,oy=30+R()*28,rot=(R()<.5?-25:155)+Math.round((R()-.5)*2)*15;
  const F=__campFoot(ox,oy,rot,2.6,-5.4,4.8);if(!F.every(([x,z])=>lawnOK(x,z)))continue;if(G.some(g=>Math.hypot(g[0]-ox,g[1]-oy)<9.5))continue;G.push([ox,oy,rot,1])}
 /* 河川敷: 砂利の上に車を横付け。リビングは川の方を向ける */
 for(let i=0;i<6000&&G.filter(g=>!g[3]).length<6;i++){const ox=40+R()*150,oy=40+R()*50,nr=__tyNear(A.riv,ox,oy),a=A.riv[nr[1]],b=A.riv[nr[1]+1];
  const rot=Math.round((Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI)/15)*15;
  const F=__campFoot(ox,oy,rot,5.2,-5.6,5);if(!F.every(([x,z])=>beachOK(x,z)))continue;if(G.some(g=>Math.hypot(g[0]-ox,g[1]-oy)<13))continue;G.push([ox,oy,rot,0])}
 G.forEach((g,i)=>__campGroup(out,K,R,`ty${i}`,g[0],g[1],g[2],{tent:i===0?K.tents[0]:null,car:g[3]?null:[4.3,-1.2,0]}));
 /* 芝生サイトの車は駐車場の枠 (白線 2.5m 間隔) に、通路側に頭を向けて停める */
 const pk=A.park,a=pk[0],b=pk[1],d=pk[3],L=Math.hypot(b[0]-a[0],b[1]-a[1]),ux=(b[0]-a[0])/L,uz=(b[1]-a[1])/L,vx=d[0]-a[0],vz=d[1]-a[1],W=Math.hypot(vx,vz),
  ang=Math.atan2(vx/W,-vz/W)*180/Math.PI;
 G.filter(g=>g[3]).forEach((g,i)=>{const p=K.P(__carPick(R));if(!p)return;const s2=2.5*(3+i*2)+1.25,x=a[0]+ux*s2+vx*.23,z=a[1]+uz*s2+vz*.23;
  const it={...p,id:`typk-${i}`,presetId:p.id,x:Math.round(x*100)/100,y:Math.round(z*100)/100,rotation:Math.round((ang%360+360)%360),showRopes:!1};__carPaint(it,R);out.push(it)});
 return out}
