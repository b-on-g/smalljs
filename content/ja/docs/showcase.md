# ショーケース

$mol で作られた本物のもの——コミュニティのアプリ、商用製品、開発者向けツール。どれもデモではなく、動くアプリです。

## アプリ

- **[Bog Music](https://b-on-g.github.io/music/)**——Chrome 拡張としても Web アプリとしても動く音楽プレーヤー。バックグラウンド再生とオフラインキャッシュ付き。$mol が UI とローカルファーストな状態を駆動します。
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)**——$mol と Giper Baza で作られた Kahoot 風のライブクイズ。ルームは CRDT 層を通じてリアルタイムに同期するので、動かすゲームサーバーはありません。
- **[VDO Rebalance](https://b-on-g.github.io/invest/)**——ローカルファーストな投資ツール。`.xlsx` のポートフォリオを入れると、それをリバランスする取引が得られます。状態は Giper Baza 上でブラウザ内に存続します。
- **[$hyoo_budget](https://budget.hyoo.ru)**——協働的でローカルファーストな家計簿アプリ。Beautiful Code ハッカソンで一位を獲得しました。
- **[$hyoo_talks](https://talks.hyoo.ru)**——埋め込み可能なメッセンジャー。Sberbank 向けに作られた試作品が Moscow City Hack で二位を獲得しました。
- **[バーチャルアバター](https://avatar.ocas.ai)**——話しかけたり、チェスをしたり、スライドの発表を頼んだりできる 3D キャラクター。$mol がサードパーティのライブラリの上でインターフェイスを駆動する商用製品です。

## デザインシステムとツール

- **[BuilderUI](https://b-on-g.github.io/builderui/)**——$mol 向けの shadcn 風デザインシステム。型付きコンポーネント——ボタン、ダイアログ、セレクト、カード、チャートなど——に加え、ライブテーマ設定のための Studio（ベースカラー、アクセント、チャートパレット、角丸、フォント、ライト／ダーク）。このドキュメントサイトはその上に作られています。
- **このサイト**——あなたが読んでいるドキュメントは、[プレイグラウンド](#!section=playground)や[コース](#!section=course)を含め、$mol アプリです。検索、ライブコードエディター、ブラウザ内 TypeScript は、すべてそれらが説明する当のフレームワークで作られています。
- **MAM**——すべての $mol アプリが宿るビルドツールとモジュールレジストリであり、それ自体も $mol プロジェクトです。ホスト型アプリというより開発者向けツールで、ソースは GitHub にあります。
- **view.tree LSP**——言語ツールと、新しい $mol アプリを立ち上げる `npm create view-tree-lsp` スキャフォルダー。エディター用ツールなので、開ける稼働中のアプリはありません。

## ハッカソンと商用利用

$mol はハッカソンで何度も勝ってきました。Beautiful Code で一位（[$hyoo_budget](https://budget.hyoo.ru)）、AC-VO-PPR-Hackathon で一位（街頭ディスプレイをジェスチャーと音声で制御）、そして More Tech、Moscow City Hack、Dev Hack での受賞試作品。オンラインストアのバックオフィスからドローン防衛の制御盤まで、商用・産業システムでも使われています。$mol の[サクセスストーリーのページ](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x)に詳細があります。

## もっと見る

[$mol コンポーネントカタログ](https://mol.hyoo.ru/#!section=demos)には、開いて調べられるライブなコンポーネントとデモが何十もあります。

$mol で何か作っていますか？次の一歩に最適なのは[プレイグラウンド](#!section=playground)です——数秒でアイデアを試し、URL を共有しましょう。
