/* ===== 見本: のかみふれあい オートキャンプ場 全体 (全21区画を満サイト) =====
   各区画のローカル座標 (lx:幅方向 / lz:奥行方向、+lz が道路側)。区画の右前 (lx=+3.8, lz=+3) が 3×5m の駐車枠。
   テントは区画の奥、リビング (テーブル・チェア・焚き火) は道路側の芝生、車は駐車枠に入れる。ギアの組み合わせは区画ごとにランダム (固定シード)。 */
function __nkSample(){
 const R=__pRng(2121),pick=a=>a[Math.floor(R()*a.length)],all=[...y,...__CBR],P=id=>all.find(g=>g.id===id),out=[];
 const tents=[['my-coleman-roomy-front-2room',-1.6,-2.2],['my-coleman-toughscreen-2room-air-mdx',-1.4,-2.3],['my-coleman-touring-dome-air-lx',-1.8,-2.8],['my-pykes-peak-dome-1p',-2,-3.3],['br-tentmark-circus-tc',-1.6,-2.6],['br-nordisk-asgard-126',-1.6,-2.8]];
 const chairs=['my-coleman-healing-chair-hb','my-coleman-healing-chair-mesh','br-helinox-chair-one','br-snowpeak-low-chair-30','br-coleman-resort-chair'];
 const tables=['my-coleman-natural-mini-table','br-snowpeak-igt-slim','br-helinox-table-one-hardtop','br-uniflame-takibi-table'];
 const fires=['my-sp-takibitai-ll','br-uniflame-fire-grill'],cookTop=['my-coleman-coolstage-tabletop','br-iwatani-tafumaru-jr'],coolers=['my-coleman-excursion-cooler-16qt-red','br-stanley-water-jug-75'];
 const shades=['my-coleman-instant-visor-shade-250p','br-ddhammocks-dd-tarp-3x3'],cars=['my-nissan-elgrand-e52','my-suzuki-mrwagon'];
 __NK.S.forEach(s=>{
  const th=Math.PI/2-s.f*Math.PI/180,c=Math.cos(th),sn=Math.sin(th),gx=s.x-__NKX+75,gz=s.z-__NKZ+70;
  const put=(id,lx,lz,lr,extra)=>{const p=P(id);if(!p)return;const o={...p,...(extra||{}),id:`nk${s.n}-${out.length}`,presetId:p.id,x:Math.round((gx+lx*c+lz*sn)*100)/100,y:Math.round((gz-lx*sn+lz*c)*100)/100,
    rotation:Math.round(s.f-90+(lr||0)),showRopes:p.category===`tent`||p.category===`tarp`};const cv=__CV[p.id];if(cv&&cv.ui!==0&&R()<.5){const v=pick(cv.v);o.colorName=v[0];o.color=v[1]}out.push(o)};
  /* テント (各区画に必ず1張) */
  const t=s.n===1?tents[0]:pick(tents);put(t[0],t[1],t[2],0);
  /* 車は駐車枠の中央 */
  put(pick(cars),3.8,3,0);
  /* リビング: シェード(小さめのテントの区画だけ)・テーブル・チェア・焚き火・クーラー・ランタン */
  const small=t[0]===`my-pykes-peak-dome-1p`||t[0]===`my-coleman-touring-dome-air-lx`,tb=pick(tables),tx=-1.6,tz=2.1;
  if(small||R()<.35)put(pick(shades),tx,tz,0);
  put(tb,tx,tz,0);
  const nC=2+Math.floor(R()*3),ch=pick(chairs),spots=[[tx-1,tz+.9,200],[tx+.9,tz+.9,160],[tx-1.15,tz-.3,250],[tx+1.1,tz-.3,110]];
  for(let i=0;i<nC;i++){const sp=spots[i];put(R()<.7?ch:pick(chairs),sp[0],sp[1],sp[2])}
  put(pick(cookTop),tx+.12,tz,0);
  put(pick(fires),tx,tz+2.3,0);
  put(pick(coolers),tx+1.7,tz+.3,0);
  put(R()<.5?'my-coleman-packaway-lantern':'br-snowpeak-pile-driver',R()<.5?tx-.15:tx-2.4,R()<.5?tz:tz-1.4,0);
  if(R()<.35)put('my-coleman-outdoor-wagon-nx',1.4,-3.8,90);
 });
 return out}
