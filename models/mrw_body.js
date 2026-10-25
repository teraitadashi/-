/* ===== MR Wagon (MF33S) : body loft ===== car frame: front = -z, +x = car's right, origin = ground centre */
const __MRW={L:1.6975,WM:.7375,ZW:1.2125,RW:.281,TR:.6475};
__MRW.top=function(z){ /* roof-centre / hood / deck height along z */
 const P=[[-1.6975,.80],[-1.62,.815],[-1.35,.865],[-1.10,.905],[-.92,.935],[-.62,1.25],[-.30,1.585],[-.12,1.622],[.5,1.635],[1.2,1.63],[1.42,1.612],[1.52,1.52],[1.62,1.12],[1.672,.86],[1.6975,.80]];
 for(let i=0;i<P.length-1;i++){if(z>=P[i][0]&&z<=P[i+1][0]){let t=(z-P[i][0])/(P[i+1][0]-P[i][0]);t=t*t*(3-2*t)*.35+t*.65;return P[i][1]+(P[i+1][1]-P[i][1])*t}}
 return .8};
__MRW.belt=function(z){return Math.min(.99,__MRW.top(z))};
__MRW.halfW=function(z){let a=Math.abs(z),k=Math.max(0,(a-1.50)/.1975);return __MRW.WM*(1-.115*k*k*k)};
/* half cross-section from bottom centre to top centre : array of [x,y] (x>=0) */
__MRW.section=function(z){
 const Wm=__MRW.halfW(z),T=__MRW.top(z),B=__MRW.belt(z),yb=Math.abs(z)>1.45?.27:.215,gh=Math.max(0,T-B);
 const cl=y=>Math.min(T,y),g4=Math.min(1,gh/.4),Wg=Wm*.915,Wr=Wm*.80;
 const k=[[0,yb],[Wm*.62,yb],[Wm*.9,yb+.03],[Wm*.985,yb+.13],[Wm,.50],[Wm*.995,cl(B*.72)],[Wm*.975,cl(B-.02)],
  [Wg,cl(B+.012)],[Wg-.01*g4,cl(B+gh*.16)],[lerp(Wg,Wr,.55),cl(B+gh*.55)],[Wr+.015*g4,cl(T-.085*g4)],[Wr-.04*g4,cl(T-.03*g4)],[Wr-.17,cl(T-.004)],[Wr*.45,T],[0,T]];
 let pts=k.map(p=>[p[0],p[1]]);
 for(let it=0;it<3;it++){let q=[pts[0]];for(let i=0;i<pts.length-1;i++){let a=pts[i],b=pts[i+1];q.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75])}q.push(pts[pts.length-1]);pts=q}
 return pts};
function lerp(a,b,t){return a+(b-a)*t}
/* arch punch : returns 0..1 depth inside wheel arch */
__MRW.arch=function(x,y,z){let best=0;[-1,1].forEach(s=>{let dz=z-s*__MRW.ZW,dy=y-__MRW.RW,r=Math.sqrt(dz*dz+dy*dy);if(Math.abs(x)>.45){let t=Math.min(1,Math.max(0,(.352-r)/.05));t=t*t*(3-2*t);best=Math.max(best,t)}});return best};
/* side-surface lookup : point on +x side at height y for given z (first crossing from bottom) */
__MRW.sidePt=function(z,y,sd){const s=__MRW.section(z);for(let i=1;i<s.length;i++){if(s[i][1]>=y&&s[i][0]>.3){let a=s[i-1],b=s[i],t=(y-a[1])/Math.max(1e-6,b[1]-a[1]);return[(sd||1)*(a[0]+(b[0]-a[0])*t),y,z]}}return[(sd||1)*s[s.length-1][0],y,z]};
/* window regions (cell centre x,y,z) */
__MRW.win=function(x,y,z){
 const ax=Math.abs(x),T=__MRW.top(z),edge=T-.075;
 const zap=-.90+(y-.98)*1.0;
 if(y>.985&&z<-.30&&z>-.93&&ax<.52&&y>T-.34&&z>-.90+(y-.985)*.0-.02)return 'ws';
 if(ax>.54&&y>1.03&&y<edge-.035){
  if(z>zap+.12&&z<.215)return 'f';
  if(z>.295&&z<1.00)return 'r';
  if(z>1.085&&z<1.46&&y<edge-.06)return 'q'}
 if(z>1.47&&z<1.70&&y>1.03&&ax<.51&&y>T-.40)return 'bw';
 return null};
