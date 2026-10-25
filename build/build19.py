import base64
s=open('app19.js').read()
mdx=open('harness/mdx_core.js').read()
m64=base64.b64encode(open('mdx_img.webp','rb').read()).decode()
dome=open('harness/dome_core.js').read()
b64=base64.b64encode(open('dome_img.webp','rb').read()).decode()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:60],s.count(a))
    s=s.replace(a,b)

hexa=open('harness/wagon_core.js').read()
h64=base64.b64encode(open('wagon_img.webp','rb').read()).decode()
i=s.index("const __imgCar=");e=s.index("\n",i)
s=s[:e+1]+"const __imgWagon=`data:image/webp;base64,"+h64+"`;\n"+s[e+1:]
i=s.index("function __tent(");s=s[:i]+hexa+"\n"+s[i:]
pre=("{id:`my-coleman-outdoor-wagon-nx`,name:`コールマン アウトドアワゴンNX (レッド / プッシュハンドル付き)`,manufacturer:`コールマン (Coleman)`,productName:`アウトドアワゴンNX (レッド)`,modelNumber:`2230842`,category:`furniture`,shapeType:`furn_wagon`,width:.51,depth:1.04,height:.98,ropeMargin:0,color:`#b3261e`,"
"description:`使用時サイズ: 約104×51×98(h)cm（荷台 約83×42×33(h)cm）。収納時 約26×40×62(h)cm、重量約9.3kg、耐荷重約100kg。シートはポリエステル、フレームはスチール。ストッパー付きタイヤで、フック付きラバーバンドと収納ケース付き。モデルは後方にアウトドアワゴンプッシュハンドル(2238319)を装着した状態です。`,"
"packedSize:`約26 × 40 × 62(h) cm`,weight:`約9.3 kg`,imageUrl:__imgWagon,isMyGear:!0},"
"{id:`my-coleman-outdoor-wagon-table`,name:`コールマン アウトドアワゴンテーブル (型番: 2244020)`,manufacturer:`コールマン (Coleman)`,productName:`アウトドアワゴンテーブル`,modelNumber:`2244020`,category:`furniture`,shapeType:`furn_table`,width:.98,depth:.53,height:.24,ropeMargin:0,color:`#b48a5c`,"
"description:`使用時サイズ: 約98×53×24(h)cm、収納時 約53×7×50cm、重量約2.9kg、耐荷重約30kg。フレームはアルミニウム、天板はメラミン加工合板。アウトドアワゴンの天板として装着でき、脚を出せば単体のローテーブルとしても使えます。`,"
"packedSize:`約53 × 7 × 50 cm`,weight:`約2.9 kg`,isMyGear:!0},")
rep("{id:`my-coleman-instant-visor-shade-250p`,name:",pre+"{id:`my-coleman-instant-visor-shade-250p`,name:")
rep("}else if(e.presetId===`my-coleman-instant-visor-shade-250p`","}else if(e.presetId===`my-coleman-outdoor-wagon-nx`||e.name.includes(`アウトドアワゴンNX`)||e.shapeType===`furn_wagon`){__wagon(s,e,{},p.current)}else if(e.presetId===`my-coleman-instant-visor-shade-250p`")
H2=r"""n.name.includes(`アウトドアワゴンNX`)||n.shapeType===`furn_wagon`?(()=>{let bw=.21*l,bl=.415*l,Ln=(a,b,k,m,st,w,da)=>(0,U.jsx)(`line`,{x1:a,y1:b,x2:k,y2:m,stroke:st,strokeWidth:w,strokeDasharray:da}),zz=[];
for(let sd of[-1,1])for(let i=0;i<7;i++){let z0=-bl+.03*l+i*(2*bl-.06*l)/7,z1=z0+(2*bl-.06*l)/7;zz.push(Ln(sd*bw,z0,sd*bw,z1,`#e0533f`,1));}
return(0,U.jsxs)(`g`,{children:[
(0,U.jsx)(`path`,{d:`M ${-bw} ${-bl} Q ${-bw-.01*l} ${-bl-.12*l} ${-.15*l} ${-bl-.105*l} L ${.15*l} ${-bl-.105*l} Q ${bw+.01*l} ${-bl-.12*l} ${bw} ${-bl}`,fill:`none`,stroke:`#17191c`,strokeWidth:`3`,strokeLinecap:`round`}),
...[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx,sz],k)=>(0,U.jsx)(`rect`,{x:sx*.225*l-.03*l,y:sz*.31*l-.095*l,width:.06*l,height:.19*l,rx:3,fill:`#17191c`},k)),
(0,U.jsx)(`rect`,{x:-bw,y:-bl,width:2*bw,height:2*bl,rx:3,fill:`#b3261e`,stroke:d,strokeWidth:r?3.5:2}),
(0,U.jsx)(`rect`,{x:-bw+.03*l,y:-bl+.03*l,width:2*bw-.06*l,height:2*bl-.06*l,rx:2,fill:`#7d1a15`,fillOpacity:.8}),
(0,U.jsx)(`rect`,{x:-bw,y:-bl,width:2*bw,height:2*bl,rx:3,fill:`none`,stroke:`#17191c`,strokeWidth:`2`}),
...zz,
(0,U.jsx)(`circle`,{cx:0,cy:bl-.015*l,r:4,fill:`#17191c`,stroke:`#d93a2c`,strokeWidth:`1.5`})]})})():"""
H2=H2.replace("\n","")
a2="n.name.includes(`インスタントバイザーシェード`)||n.shapeType===`tarp_shade`?(()=>{"
rep(a2,H2+a2)
open('app20.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app19.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built',len(s))
