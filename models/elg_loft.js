function __elgLoft(G){
 if(window.__elgCache){window.__elgCache.forEach(([g,m])=>G.add(new Z(g,m)));return window.__elgInfo}
 const M=__ELG,L=M.L,NZ=520;
 const zs=[];for(let i=0;i<=NZ;i++){let t=i/NZ,c=.5-.5*Math.cos(Math.PI*t);zs.push(-L+2*L*(.5*t+.5*c))}
 /* ring of one section (top-centre -> left side -> bottom -> right side -> top-centre) */
 const rings=[];let NR=0;
 zs.forEach(z=>{const h=M.section(z),n=h.length;const ring=[];
  for(let i=n-1;i>=0;i--)ring.push([-h[i][0],h[i][1]]);
  for(let i=1;i<n;i++)ring.push([h[i][0],h[i][1]]);
  NR=ring.length;rings.push(ring)});
 /* vertices + arch punch flag */
 const V=[],F=[];
 for(let i=0;i<=NZ;i++){const z=zs[i];for(let j=0;j<NR;j++){let x=rings[i][j][0],y=rings[i][j][1],f=0;
   const t=M.arch(x,y,z);if(t>0){x=Math.sign(x)*(Math.abs(x)-(Math.abs(x)-.5)*t)}f=t;
   V.push(x,y,z);F.push(f)}}
 /* smooth normals from indexed grid */
 const N=new Float32Array(V.length);
 const vi=(i,j)=>(i*NR+((j%NR)+NR)%NR)*3;
 for(let i=0;i<NZ;i++)for(let j=0;j<NR-1;j++){
  const a=vi(i,j),b=vi(i+1,j),c=vi(i+1,j+1),d=vi(i,j+1);
  [[a,b,d],[b,c,d]].forEach(([p,q,r])=>{
   const ux=V[q]-V[p],uy=V[q+1]-V[p+1],uz=V[q+2]-V[p+2],vx=V[r]-V[p],vy=V[r+1]-V[p+1],vz=V[r+2]-V[p+2];
   const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;[p,q,r].forEach(k=>{N[k]+=nx;N[k+1]+=ny;N[k+2]+=nz})})}
 for(let k=0;k<N.length;k+=3){let l=Math.hypot(N[k],N[k+1],N[k+2])||1;N[k]/=l;N[k+1]/=l;N[k+2]/=l}
 /* classify cells */
 const cell=[];const WIN=new Uint8Array(NZ*(NR-1));const WT=new Array(NZ*(NR-1));const WY=new Float32Array(NZ*(NR-1));
 for(let i=0;i<NZ;i++)for(let j=0;j<NR-1;j++){
  const a=vi(i,j),c=vi(i+1,j+1);let x=(V[a]+V[c])/2,y=(V[a+1]+V[c+1])/2,z=(V[a+2]+V[c+2])/2;
  const w=M.win(x,y,z);WY[i*(NR-1)+j]=y;if(w){WIN[i*(NR-1)+j]=1;WT[i*(NR-1)+j]=w}}
 const isW=(i,j)=>i>=0&&i<NZ&&j>=0&&j<NR-1&&WIN[i*(NR-1)+j];
 const PAINT=[1,1,.995],BLACK=[.045,.047,.05],LINER=[.035,.035,.04];
 const bp=[],bn=[],bc=[],gl={ws:[],f:[],r:[],q:[],bw:[]};
 const pushTri=(arrP,arrN,arrC,idx,col)=>{idx.forEach(k=>{arrP.push(V[k],V[k+1],V[k+2]);arrN.push(N[k],N[k+1],N[k+2]);if(arrC){const t=Math.min(1,F[k/3]*1.0);arrC.push(col[0]+(LINER[0]-col[0])*t,col[1]+(LINER[1]-col[1])*t,col[2]+(LINER[2]-col[2])*t)}})};
 for(let i=0;i<NZ;i++)for(let j=0;j<NR-1;j++){
  const a=vi(i,j),b=vi(i+1,j),c=vi(i+1,j+1),d=vi(i,j+1);
  const ci=i*(NR-1)+j;
  if(WIN[ci]){ /* glass (pushed slightly inward) */
   const g=gl[WT[ci]];[[a,b,d],[b,c,d]].forEach(t=>t.forEach(k=>{g.push(V[k]*.994,V[k+1]-.004,V[k+2]);}));continue}
  let col=PAINT;
  {let near=!1;for(let di=-6;di<=6&&!near;di++)for(let dj=-6;dj<=6;dj++){const ii=i+di,jj=j+dj;if(isW(ii,jj)){const ty=WT[ii*(NR-1)+jj];if(ty==='ws'?(Math.abs(di)<=2||Math.abs(dj)>=3):(Math.abs(dj)<=1&&Math.abs(di)<=6&&WY[i*(NR-1)+j]>WY[ii*(NR-1)+jj]+.012)){near=!0;break}}}
   if(near)col=BLACK}
  pushTri(bp,bn,bc,[a,b,d,b,c,d],col)}
 /* end caps */
 [[0,!1],[NZ,!0]].forEach(([i,rev])=>{let cx=0,cy=0;for(let j=0;j<NR;j++){cx+=V[vi(i,j)];cy+=V[vi(i,j)+1]}cx/=NR;cy/=NR;
  const z=zs[i],nz=rev?1:-1;
  for(let j=0;j<NR-1;j++){const a=vi(i,j),b=vi(i,j+1);const tri=rev?[[V[b],V[b+1],V[b+2]],[V[a],V[a+1],V[a+2]],[cx,cy,z]]:[[V[a],V[a+1],V[a+2]],[V[b],V[b+1],V[b+2]],[cx,cy,z]];
   tri.forEach(p=>{bp.push(p[0],p[1],p[2]);bn.push(0,0,nz);bc.push(PAINT[0],PAINT[1],PAINT[2])})}});
 const geo=(p,n,c)=>{let g=new Qi;g.setAttribute('position',new Y(p,3));if(n)g.setAttribute('normal',new Y(n,3));if(c)g.setAttribute('color',new Y(c,3));if(!n)g.computeVertexNormals();return g};
 const mPaint=new Q({color:'#ffffff',vertexColors:!0,roughness:.3,metalness:.03,side:2,emissive:'#2e2e31'});
 window.__elgCache=[];const gb=geo(bp,bn,bc);let body=new Z(gb,mPaint);body.castShadow=!0;body.receiveShadow=!0;G.add(body);window.__elgCache.push([gb,mPaint]);
 const gm={ws:['#a9bcc0',.46,.1],f:['#7f9094',.55,.12],r:['#2b3135',.82,.2],q:['#2b3135',.82,.2],bw:['#2b3135',.8,.2]};
 Object.keys(gl).forEach(k=>{if(!gl[k].length)return;
  const m=new Q({color:gm[k][0],transparent:!0,opacity:gm[k][1],roughness:gm[k][2],metalness:.3,side:2,depthWrite:!1});
  const g=geo(gl[k],null,null);G.add(new Z(g,m));window.__elgCache.push([g,m])});
 window.__elgInfo={zs,NR};return window.__elgInfo}
