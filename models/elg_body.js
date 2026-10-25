/* ===== Nissan Elgrand E52 Highway Star (front grade) : body loft ===== front = -z, +x = car's right, origin = ground centre */
const __ELG={L:2.4575,WM:.925,ZW:1.5,RW:.352,TR:.795};
function __elgLerp(a,b,t){return a+(b-a)*t}
__ELG.top=function(z){
 const P=[[-2.4575,1.00],[-2.40,1.06],[-2.1,1.12],[-1.75,1.16],[-1.45,1.19],[-1.0,1.50],[-.6,1.70],[-.25,1.785],[.0,1.805],[.5,1.815],[1.5,1.812],[2.0,1.805],[2.18,1.795],[2.30,1.72],[2.395,1.46],[2.43,1.26],[2.4575,1.00]];
 for(let i=0;i<P.length-1;i++){if(z>=P[i][0]&&z<=P[i+1][0]){let t=(z-P[i][0])/(P[i+1][0]-P[i][0]);t=t*t*(3-2*t)*.35+t*.65;return P[i][1]+(P[i+1][1]-P[i][1])*t}}
 return 1};
__ELG.belt=function(z){return Math.min(1.10,__ELG.top(z))};
__ELG.halfW=function(z){let a=Math.abs(z),k=Math.max(0,(a-1.95)/.5075);return __ELG.WM*(1-.14*k*k*k)};
__ELG.section=function(z){
 const Wm=__ELG.halfW(z),T=__ELG.top(z),B=__ELG.belt(z),yb=Math.abs(z)>2.25?.27:.22,gh=Math.max(0,T-B);
 const cl=y=>Math.min(T,y),g4=Math.min(1,gh/.5),Wg=Wm*.935,Wr=Wm*.80;
 const k=[[0,yb],[Wm*.62,yb],[Wm*.9,yb+.04],[Wm*.985,yb+.17],[Wm,.62],[Wm*.998,cl(B*.74)],[Wm*.985,cl(B-.03)],
  [Wg,cl(B+.012)],[Wg-.012*g4,cl(B+gh*.16)],[__elgLerp(Wg,Wr,.55),cl(B+gh*.55)],[Wr+.02*g4,cl(T-.10*g4)],[Wr-.05*g4,cl(T-.035*g4)],[Wr-.2,cl(T-.005)],[Wr*.45,T],[0,T]];
 let pts=k.map(p=>[p[0],p[1]]);
 for(let it=0;it<3;it++){let q=[pts[0]];for(let i=0;i<pts.length-1;i++){let a=pts[i],b=pts[i+1];q.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75])}q.push(pts[pts.length-1]);pts=q}
 return pts};
__ELG.arch=function(x,y,z){let best=0;[-1,1].forEach(s=>{let dz=z-s*__ELG.ZW,dy=y-__ELG.RW,r=Math.sqrt(dz*dz+dy*dy);if(Math.abs(x)>.5){let t=Math.min(1,Math.max(0,(.43-r)/.06));t=t*t*(3-2*t);best=Math.max(best,t)}});return best};
__ELG.sidePt=function(z,y,sd){const s=__ELG.section(z);for(let i=1;i<s.length;i++){if(s[i][1]>=y&&s[i][0]>.4){let a=s[i-1],b=s[i],t=(y-a[1])/Math.max(1e-6,b[1]-a[1]);return[(sd||1)*(a[0]+(b[0]-a[0])*t),y,z]}}return[(sd||1)*s[s.length-1][0],y,z]};
/* window regions */
__ELG.win=function(x,y,z){
 const ax=Math.abs(x),T=__ELG.top(z),edge=T-.085,B=1.13;
 if(z>-1.40&&z<-.30&&ax<.70&&y>B&&y>T-.62)return 'ws';
 if(ax>.70&&y>B+.02&&y<edge-.03){
  const zap=-1.22+(y-B)*.5;
  if(z>zap&&z<-.06)return 'f';
  if(z>.07&&z<1.10)return 'r';
  if(z>1.24&&z<1.95&&y>B+.02+Math.max(0,(z-1.6))*.0&&y<edge-.05)return 'q'}
 if(z>2.28&&ax<.74&&y>1.27&&y>T-.5)return 'bw';
 return null};
