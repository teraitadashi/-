import base64
s=open('app20.js').read()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:60],s.count(a))
    s=s.replace(a,b)
H='harness/'
core=''.join(open(H+f).read()+'\n' for f in ['elg_body.js','elg_loft.js','elg_parts.js','elg_parts2.js','elg_main.js'])
b64=base64.b64encode(open('elg_img.webp','rb').read()).decode()
i=s.index("const __imgCar=");e=s.index("\n",i)
s=s[:e+1]+"const __imgElg=`data:image/webp;base64,"+b64+"`;\n"+s[e+1:]
i=s.index("function __tent(");s=s[:i]+core+"\n"+s[i:]
pre=("{id:`my-nissan-elgrand-e52`,name:`日産 エルグランド E52 ハイウェイスター (ホワイトパール)`,manufacturer:`日産 (Nissan)`,productName:`エルグランド ハイウェイスター`,modelNumber:`E52 (TE52)`,category:`vehicle`,shapeType:`vehicle_minivan`,width:1.85,depth:4.915,height:1.815,ropeMargin:0,color:`#f4f4f1`,"
"description:`日産 エルグランド E52 ハイウェイスター（前期・ホワイトパール）。全長4,915×全幅1,850×全高1,815mm、ホイールベース3,000mm、トレッド前後1,600mm、最低地上高150mm。タイヤ225/55R18、車両重量約1,920kg(250HS 2WD 7人乗)、最小回転半径5.7m。両側スライドドアの大型ミニバン。※後期型は全長が最大60mm長くなります。`,"
"capacity:`7〜8名乗り`,packedSize:`全長4,915 × 全幅1,850 × 全高1,815 mm`,weight:`約 1,920 kg`,imageUrl:__imgElg,isMyGear:!0},")
rep("{id:`my-suzuki-mrwagon`,",pre+"{id:`my-suzuki-mrwagon`,")
rep("e.name.includes(`MRワゴン`)){__mrwagon(s,e)}else if(","e.name.includes(`MRワゴン`)){__mrwagon(s,e)}else if(e.presetId===`my-nissan-elgrand-e52`||e.name.includes(`エルグランド`)){__elgrand(s,e)}else if(")
H2=r"""n.name.includes(`エルグランド`)?(()=>{const W=(x,z)=>(0,U.jsx)(`rect`,{x:x*l-.11*l,y:z*l-.34*l,width:`${.22*l}`,height:`${.68*l}`,rx:3,fill:`#202024`,opacity:.92},`w${x}${z}`);
return(0,U.jsxs)(`g`,{children:[W(-.8,-1.5),W(.8,-1.5),W(-.8,1.5),W(.8,1.5),
(0,U.jsx)(`rect`,{x:-c/2,y:-u/2,width:c,height:u,rx:.3*l,fill:`#f6f6f3`,fillOpacity:.98,stroke:d,strokeWidth:r?3.5:2}),
(0,U.jsx)(`path`,{d:`M ${-.74*l} ${-2.40*l} Q 0 ${-2.5*l} ${.74*l} ${-2.40*l} L ${.80*l} ${-1.15*l} L ${-.80*l} ${-1.15*l} Z`,fill:`#ebedee`,stroke:`#cfd4d8`,strokeWidth:`0.8`}),
(0,U.jsx)(`path`,{d:`M ${-.66*l} ${-1.10*l} L ${.66*l} ${-1.10*l} L ${.70*l} ${-.30*l} L ${-.70*l} ${-.30*l} Z`,fill:`#9fb6bb`,fillOpacity:.88,stroke:`#2b3236`,strokeWidth:`1.4`}),
(0,U.jsx)(`rect`,{x:-.74*l,y:-.28*l,width:1.48*l,height:2.5*l,rx:.14*l,fill:`#fbfbf9`,stroke:`#c9cfd3`,strokeWidth:`0.9`}),
(0,U.jsx)(`line`,{x1:0,y1:`${-.22*l}`,x2:0,y2:`${2.15*l}`,stroke:`#e5e8ea`,strokeWidth:`1`}),
(0,U.jsx)(`rect`,{x:-.62*l,y:2.0*l,width:1.24*l,height:.26*l,rx:.05*l,fill:`#e4e7e9`,stroke:`#b7bec3`,strokeWidth:`0.8`}),
(0,U.jsx)(`path`,{d:`M ${-.62*l} ${2.28*l} L ${.62*l} ${2.28*l} L ${.66*l} ${2.43*l} L ${-.66*l} ${2.43*l} Z`,fill:`#39434a`,fillOpacity:.9,stroke:`#1f2529`,strokeWidth:`1`}),
...[-1,1].flatMap(sd=>[(0,U.jsx)(`ellipse`,{cx:`${sd*1.0*l}`,cy:`${-.92*l}`,rx:`${.075*l}`,ry:`${.11*l}`,fill:`#ffffff`,stroke:`#9aa0a5`,strokeWidth:`1`},`m${sd}`),
(0,U.jsx)(`line`,{x1:`${sd*.925*l}`,y1:`${-.06*l}`,x2:`${sd*.80*l}`,y2:`${-.06*l}`,stroke:`#9aa0a5`,strokeWidth:`0.8`},`a${sd}`),
(0,U.jsx)(`line`,{x1:`${sd*.925*l}`,y1:`${1.18*l}`,x2:`${sd*.80*l}`,y2:`${1.18*l}`,stroke:`#9aa0a5`,strokeWidth:`0.8`},`b${sd}`),
(0,U.jsx)(`rect`,{x:`${(sd>0?.50:-.72)*l}`,y:`${-2.42*l}`,width:`${.22*l}`,height:`${.07*l}`,rx:`${.02*l}`,fill:`#d6e8ef`,stroke:`#8fa2aa`,strokeWidth:`0.8`},`h${sd}`),
(0,U.jsx)(`rect`,{x:`${(sd>0?.58:-.80)*l}`,y:`${2.38*l}`,width:`${.22*l}`,height:`${.05*l}`,rx:`${.015*l}`,fill:`#b3202c`,stroke:`#6e1219`,strokeWidth:`0.8`},`t${sd}`)]),
(0,U.jsx)(`path`,{d:`M ${-.09*l} ${-2.0*l} L 0 ${-2.14*l} L ${.09*l} ${-2.0*l} Z`,fill:`#64748b`,opacity:.55}),
(0,U.jsx)(`text`,{x:`0`,y:`${.9*l}`,textAnchor:`middle`,fill:`#64748b`,fontSize:`10`,fontWeight:`bold`,pointerEvents:`none`,children:`エルグランド`})]})})():"""
H2=H2.replace("\n","")
a2="n.name.includes(`MRワゴン`)?(0,U.jsxs)(`g`,{children:["
rep(a2,H2+a2)
open('app21.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app20.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built',len(s))
