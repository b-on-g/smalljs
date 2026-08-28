# 展示

用 $mol 构建的真实作品——社区应用、商业产品和开发者工具。每一个都是能用的应用，而不是演示。

## 应用

- **[Bog Music](https://b-on-g.github.io/music/)**——一个既可作为 Chrome 扩展、也可作为网页应用运行的音乐播放器，带后台播放和离线缓存。$mol 驱动界面和本地优先的状态。
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)**——一个基于 $mol 和 Giper Baza 构建的 Kahoot 风格实时问答。房间通过 CRDT 层实时同步，因此没有游戏服务器需要运行。
- **[VDO Rebalance](https://b-on-g.github.io/invest/)**——一个本地优先的投资工具：放入一个 `.xlsx` 投资组合，得到用于再平衡的交易。状态在浏览器中通过 Giper Baza 存续。
- **[RAGU](https://raguteam.github.io/web/#!screen=summary)**——一个开源 GraphRAG 引擎的网页界面：浏览文档索引、提问并获得带来源的回答、探索从中抽取的知识图谱。力导向图由 `$mol_svg_*` 原语绘制，连布局和缩放平移一起，没有用图形库。
- **[$hyoo_budget](https://budget.hyoo.ru)**——一个协作式、本地优先的个人预算应用。它在 Beautiful Code 黑客松上获得第一名。
- **[$hyoo_talks](https://talks.hyoo.ru)**——一个可嵌入的即时通讯。为 Sberbank 构建的一个原型在 Moscow City Hack 上获得第二名。

## 设计系统与工具

- **[BuilderUI](https://b-on-g.github.io/builderui/)**——一个面向 $mol 的 shadcn 风格设计系统：带类型的组件——按钮、对话框、下拉选择、卡片、图表等等——外加一个用于实时主题化的 Studio（基础色、强调色、图表配色、圆角、字体、明/暗）。本文档站点正是基于它构建的。
- **本站**——你正在阅读的文档，包括[游乐场](#!section=playground)和[课程](#!section=course)，就是一个 $mol 应用。搜索、实时代码编辑器和浏览器内的 TypeScript，全都用它们所记录的这个框架构建。
- **MAM**——每个 $mol 应用赖以存在的构建工具和模块注册表，其本身也是一个 $mol 项目。它是开发者工具，而不是托管应用；源码在 GitHub 上。
- **view.tree LSP**——语言工具，以及一个用于启动新 $mol 应用的 `npm create view-tree-lsp` 脚手架。这是编辑器工具，因此没有可打开的运行中应用。

## 生产环境中

除了开源和黑客松项目，$mol 也运行在能带来营收的商业系统中。其中几个（部分在 NDA 之下运行，因此没有链接或标识）：

- **反无人机防御控制**——“Tamerlan”综合体在每个设备控制器（雷达、干扰器、摄像头）上运行一个 $mol 微服务，把它们连成一个共享的去中心化网络。网页界面（本地或集中式）实时显示空情——什么在哪里飞、什么正被干扰、摄像头指向何处。
- **[虚拟头像](https://avatar.ocas.ai)**——一个可以与之交谈、下棋或请其演示幻灯片的 3D 角色。这是一个商业产品，$mol 在第三方库之上驱动其界面。
- **提示词测试管理面板**——让企业为批量处理目录行挑选并测试神经网络提示词：改写标题、描述和 SEO 字段。它还会清理文本文件，以便安全导出到其他 CMS。
- **抄表管理面板**——仪表把读数上传到 FTP；运营者创建用户，授予他们查看特定仪表的权限并开展邮件营销，而普通用户只能看到自己的对象和一个只读的查看页面。
- **电商后台**——为一家网店管理商品目录和订单列表。
- **科学数据小组件**——可视化微量元素及其化合物。图形渲染仍留在 D3；其余全部从原生 JS 重写为 $mol，并打包进一个 Web Component。

## 黑客松

$mol 在黑客松上屡获佳绩：Beautiful Code 第一名（[$hyoo_budget](https://budget.hyoo.ru)）、AC-VO-PPR-Hackathon 第一名（用手势和语音控制一块街头显示屏），以及在 More Tech、Moscow City Hack 和 Dev Hack 上的获奖原型。$mol 的[成功案例页面](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x)有详细内容。

## 更多

[$mol 组件目录](https://mol.hyoo.ru/#!section=demos)里有几十个可以打开并查看的实时组件和演示。

在用 $mol 构建什么吗？最好的下一步是[游乐场](#!section=playground)——几秒钟试一个想法，然后分享 URL。
