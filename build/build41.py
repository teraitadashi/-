# 遠くのギアの簡易形を、積み木状 (ボクセル) から実際の3Dモデルを間引いた形に変更 (輪郭・色がはっきりする)
import subprocess
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
old4 = subprocess.check_output(['git', 'show', 'HEAD:models/perf4_core.js'], text=True).strip()
new4 = open('models/perf4_core.js').read().strip()
assert a.count(old4) == 1
b = a.replace(old4, new4)
# 簡易形でテント・タープを見分けるため、ギアの種類を持たせる
assert b.count('s.userData={itemId:e.id};') == 1
b = b.replace('s.userData={itemId:e.id};', 's.userData={itemId:e.id,cat:e.category};')
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
