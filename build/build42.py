# 遠井の見本: 芝生サイトの車を駐車場の枠 (白線の間) に、通路側に頭を向けて停める
import subprocess
a = open('build/app26.js').read()
h = open('mio_camp_simulator.html').read()
assert h.count(a) == 1
old = subprocess.check_output(['git', 'show', 'HEAD:models/samples2_core.js'], text=True).strip()
new = open('models/samples2_core.js').read().strip()
assert a.count(old) == 1
b = a.replace(old, new)
open('build/app26.js', 'w').write(b)
open('mio_camp_simulator.html', 'w').write(h.replace(a, b))
print('ok', len(b) - len(a))
