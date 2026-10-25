s=open('app25.js').read()
new=open('harness/extra_core.js').read()
i=s.index("function __loftSE(");j=s.index("function __logoTex(")
a=new.index("function __loftSE(");b=new.index("function __logoTex(")
s=s[:i]+new[a:b]+s[j:]
open('app26.js','w').write(s)
h=open('/mnt/user-data/outputs/mio_camp_simulator.html').read();o=open('app25.js').read()
i0=h.index(o[:300]);i1=h.index(o[-300:])+300
assert h[i0:i1]==o
open('/mnt/user-data/outputs/mio_camp_simulator.html','w').write(h[:i0]+s+h[i1:])
print('built')
