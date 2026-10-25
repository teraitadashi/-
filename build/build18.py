import base64
s=open('app18.js').read()
mdx=open('harness/mdx_core.js').read()
m64=base64.b64encode(open('mdx_img.webp','rb').read()).decode()
dome=open('harness/dome_core.js').read()
b64=base64.b64encode(open('dome_img.webp','rb').read()).decode()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:60],s.count(a))
    s=s.replace(a,b)

hexa=open('harness/shade_core.js').read()
h64=base64.b64encode(open('shade_img.webp','rb').read()).decode()
i=s.index("const __imgCar=");e=s.index("\n",i)
s=s[:e+1]+"const __imgShade=`data:image/webp;base64,"+h64+"`;\n"+s[e+1:]
i=s.index("function __tent(");s=s[:i]+hexa+"\n"+s[i:]
pre=("{id:`my-coleman-instant-visor-shade-250p`,name:`コールマン インスタントバイザーシェード/250+ (型番: 2000038404)`,manufacturer:`コールマン (Coleman)`,productName:`インスタントバイザーシェード/250+`,modelNumber:`2000038404`,category:`tarp`,shapeType:`tarp_shade`,width:2.5,depth:2.5,height:2.5,ropeMargin:.9,color:`#bcc7d8`,"
"description:`シェード約250×250×250(h)cm、フレーム約205×205cm。脚の高さは3段階で調整可能。重量約12kg、収納 約Φ19×90cm。フレームにルーフフライを掛けるだけのワンタッチ設営で、ダークルームテクノロジー・UVPRO加工の75Dポリエステルタフタ（耐水圧約3,000mm）。フレームはスチール。ペグ・ロープ・収納ケース付き。別売のフルフラップで横からの日差しや風も防げます。`,"
"packedSize:`約Φ19 × 90 cm`,weight:`約12 kg`,imageUrl:__imgShade,isMyGear:!0},")
rep("{id:`my-coleman-hexalite-plus`,name:",pre+"{id:`my-coleman-hexalite-plus`,name:")
rep("}else if(e.presetId===`my-coleman-hexalite-plus`","}else if(e.presetId===`my-coleman-instant-visor-shade-250p`||e.name.includes(`インスタントバイザーシェード`)||e.shapeType===`tarp_shade`){__shade(s,e,{},p.current)}else if(e.presetId===`my-coleman-hexalite-plus`")
H2=r"""n.name.includes(`インスタントバイザーシェード`)||n.shapeType===`tarp_shade`?(()=>{let hw=c/2,lw=LW_*l,Ln=(a,b,k,m,st,w,da)=>(0,U.jsx)(`line`,{x1:a,y1:b,x2:k,y2:m,stroke:st,strokeWidth:w,strokeDasharray:da}),Dot=(a,b,rr,f)=>(0,U.jsx)(`circle`,{cx:a,cy:b,r:rr,fill:f,stroke:`#ffffff`,strokeWidth:`1`}),Re=(n.ropeMargin||.9)*l;
return(0,U.jsxs)(`g`,{children:[
(0,U.jsx)(`rect`,{x:-hw,y:-u/2,width:c,height:u,fill:`#bcc7d8`,fillOpacity:.84,stroke:`#c1121f`,strokeWidth:r?3.5:2}),
Ln(-hw,-u/2,hw,u/2,`#a3afc2`,1.4),Ln(hw,-u/2,-hw,u/2,`#a3afc2`,1.4),
(0,U.jsx)(`rect`,{x:-lw-3,y:-lw-3,width:2*lw+6,height:2*lw+6,fill:`none`,stroke:`#475569`,strokeWidth:`1`,strokeDasharray:`4 3`,opacity:.6}),
...[[-1,-1],[1,-1],[1,1],[-1,1]].flatMap(([sx,sz])=>[Dot(sx*lw,sz*lw,4.5,`#18181b`),Ln(sx*hw,sz*u/2,sx*(hw+Re*.9),sz*(u/2+Re*.9),`#ffffff`,1.3,`2 2`),Dot(sx*(hw+Re*.9),sz*(u/2+Re*.9),3,`#eab308`)]),
(0,U.jsx)(`rect`,{x:-.2*l,y:-.07*l,width:.4*l,height:.14*l,rx:3,fill:`#d11a2a`,opacity:.9})]})})():""".replace("LW_","1.025")
H2=H2.replace("\n","")
a2="n.name.includes(`ヘキサライト`)||n.shapeType===`tarp_hexa`?(()=>{"
rep(a2,H2+a2)
open('app19.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app18.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built',len(s))
