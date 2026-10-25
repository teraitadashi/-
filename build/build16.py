import base64
s=open('app15.js').read()
mdx=open('harness/mdx_core.js').read()
m64=base64.b64encode(open('mdx_img.webp','rb').read()).decode()
dome=open('harness/dome_core.js').read()
b64=base64.b64encode(open('dome_img.webp','rb').read()).decode()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:60],s.count(a))
    s=s.replace(a,b)
# 1 image + model code
i=s.index("const __imgCar=");e=s.index("\n",i)
s=s[:e+1]+"const __imgDome=`data:image/webp;base64,"+b64+"`;\nconst __imgMdx=`data:image/webp;base64,"+m64+"`;\n"+s[e+1:]
i=s.index("function __tent(");s=s[:i]+dome+"\n"+mdx+"\n"+s[i:]
# 2 preset
pre=("{id:`my-coleman-touring-dome-air-lx`,name:`コールマン ツーリングドームエアー/LX+ DARKROOM (型番: 2000039085)`,manufacturer:`コールマン (Coleman)`,productName:`ツーリングドームエアー/LX+ DARKROOM`,modelNumber:`2000039085`,category:`tent`,shapeType:`tent_dome`,width:2.1,depth:3.35,height:1.22,ropeMargin:.9,color:`#e3e7ec`,"
"description:`本体(使用時): 約210×335×122(h)cm。インナー: 約210×180×114(h)cm（2〜3人用）。重量約5.9kg、収納 約Φ21×49cm。クロスフレーム構造のドーム型で、前室・後室、前面パネルを跳ね上げるキャノピー、クリアルーフウィンドウ、ワイドエアメッシュ、ストームガード付き。ダークルームテクノロジーで日中でもインナーが暗く、遮熱性も高いモデルです。耐水圧: フライ約3,000mm / フロア約1,500mm。`,"
"capacity:`2〜3人用`,innerDimensions:{width:2.1,depth:1.8,height:1.14},packedSize:`約Φ21 × 49 cm`,weight:`約5.9 kg`,imageUrl:__imgDome,isMyGear:!0},")
rep("imageUrl:__img0,isMyGear:!0},","imageUrl:__img0,isMyGear:!0},"+pre)
# 3 3D hook
rep("}else if(e.presetId===`my-coleman-roomy-front-2room`||e.name.includes(`ルーミーフロント`)||e.category===`tent`&&e.shapeType===`tent_tunnel`){__tent(",
    "}else if(e.presetId===`my-coleman-touring-dome-air-lx`||e.name.includes(`ツーリングドーム`)||e.shapeType===`tent_dome`){__dome(s,e,{},p.current)}else if(e.presetId===`my-coleman-roomy-front-2room`||e.name.includes(`ルーミーフロント`)||e.category===`tent`&&e.shapeType===`tent_tunnel`){__tent(")
# 4 2D
J2=r"""n.name.includes(`ツーリングドーム`)||n.shapeType===`tent_dome`?(()=>{let yR=-u/2,yF=yR+2.575*l,yT=u/2,VX=1.12*l,VD=.26*l,hw=c/2,iy=yR+.55*l,ih=1.8*l,Ln=(a,b,k,m,st,w,da)=>(0,U.jsx)(`line`,{x1:a,y1:b,x2:k,y2:m,stroke:st,strokeWidth:w,strokeDasharray:da}),Dot=(a,b,rr,f)=>(0,U.jsx)(`circle`,{cx:a,cy:b,r:rr,fill:f,stroke:`#ffffff`,strokeWidth:`1`});
return(0,U.jsxs)(`g`,{children:[
(0,U.jsx)(`path`,{d:`M ${-hw} ${yF} L ${-VX} ${yT} Q 0 ${yT-2*VD} ${VX} ${yT} L ${hw} ${yF} Z`,fill:`#eef2f6`,fillOpacity:.88,stroke:`#8b95a1`,strokeWidth:`1.2`,strokeDasharray:`4 2`}),
(0,U.jsx)(`path`,{d:`M ${-hw} ${yF} L ${-hw} ${yR+.75*l} Q ${-hw} ${yR} 0 ${yR} Q ${hw} ${yR} ${hw} ${yR+.75*l} L ${hw} ${yF} Z`,fill:`#e3e7ec`,fillOpacity:.97,stroke:d,strokeWidth:r?3.5:2}),
(0,U.jsx)(`rect`,{x:-hw+.05*l,y:iy,width:c-.1*l,height:ih,rx:6,fill:`#1b1e23`,fillOpacity:.88,stroke:`rgba(255,255,255,0.55)`,strokeWidth:`1.3`,strokeDasharray:`4 2`}),
...[-.64,0,.64].map((m,k)=>(0,U.jsxs)(`g`,{opacity:.92,children:[(0,U.jsx)(`rect`,{x:m*l-.29*l,y:iy+.1*l,width:.58*l,height:1.62*l,rx:3,fill:`#3a4350`,stroke:`#64748b`,strokeWidth:`0.8`}),(0,U.jsx)(`rect`,{x:m*l-.15*l,y:iy+.14*l,width:.3*l,height:.18*l,rx:2,fill:`#cbd5e1`})]},k)),
Ln(-hw,yR+.475*l,hw,yR+2.395*l,`#94a3b8`,2,`6 3`),Ln(hw,yR+.475*l,-hw,yR+2.395*l,`#94a3b8`,2,`6 3`),
Ln(-hw,yF,hw,yF,`#18181b`,3.5),Dot(-hw,yF,3,`#cbd5e1`),Dot(hw,yF,3,`#cbd5e1`),
Ln(-hw,yR+.9*l,-hw,yF,`#d11a2a`,2),Ln(hw,yR+.9*l,hw,yF,`#d11a2a`,2),
...[-1,1].flatMap((sd,k)=>[Ln(sd*hw,yR+.8*l,sd*(hw+.85*l),yR+.8*l-.1*l,`#ffffff`,1.3,`2 2`),Dot(sd*(hw+.85*l),yR+.8*l-.1*l,3,`#eab308`),Ln(sd*hw,yR+2.2*l,sd*(hw+.8*l),yR+2.3*l,`#ffffff`,1.3,`2 2`),Dot(sd*(hw+.8*l),yR+2.3*l,3,`#eab308`),Dot(sd*VX,yT,4.5,`#18181b`),Ln(sd*VX,yT,sd*(VX+.55*l),yT+.65*l,`#ffffff`,1.3,`2 2`),Dot(sd*(VX+.55*l),yT+.65*l,3,`#eab308`)]),
Ln(0,yR,0,yR-.75*l,`#ffffff`,1.3,`2 2`),Dot(0,yR-.75*l,3,`#eab308`),
Dot(0,yT-VD,3.5,`#f4f5f4`),
(0,U.jsx)(`rect`,{x:-.19*l,y:yR+.3*l,width:.38*l,height:.1*l,rx:3,fill:`#d11a2a`,opacity:.9})]})})():"""
J2=J2.replace("\n","")
a="n.name.includes(`ルーミーフロント`)||n.shapeType===`tent_tunnel`?(0,U.jsxs)(`g`,{children:[(0,U.jsx)(`rect`,{x:-c/2,y:-u/2,width:c,height:u,rx:8,"
rep(a,J2+a)
# 5 label
rep("fontWeight:`bold`,letterSpacing:`0.04em`,children:`ルーミーフロント2ルーム`})","fontWeight:`bold`,letterSpacing:`0.04em`,children:n.name.includes(`ツーリングドーム`)?`ツーリングドームエアー LX+`:`ルーミーフロント2ルーム`})")

pre2=("{id:`my-coleman-toughscreen-2room-air-mdx`,name:`コールマン タフスクリーン2ルームエアー/MDX+ DARKROOM (型番: 2000039084)`,manufacturer:`コールマン (Coleman)`,productName:`タフスクリーン2ルームエアー/MDX+ DARKROOM`,modelNumber:`2000039084`,category:`tent`,shapeType:`tent_2room`,width:3.4,depth:5.6,height:2.15,ropeMargin:1,color:`#e3e7ec`,"
"description:`使用時サイズ: 約560×340×215(h)cm。寝室インナー: 約300×250×175(h)cm（4〜5人用）。リビング: 奥行約310cm・最大高215cm。重量約19.5kg、収納 約Φ34×74cm。クロスフレームのトンネル型2ルームで、大型メッシュのサイドドア・フロントパネル、前面キャノピー（キャノピーポール2本付属）、取り外し可能なダークルームルーフフライ、ストームガード、ランタンフックを装備。耐水圧: フライ 寝室約3,000mm・リビング約2,000mm / フロア約2,000mm。`,"
"capacity:`4〜5人用`,innerDimensions:{width:3,depth:2.5,height:1.75},livingDimensions:{width:3.4,depth:3.1,height:2.15},packedSize:`約Φ34 × 74 cm`,weight:`約19.5 kg`,imageUrl:__imgMdx,isMyGear:!0},")
rep("{id:`my-coleman-touring-dome-air-lx`,name:","%s{id:`my-coleman-touring-dome-air-lx`,name:"%pre2)
rep("}else if(e.presetId===`my-coleman-touring-dome-air-lx`","}else if(e.presetId===`my-coleman-toughscreen-2room-air-mdx`||e.name.includes(`タフスクリーン`)||e.shapeType===`tent_2room`){__mdx(s,e,{},p.current)}else if(e.presetId===`my-coleman-touring-dome-air-lx`")
M2=r"""n.name.includes(`タフスクリーン`)||n.shapeType===`tent_2room`?(()=>{let yR=-u/2,yF=u/2,hw=c/2,iy=yR+.18*l,Ln=(a,b,k,m,st,w,da)=>(0,U.jsx)(`line`,{x1:a,y1:b,x2:k,y2:m,stroke:st,strokeWidth:w,strokeDasharray:da}),Dot=(a,b,rr,f)=>(0,U.jsx)(`circle`,{cx:a,cy:b,r:rr,fill:f,stroke:`#ffffff`,strokeWidth:`1`});
return(0,U.jsxs)(`g`,{children:[
(0,U.jsx)(`rect`,{x:-1.6*l,y:yF,width:3.2*l,height:1.9*l,fill:`#eef2f6`,fillOpacity:.8,stroke:`#8b95a1`,strokeWidth:`1.2`,strokeDasharray:`4 2`}),
(0,U.jsx)(`rect`,{x:-hw,y:yR,width:c,height:u,rx:12,fill:`#e3e7ec`,fillOpacity:.97,stroke:d,strokeWidth:r?3.5:2}),
(0,U.jsx)(`rect`,{x:-hw+.1*l,y:yR+2.78*l,width:c-.2*l,height:2.4*l,rx:6,fill:`#aab2bb`,fillOpacity:.35}),
(0,U.jsx)(`rect`,{x:-1.5*l,y:iy,width:3*l,height:2.5*l,rx:6,fill:`#1b1e23`,fillOpacity:.88,stroke:`rgba(255,255,255,0.55)`,strokeWidth:`1.3`,strokeDasharray:`4 2`}),
...[-1.05,-.35,.35,1.05].map((m,k)=>(0,U.jsxs)(`g`,{opacity:.92,children:[(0,U.jsx)(`rect`,{x:m*l-.31*l,y:iy+.1*l,width:.62*l,height:2*l,rx:3,fill:`#47505e`,stroke:`#64748b`,strokeWidth:`0.8`}),(0,U.jsx)(`rect`,{x:m*l-.19*l,y:iy+.14*l,width:.38*l,height:.2*l,rx:2,fill:`#cbd5e1`})]},k)),
Ln(-hw,yR+2.78*l,hw,yR+2.78*l,`#d11a2a`,1.6),
Ln(-hw,yR+2.8*l,-hw,yR+5.22*l,`#475569`,4,`5 3`),Ln(hw,yR+2.8*l,hw,yR+5.22*l,`#475569`,4,`5 3`),
Ln(-1.5*l,yF,1.5*l,yF,`#475569`,4,`4 2`),Ln(-.75*l,yR,.75*l,yR,`#475569`,4),
...[-1,1].flatMap((sd,k)=>[.45,1.6,3.0,4.4,5.3].flatMap((t,m)=>[Ln(sd*hw,yR+t*l,sd*(hw+.9*l),yR+t*l+(t>5?.15:0)*l,`#ffffff`,1.2,`2 2`),Dot(sd*(hw+.9*l),yR+t*l+(t>5?.15:0)*l,2.8,`#eab308`)]).concat([Dot(sd*1.6*l,yF+1.9*l,4.5,`#18181b`),Ln(sd*1.6*l,yF+1.9*l,sd*(1.6+.85)*l,yF+2.9*l,`#ffffff`,1.3,`2 2`),Dot(sd*(1.6+.85)*l,yF+2.9*l,3,`#eab308`)])),
(0,U.jsx)(`rect`,{x:-.2*l,y:yF-.45*l,width:.4*l,height:.1*l,rx:3,fill:`#d11a2a`,opacity:.9})]})})():"""
M2=M2.replace("\n","")
a2="n.name.includes(`ツーリングドーム`)||n.shapeType===`tent_dome`?(()=>{"
rep(a2,M2+a2)
rep("children:n.name.includes(`ツーリングドーム`)?`ツーリングドームエアー LX+`:`ルーミーフロント2ルーム`})","children:n.name.includes(`ツーリングドーム`)?`ツーリングドームエアー LX+`:n.name.includes(`タフスクリーン`)?`タフスクリーン MDX+`:`ルーミーフロント2ルーム`})")

open('app17.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app16.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built',len(s))
