# 見本 (のかみふれあい全体・煙樹ヶ浜・遠井) にインフィニティチェアを入れる (4割の区画・グループ、リクライニングはランダム)
import subprocess
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
b = a
for f in ['models/samples2_core.js', 'models/nksample_core.js']:
    old = subprocess.check_output(['git', 'show', 'HEAD:' + f], text=True).strip()
    new = open(f).read().strip()
    if f.endswith('nksample_core.js'):
        # app 内には関数本体だけが入っている
        old = old[old.find('function __nkSample(){'):]
        new = new[new.find('function __nkSample(){'):]
    assert b.count(old) == 1, f
    b = b.replace(old, new)
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
