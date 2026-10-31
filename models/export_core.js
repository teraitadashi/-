/* ===== アプリ本体 (この1枚のHTML) の書き出し =====
   以前は存在しない /hairuka_standalone.html を読みに行っていた。起動直後 (画面を描く前) の HTML をそのまま控えておき、コピー・保存に使う */
const __SRC_HTML=(()=>{try{return'<!DOCTYPE html>\n'+document.documentElement.outerHTML}catch{return''}})();
function __appHTML(){return __SRC_HTML||'<!DOCTYPE html>\n'+document.documentElement.outerHTML}
/* 共有シート (「"ファイル"に保存」) → ダウンロードの順に試す */
function __saveAppHTML(){const t=__appHTML(),nm='mio_camp_simulator.html';
 try{const f=new File([t],nm,{type:'text/html'});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:nm}).catch(()=>{});return}}catch{}
 try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/html'}));a.download=nm;document.body.appendChild(a);a.click();a.remove()}catch{alert('この開き方では保存できませんでした。「単一HTMLコードをコピー」をお使いください。')}}
