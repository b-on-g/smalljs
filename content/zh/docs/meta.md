# 模块元数据

在模块的组件之外，一个 `name.meta.tree` 文件声明**构建和部署元数据**——这些是关于整个模块、而非某个具体视图的内容。应用模块是放置它的常见位置。

下面是本站的 `app.meta.tree`：

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## 指令

- **`deploy \/path`**——把指定的文件或文件夹复制到生产构建输出中。用于部署需要携带、但没有代码导入的静态资源——图片、字体、图标。这里 `\/bog/smalljs/assets` 会随包发出 logo 以及 `assets/` 下的其他文件。
- **`require \/path`**——即使没有代码引用某个模块，也把它强制放入包中，用于该模块的代码必须在持有此 `meta.tree` 的模块代码**之前**运行的情况。它作为一个普通的高优先级依赖被引入。模块路径（`\/mol/wire/patch`）或单个文件都可以。
- **`include \/path`**——同样是强制引入，但用于加载顺序无所谓的情况。模块被引入但被降低优先级，因此它在依赖它的代码之后加载。示例：`include \/mol/offline/install`（作为副作用注册一个 service worker）和 `include \/bog/builderui/theme.css`（一份原始样式表）。
- **`pack <name> git \<url>`**——把一个命名空间映射到 MAM 从中获取它的 git 仓库，例如 `pack mol git \https://github.com/hyoo-ru/mam_mol.git`。`$mol_*`、`$hyoo_*` 以及你自己的包正是通过它解析到真实代码的。

到底为什么要强制引入？构建器会自动推断依赖，并只打包你的代码实际使用的东西。偶尔你需要一个你的代码*并不*引用的模块——例如一个把整套组件目录都打包进来、以便它们在运行时存在的应用。`require` 和 `include` 恰好覆盖这种情况；它们只在加载顺序上有区别。

## 它放在哪里

`pack` 声明属于**工作区根目录**的 `.meta.tree`——那是工作区能拉取的每一个包的注册表。把它们放在那里，而不是子模块里；子模块自己的 `meta.tree` 只应携带对它而言特有的 `require`/`include`/`deploy`。
