# models/roomy_core.js の __tent を app26.js / HTML に差し替える
import re
a=open('build/app26.js').read(); h=open('mio_camp_simulator.html').read()
new=open('models/roomy_core.js').read().strip()
i=a.index('function __tent(');d=0;k=a.index('{',i)
while True:
    d+=(a[k]=='{')-(a[k]=='}')
    if d==0:break
    k+=1
a2=a[:i]+new+a[k+1:]
assert h.count(a)==1
open('build/app26.js','w').write(a2);open('mio_camp_simulator.html','w').write(h.replace(a,a2))
