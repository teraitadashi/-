/* ===== レイアウト保存の容量対策 =====
   保存データに写真 (data:URI) を入れるとスマホのブラウザの保存上限 (約5MB) をすぐ超えて保存できなかった。
   保存時は写真を外し、読み込み時にギア・区画の一覧から写真を付け直す。保存に失敗したときは知らせる。 */
function __slim(o){if(!o||typeof o!=='object')return o;const r={};for(const k in o){const v=o[k];if(typeof v==='string'&&v.startsWith('data:'))continue;r[k]=v}return r}
function __slimLayout(site,items){return{site:__slim(site),items:(items||[]).map(__slim)}}
function __fatLayout(site,items){const cat=[...y,...__CBR,...__C26,...__CPOP],S=b.find(x=>x.name===site.name);
 return{site:S&&S.imageUrl&&!site.imageUrl?{...site,imageUrl:S.imageUrl}:site,
  items:(items||[]).map(it=>{if(it.imageUrl)return it;const p=cat.find(g=>g.id===it.presetId)||cat.find(g=>g.name===it.name);return p&&p.imageUrl?{...it,imageUrl:p.imageUrl}:it})}}
function __saveLS(key,val){try{localStorage.setItem(key,JSON.stringify(val));return!0}catch(e){alert('保存できませんでした。端末の保存容量がいっぱいか、この開き方では保存が使えません。\n(ファイルアプリのプレビューではなく Safari で開くか、不要なレイアウトを削除してください)');return!1}}
