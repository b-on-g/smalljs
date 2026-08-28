# デプロイ

ビルドした $mol アプリは静的ファイルの入ったフォルダです。動かすサーバーもなく、生かし続ける Node プロセスもなく、選ぶアダプタもありません。フォルダを配れる場所なら、どこでもアプリが動きます。

## 配るのは何か

ビルドはすべてをモジュール内の `-/` フォルダに書き出します。

```
my/hello/-/
├── index.html                 配置先のパスに合わせて書き換え済み
├── web.js                     アプリ全体、ファイル一つ
├── web.css
├── web.locale=en.json         言語ごとに一つ
├── manifest.json
└── …                          `deploy` ディレクティブが持ち込んだもの
```

このフォルダがサイトそのものです。どんな静的ホスティングから配ってもアプリは動きます。

`my/hello/` の残りはソースで、`-/` は生成物です。ワークスペースの `.gitignore` が `-*` を無視するので、ビルド結果がプロジェクト自身の履歴に入ることはありません。ウェブへはデプロイ用ブランチから出ていきます。

## 短い版

ワークフローはスキャフォルダが書くので、新しいプロジェクトは push だけで公開されます。

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` がモジュールをビルドし、`my/hello/-/` を `gh-pages` ブランチへ push します。**Settings → Pages → Source** が *Deploy from a branch* で `gh-pages` になっていれば、GitHub がそのブランチを配信します。そのブランチがあるリポジトリの既定値がまさにこれです。URL が 404 を返すなら、まず確認するのはこの設定です。

以後サイトは `https://<user>.github.io/<repo>/` に住みます。

## ワークフローが実際にしていること

支えているのは二つのアクションで、どちらも入力は数個です。

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # ビルドするフォルダ、ワークスペースからの相対パス
      modules: "app"          # その中のどのモジュールか

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` はあなたのパッケージの周りに MAM ワークスペースを広げ、コード中の `$name` トークンをそれを収めたリポジトリへ解決し、ビルドします。ロックファイルも `npm install` の手順も要りません。依存関係の一覧は `.meta.tree` のレジストリそのもので、[プロジェクト構成](#!section=docs/page=structure)で説明したとおりです。

`gh-deploy` はビルドしたフォルダを `gh-pages` にコミットします。`target-folder` を渡すとルートではなくサブフォルダに置かれ、これがブランチのプレビューになります。

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

`feature/*` の各ブランチが同じ Pages サイト上に自分の URL を持ち、`delete` トリガーがブランチの消滅に合わせてフォルダを片付けます。

## デプロイに要る一つのファイル

デプロイされるパッケージには、隣に一行だけの `.gitattributes` が要ります。

```
* -text
```

デプロイとはビルド結果をブランチにコミットすることで、その結果はテキストばかりではありません。そのコミットへ向かう途中で正規化されたフォントや画像は、読者のところへ壊れて届きます。ビルド自体は緑のままです。ファイルはスキャフォルダが書きます。自分で作ったリポジトリでは手で足してください。

## サイトのルートに置くべきファイル

`meta.tree` の `deploy \/path` はファイルを `-/` へ、**ワークスペースからの相対パスを保ったまま**コピーします。コードが参照するアセットにはそれが正しく、ホスティングがルートで探すファイルには合いません。`CNAME`、`robots.txt`、サーチコンソールの確認ページ。これらはビルドの後、デプロイ手順の前に、ワークフローの一手順でコピーします。

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## 静的ホスティングでの深いリンク

パスルーティングのアプリ（`#!section=docs` ではなく `/section=docs/page=views`）がホスティングに求めるのは一つだけです。マウント配下の未知のパスは、すべてアプリの `index.html` を返さなければなりません。さもないと深いリンクへの最初のアクセスは 404 になり、トップページからの遷移しか動きません。

GitHub Pages に書き換えルールはないので、通り道はその `404.html` です。未知のパスにはこれが返り、その中の数行がアドレスを `index.html` に戻し、ルーターが本当のルートへ展開します。上のファイルと同じように、ビルド結果の隣へコピーします。

ほかのホスティングは一行で済みます。nginx なら `try_files $uri /index.html`、Caddy なら `try_files {path} /index.html`、Netlify なら `/* /index.html 200` の一行です。

ハッシュルーター（既定）のアプリにはどれも要りません。`#` の後ろはサーバーまで届かないからです。

## push の前に確かめる

ビルドはローカルでも CI でも同じなので、手元で監査が緑ならデプロイも緑です。

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` が報告のすべてです。本物を見るには、任意の静的サーバーでフォルダを配ってください。

```bash
npx serve my/hello/app/-
```

## GitHub Pages の外でも

ここまでの話に GitHub 固有のものはありません。出力はフォルダ、デプロイはコピーです。Netlify、Cloudflare Pages、CDN の後ろの S3、VPS 上の nginx、そのフォルダを収めた Docker イメージ。ビルド手順は同じ `npx mam my/hello/app` で、アップロードするのは `my/hello/app/-` です。

オフラインでも使えるインストールにするなら、[オフライン](#!section=docs/page=offline)がバンドルをキャッシュする service worker を足し、同じフォルダがインストール可能なアプリになります。
