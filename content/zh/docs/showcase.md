# 展示

用 $mol 构建的真实作品——社区应用、商业产品和开发者工具。每一个都是能用的应用，而不是演示。

## 应用

- **[Bog Music](https://b-on-g.github.io/music/)**——一个既可作为 Chrome 扩展、也可作为网页应用运行的音乐播放器，带后台播放和离线缓存。$mol 驱动界面和本地优先的状态。
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)**——一个基于 $mol 和 Giper Baza 构建的 Kahoot 风格实时问答。房间通过 CRDT 层实时同步，因此没有游戏服务器需要运行。
- **[VDO Rebalance](https://b-on-g.github.io/invest/)**——一个本地优先的投资工具：放入一个 `.xlsx` 投资组合，得到用于再平衡的交易。状态在浏览器中通过 Giper Baza 存续。
- **[$hyoo_budget](https://budget.hyoo.ru)**——一个协作式、本地优先的个人预算应用。它在 Beautiful Code 黑客松上获得第一名。
- **[$hyoo_talks](https://talks.hyoo.ru)**——一个可嵌入的即时通讯。为 Sberbank 构建的一个原型在 Moscow City Hack 上获得第二名。
- **[虚拟头像](https://avatar.ocas.ai)**——一个可以与之交谈、下棋或请其演示幻灯片的 3D 角色。这是一个商业产品，$mol 在第三方库之上驱动其界面。

## 设计系统与工具

- **[BuilderUI](https://b-on-g.github.io/builderui/)**——一个面向 $mol 的 shadcn 风格设计系统：带类型的组件——按钮、对话框、下拉选择、卡片、图表等等——外加一个用于实时主题化的 Studio（基础色、强调色、图表配色、圆角、字体、明/暗）。本文档站点正是基于它构建的。
- **本站**——你正在阅读的文档，包括[游乐场](#!section=playground)和[课程](#!section=course)，就是一个 $mol 应用。搜索、实时代码编辑器和浏览器内的 TypeScript，全都用它们所记录的这个框架构建。
- **MAM**——每个 $mol 应用赖以存在的构建工具和模块注册表，其本身也是一个 $mol 项目。它是开发者工具，而不是托管应用；源码在 GitHub 上。
- **view.tree LSP**——语言工具，以及一个用于启动新 $mol 应用的 `npm create view-tree-lsp` 脚手架。这是编辑器工具，因此没有可打开的运行中应用。

## 黑客松与商业应用

$mol 在黑客松上屡获佳绩：Beautiful Code 第一名（[$hyoo_budget](https://budget.hyoo.ru)）、AC-VO-PPR-Hackathon 第一名（用手势和语音控制一块街头显示屏），以及在 More Tech、Moscow City Hack 和 Dev Hack 上的获奖原型。它也用于商业和工业系统——从网店后台到反无人机防御控制面板。$mol 的[成功案例页面](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x)有详细内容。

## 更多

[$mol 组件目录](https://mol.hyoo.ru/#!section=demos)里有几十个可以打开并查看的实时组件和演示。

在用 $mol 构建什么吗？最好的下一步是[游乐场](#!section=playground)——几秒钟试一个想法，然后分享 URL。
