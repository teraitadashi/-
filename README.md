# みおのキャンプシュミレーター — Claude Code 引き継ぎメモ

## 構成
- `mio_camp_simulator.html` … 公開中の本体（v26）。React + three.js を1ファイルにまとめたミニファイ済みバンドル（約1.7MB）。
- `models/` … 追加した3Dモデルのソース（読みやすい形）。
  - `elg_*.js` エルグランドE52 / `mrw_*.js` MRワゴン / `dome_core.js` ツーリングドーム / `mdx_core.js` タフスクリーン2ルーム / `hexa_core.js` ヘキサ / `shade_core.js` バイザーシェード / `wagon_core.js` アウトドアワゴン / `extra_core.js` クーラー・ダッチオーブン
  - `*_test.html` + `serve_shot.js` … モデル単体の確認用ハーネス（`node serve_shot.js '[[方位,仰角,距離,ty,tz,tx]]' tag elg_test.html`、playwright と three が必要）
- `build/` … 過去のビルドスクリプト（`buildNN.py`）と `app26.js`（現行のアプリJS全体）、商品写真の webp。

## 編集の流れ（これまでのやり方）
1. HTML内のアプリJSは1本のミニファイ済みスクリプト。`build/app26.js` がその内容そのもの。
2. 各 `buildNN.py` は「前のappJSを読む → 画像定数・モデル関数（`function __tent(` の直前）・プリセット・3Dフック・2D記号を文字列置換で挿入 → 次のappJSを書く → HTMLの該当部分を差し替え」を行う。
3. ミニファイ名の対応: `Z`=Mesh, `Q`=MeshStandardMaterial, `ua`=MeshBasicMaterial, `J`=Vector3, `Qi`=BufferGeometry, `Y`=Float32BufferAttribute, `Bo`=TubeGeometry, `vo`=CatmullRomCurve3, `to`=CylinderGeometry, `eo`=BoxGeometry, `Io`=PlaneGeometry, `Ro`=SphereGeometry, `zo`=TorusGeometry, `Xa`=CanvasTexture, `Xr`=Group。
4. 新ギアの追加箇所: プリセット（`{id:\`my-...\`,...isMyGear:!0}`）、3Dフック（`}else if(e.presetId===...){__xxx(s,e)}` の連鎖）、2D記号（`n.name.includes(...)?(...)` の三項連鎖）。
5. 卓上設置ロジック: `function k(e,t)`（載せる先の判定）, `D(e)`（テーブル）, `O(e)`（載せられるギア）, `__potHost/__isHost`（鍋・ダッチオーブンをグリル/ストーブ/テーブルに載せる）。

## 今後の推奨
ミニファイ済みなので、Claude Code では「build/app26.js を直接編集 → HTMLへ差し替え」か、`models/` 内のソースを直してから `buildNN.py` と同じ要領で再挿入するのが安全です。アプリ全体のソース（未ミニファイ）は手元にないため、大きな機能変更は難しい点にご注意ください。

## 既知の課題
- エルグランドは写真を目視で再現した近似モデル（ヘッドライト内部・バンパー形状・ホイール意匠は簡略）。
- 黒い鋳鉄のダッチオーブンは暗い芝の上で見えにくい。
- ダッチオーブンのボトムプレート/リッドリフター、クーラーの型番（現行品との差）は未確認/未モデリング。
