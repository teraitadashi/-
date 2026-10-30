/* ===== レイアウト保存の容量対策 =====
   保存データに写真 (data:URI) を入れるとスマホのブラウザの保存上限 (約5MB) をすぐ超えて保存できなかった。
   保存時は写真を外し、読み込み時にギア・区画の一覧から写真を付け直す。保存に失敗したときは知らせる。 */
function __slim(o){if(!o||typeof o!=='object')return o;const r={};for(const k in o){const v=o[k];if(typeof v==='string'&&v.startsWith('data:'))continue;r[k]=v}return r}
function __slimLayout(site,items){return{site:__slim(site),items:(items||[]).map(__slim)}}
function __fatLayout(site,items){const cat=[...y,...__CBR,...__C26,...__CPOP],S=b.find(x=>x.name===site.name);
 return{site:S&&S.imageUrl&&!site.imageUrl?{...site,imageUrl:S.imageUrl}:site,
  items:(items||[]).map(it=>{if(it.imageUrl)return it;const p=cat.find(g=>g.id===it.presetId)||cat.find(g=>g.name===it.name);return p&&p.imageUrl?{...it,imageUrl:p.imageUrl}:it})}}
function __saveLS(key,val){try{localStorage.setItem(key,JSON.stringify(val));return!0}catch(e){alert('保存できませんでした。端末の保存容量がいっぱいか、この開き方では保存が使えません。\n(ファイルアプリのプレビューではなく Safari で開くか、不要なレイアウトを削除してください)');return!1}}
/* テキストでのバックアップ (Koder などのアプリ内ブラウザでは保存データが残らないことがあるため) */
function __copyText(t){const done=()=>alert('コピーしました。メモアプリなどに貼り付けて保管してください。');
 const fb=()=>{const ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.focus();ta.select();ta.setSelectionRange(0,t.length);let ok=!1;try{ok=document.execCommand('copy')}catch{}ta.remove();ok?done():prompt('自動コピーできませんでした。下の文字をすべて選択してコピーしてください。',t)};
 try{navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(done,fb):fb()}catch{fb()}}
function __exportLayouts(list){return 'MIOCAMP1:'+btoa(unescape(encodeURIComponent(JSON.stringify(list))))}
function __importLayouts(txt,cur){const s=(txt||'').trim().replace(/^MIOCAMP1:/,'');let v;try{v=JSON.parse(decodeURIComponent(escape(atob(s))))}catch{try{v=JSON.parse(txt)}catch{return null}}
 if(!Array.isArray(v))v=[v];v=v.filter(x=>x&&x.site&&Array.isArray(x.items)).map(x=>({...x,...__slimLayout(x.site,x.items),id:x.id||`layout-${Date.now()}-${Math.random().toString(36).slice(2,6)}`}));
 const ids=new Set(v.map(x=>x.id));return[...v,...cur.filter(x=>!ids.has(x.id))]}
