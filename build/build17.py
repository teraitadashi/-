import base64
s=open('app17.js').read()
mdx=open('harness/mdx_core.js').read()
m64=base64.b64encode(open('mdx_img.webp','rb').read()).decode()
dome=open('harness/dome_core.js').read()
b64=base64.b64encode(open('dome_img.webp','rb').read()).decode()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:60],s.count(a))
    s=s.replace(a,b)

hexa=open('harness/hexa_core.js').read()
h64=base64.b64encode(open('hexa_img.webp','rb').read()).decode()
i=s.index("const __imgCar=");e=s.index("\n",i)
s=s[:e+1]+"const __imgHexa=`data:image/webp;base64,"+h64+"`;\n"+s[e+1:]
i=s.index("function __tent(");s=s[:i]+hexa+"\n"+s[i:]
pre=("{id:`my-coleman-hexalite-plus`,name:`コールマン ヘキサライト+ (型番: 2000039093)`,manufacturer:`コールマン (Coleman)`,productName:`ヘキサライト+`,modelNumber:`2000039093`,category:`tarp`,shapeType:`tarp_hexa`,width:4.2,depth:4.2,height:2.2,ropeMargin:1.2,color:`#c3cddd`,"
"description:`使用時サイズ: 約420×420×220(h)cm。重量約4.6kg、収納 約Φ17×44cm。ポールはスチール約Φ25mm（6本継ぎ）。ダークルームテクノロジー・UVPRO加工の75Dポリエステルタフタで、遮光・遮熱性が高いヘキサ（六角形）タープ。耐水圧約3,000mm、ランタンフック1か所。ペグ・ロープ・収納ケース付き。`,"
"packedSize:`約Φ17 × 44 cm`,weight:`約4.6 kg`,imageUrl:__imgHexa,isMyGear:!0},")
rep("{id:`my-coleman-toughscreen-2room-air-mdx`,name:",pre+"{id:`my-coleman-toughscreen-2room-air-mdx`,name:")
rep("}else if(e.presetId===`my-coleman-toughscreen-2room-air-mdx`","}else if(e.presetId===`my-coleman-hexalite-plus`||e.name.includes(`ヘキサライト`)||e.shapeType===`tarp_hexa`){__hexa(s,e,{},p.current)}else if(e.presetId===`my-coleman-toughscreen-2room-air-mdx`")
H2=r"""n.name.includes(`ヘキサライト`)||n.shapeType===`tarp_hexa`?(()=>{let hx=c/2,hz=u/2,cx=.7*hx,sg=.3*l,P=[[-hx,0],[-cx,-hz],[cx,-hz],[hx,0],[cx,hz],[-cx,hz]],Q2=(A,B)=>{let mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2,dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;if(nx*(0-mx)+ny*(0-my)<0){nx=-nx;ny=-ny}return[mx+nx*2*sg,my+ny*2*sg]},dd=`M ${P[0][0]} ${P[0][1]}`;
for(let k=0;k<6;k++){let A=P[k],B=P[(k+1)%6],C=Q2(A,B);dd+=` Q ${C[0]} ${C[1]} ${B[0]} ${B[1]}`}dd+=` Z`;
let Ln=(a,b,k,m,st,w,da)=>(0,U.jsx)(`line`,{x1:a,y1:b,x2:k,y2:m,stroke:st,strokeWidth:w,strokeDasharray:da}),Dot=(a,b,rr,f)=>(0,U.jsx)(`circle`,{cx:a,cy:b,r:rr,fill:f,stroke:`#ffffff`,strokeWidth:`1`}),Re=(n.ropeMargin||1.2)*l;
return(0,U.jsxs)(`g`,{children:[
(0,U.jsx)(`path`,{d:dd,fill:`#c3cddd`,fillOpacity:.82,stroke:`#c1121f`,strokeWidth:r?3.5:2}),
Ln(-hx,0,hx,0,`#ffffff`,1.2,`6 3`),
(0,U.jsx)(`rect`,{x:-.28*l,y:-.07*l,width:.56*l,height:.14*l,rx:3,fill:`#d11a2a`,opacity:.9}),
...[[-1,-1],[1,-1],[1,1],[-1,1]].flatMap(([sx,sz],k)=>[Ln(sx*cx,sz*hz,sx*(cx+Re*.85),sz*(hz+Re*.95),`#ffffff`,1.3,`2 2`),Dot(sx*(cx+Re*.85),sz*(hz+Re*.95),3,`#eab308`)]),
...[-1,1].flatMap((sd,k)=>[Ln(sd*hx,0,sd*(hx+Re*1.25),0,`#ffffff`,1.3,`2 2`),Dot(sd*(hx+Re*1.25),0,3,`#eab308`),Dot(sd*hx,0,5.5,`#18181b`)])]})})():"""
H2=H2.replace("\n","")
a2="n.name.includes(`タフスクリーン`)||n.shapeType===`tent_2room`?(()=>{"
rep(a2,H2+a2)
open('app18.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app17.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built',len(s))
