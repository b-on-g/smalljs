# 项目结构

一个 $mol 项目有四个嵌套层级：你克隆下来的**工作区**、其中的**包**、包里的**模块**，以及模块里的**文件**。每一层回答的问题都不同，而构建所做的大部分事情，都源自分清哪个是哪个。

```
mam/                            工作区——MAM 的克隆
├── .meta.tree                  注册表：哪个包来自哪个仓库
├── package.json
├── mol/                        包——框架本身，独立的 git 仓库
│   └── button/                 模块——组件 $mol_button
│       ├── button.view.tree
│       ├── button.view.ts
│       ├── major/              子模块——$mol_button_major
│       └── minor/              子模块——$mol_button_minor
└── my/                         包——你自己的
    ├── .gitattributes          `* -text`——保持构建出的二进制文件完好
    └── hello/                  模块——组件 $my_hello
        ├── index.html          入口（只有应用模块才有）
        ├── hello.view.tree     布局
        ├── hello.view.ts       行为
        ├── hello.view.css.ts   样式，用 TypeScript 写
        ├── hello.locale=ru.json
        ├── hello.meta.tree     构建与部署指令
        ├── form/               子模块——$my_hello_form
        ├── -view.tree/         由 hello.view.tree 生成
        └── -/                  构建产物
```

## 工作区

MAM 只克隆一次，然后就在里面工作。它不是一个把依赖复制进来的文件夹：每个包都以自己的 git 克隆形式待在那里，带着完整历史，所以你可以读框架的源码、往里面放一个 `debugger`，并从同一份工作副本发起 pull request。

根目录的 `.meta.tree` 就是让这一切成立的注册表：

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

当构建遇到 `$mol_view` 而 `mol/` 文件夹还不存在时，它会到这里查这个名字并克隆仓库。没有任何东西被 vendor 进来，也没有任何东西被拍平。

## 包

顶层文件夹就是一个包，而包就是一个 git 仓库。你自己的包只是一个由你命名的文件夹：只要它还留在本地，就不需要任何登记；等到你想按名字拉取它的那天，再加一行 `pack`。

包可以嵌套。一个包能为自己内部的文件夹携带自己的 `pack` 声明，MAM 从将要容纳该包的那个文件夹的 `meta.tree` 中读取它们。本站位于 `bog/smalljs/`，本身就是一个仓库，登记在 `bog/bog.meta.tree` 里；而后者又位于根 `.meta.tree` 所列的 `bog/` 克隆之中。

### 每个包都需要的一个文件

会被部署的包需要一个只有一行内容的 `.gitattributes`：

```
* -text
```

这会关掉 git 的行尾规范化。它之所以重要，是因为部署意味着把构建产物提交到某个分支，而产物不只是文本：本站带有 57 个二进制文件——它自托管的字体，以及每个页面的预览图。如果在入库时被规范化，读者拿到的就是坏掉的图片和字体，而构建本身却依旧是绿的。MAM 的克隆在自己的根目录里也有同一个文件，其中字体格式还额外标了 `binary`。

生成器会替你写好它；在你自己起的仓库里，请手动加上。

## 模块

模块就是文件夹，文件夹就是组件。这里没有 import 语句，也没有模块映射表：类名*本身*就是地址，而其中的每个下划线都是文件夹分隔符：

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

这就是全部的解析规则。构建器扫描你的源码文本，找出 `$name` 记号，按 `_` 切开每一个，然后沿着文件夹走下去。没有任何东西声明依赖；用到某个名字就是声明。

由此带来的实际后果：**模块文件夹名永远不包含下划线。** 名为 `my/hello_form/` 的文件夹会被去 `my/hello/form/` 找，然后永远找不到——症状是某个类在编辑器里能编译，却在打包结果中缺席。

有子模块的模块自己仍然可以是组件，形态有两种。`$mol_button` 直接住在 `mol/button/` 里，与 `major/` 和 `minor/` 并列。`$mol_view` 则往下一层，住在 `mol/view/view/`，因为 `mol/view/` 里还放着 `component/`、`selection/` 和 `tree2/`。MAM 会先尝试加倍的路径，再回退到较短的那条，所以两种布局都能解析。

## 模块里的文件

每个文件都是可选的。模块就是它恰好包含的那些文件。

| 文件 | 用途 |
|------|---------|
| `hello.view.tree` | 声明式布局 |
| `hello.view.ts` | 行为：继承生成基类的那个类 |
| `hello.view.css.ts` | 带类型的样式。注意末尾的 `.ts`：这是调用 `$mol_style_define` 的 TypeScript，而不是样式表 |
| `hello.ts` | 完全没有视图的模块——模型、工具函数、纯逻辑 |
| `hello.test.ts` | 测试，由构建器运行 |
| `hello.locale=ru.json` | 翻译；任何以 `.locale=<lang>.json` 结尾的文件都会被收录 |
| `hello.meta.tree` | 构建与部署指令 |
| `index.html` | 入口——只有应用模块需要 |

扩展名之前的后缀把文件限定在一个环境里：

- `frame.web.ts`——只进浏览器产物，如 `mol/after/frame/frame.web.ts`
- `build.node.ts`——只进 Node 产物，如 MAM 构建器自身
- `hello.test.ts`——只进测试产物

构建器为每个应用产出一份 `web` 产物和一份 `node` 产物，并丢掉标给另一边的文件，所以平台相关的代码永远不必在运行时自我保护。

模块旁边也接受原始 `.css` 文件——框架用它们来处理带类型的样式表达不了的少数东西，比如 `@keyframes` 和 `content:`。其余一切都属于 `.view.css.ts`，那里的属性名会被检查。

## 生成的文件夹以短横线开头

只有当一个名字以字母或数字开头时，MAM 才把它当作源码。其余的对构建不可见，这正是每个生成文件夹都带 `-` 前缀的原因：产物可以就放在它的输入旁边，而不会被当作输入重新读回去。工作区的 `.gitignore` 忽略 `-*` 也是同样的道理。

**`-view.tree/`** 出现在任何 `.view.tree` 文件旁边，装着这棵树编译出来的东西：

```
my/hello/-view.tree/
├── hello.view.tree.js            生成的基类
├── hello.view.tree.d.ts          它的带类型接口
└── hello.view.tree.locale=en.json  抽取出来的 @ 字符串
```

你的 `hello.view.ts` 继承里面那个类。这就是两个文件之间的全部关系——[从 TypeScript 到 view.tree](#!section=docs/page=from-ts-to-view-tree) 会逐行走一遍生成的代码。

**`-css/`** 出现在原始 `.css` 文件旁边，装着一个生成的 `.ts`，它把样式表包进一次 `$mol_style_attach` 调用，于是样式表随产物一起走，而不需要 `<link>`。

**`-/`** 是你构建过的模块的产物目录。对一个应用来说，里面有 `web.js`、`web.css`、`web.audit.js`、`web.d.ts`、`web.deps.json`、每种语言各一份 `web.locale=<lang>.json`、对应的 `node` 版本、重写过的 `index.html`，以及生成的 `package.json` 和 `manifest.json`。这个文件夹就是你要部署的东西：把 `app/-` 发布到静态主机，就是全部的部署步骤。

这些都不由手工编辑。只要来源变了，构建器就会重写它们，所以在那里做的改动会在下一次保存时消失，而且不会有任何报错告诉你为什么。改 `.view.tree`、改 `.css` 或改源码，然后重新构建。

## meta.tree 实际做的事

`meta.tree` 不是包清单，也不列依赖——依赖来自代码，在那里一个 `$mol_view` 记号本身就是完整的声明。它承载的是代码自己说不出来的那少数几件事。本站的 `app/app.meta.tree` 就是完整的文件：

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** 把一个文件或文件夹复制进 `-/`，并保留它相对于工作区的路径：`\/bog/smalljs/assets` 会落在 `app/-/bog/smalljs/assets/`。用于那些部署必须带上、却没有代码去导入的静态文件：图片、字体、图标。
- **`include \/path`** 和 **`require \/path`** 强行拉进一个没人引用的模块，比如 `\/mol/offline/install`，它存在的全部意义就是加载时注册的那个 service worker。两者只在顺序上有别：`require` 把模块放在拉它进来的代码之前，`include` 放在之后。
- **`pack <name> git \<url>`** 就是上面说的注册表条目，从将要容纳该包的那个文件夹的 meta 文件里读取。

MAM 会读取一个文件夹里的每一个 `*.meta.tree` 文件，所以名字除了约定之外不带任何含义：模块旁边叫 `<module>.meta.tree`，工作区根目录叫 `.meta.tree`。

实践中 `deploy`、`include` 和 `require` 属于应用模块，因为被构建和部署的正是它；普通组件从自己的代码里就能解析出一切，根本不需要 meta 文件。库模块只有在确实存在无人引用的依赖时才会拿到一个：`mol/assert/assert.meta.tree` 只有 `include \/mol/dev/format` 这一行，而这就是典型的体量。

关于这些指令的更多内容，参见[模块元数据](#!section=docs/page=meta)。

## 下一步

[安装](#!section=docs/page=installation)讲开发服务器和生产构建，[工具链](#!section=docs/page=tooling)里有一个生成器，能替你写出正确的模块布局。
