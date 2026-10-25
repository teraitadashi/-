s=open('app23.js').read()
H='harness/'
core=''.join(open(H+f).read()+'\n' for f in ['elg_body.js','elg_loft.js','elg_parts.js','elg_parts2.js','elg_main.js'])
i=s.index("/* ===== Nissan Elgrand E52")
m="function __elgrand(G,it){"
j=s.index(m,i);j=s.index("\n",j)+1
s=s[:i]+core+s[j:]
open('app24.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app23.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built',len(s))
