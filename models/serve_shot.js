const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root='/home/claude/harness';
const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,d)=>{if(e){r.statusCode=404;r.end();return}r.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.html')?'text/html':'application/octet-stream');r.end(d)})}).listen(8123);
(async()=>{
 const views=JSON.parse(process.argv[2]||'[[40,8,9.5]]');const tag=process.argv[3]||'h';
 const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
 const p=await b.newPage({viewport:{width:1000,height:440}});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CON',m.text().slice(0,300))});
 await p.goto('http://localhost:8123/'+(process.argv[4]||''));
 await p.waitForFunction('window.ready===true',{timeout:60000});
 for(let i=0;i<views.length;i++){await p.evaluate(v=>window.shot(...v),views[i]);await p.waitForTimeout(300);await p.locator('#c').screenshot({path:`/home/claude/${tag}_${i}.png`})}
 await b.close();srv.close();
})();
