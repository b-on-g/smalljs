# 常见问题

## 什么是 smalljs？

smalljs 是 **$mol** 的文档站点——一个带类型视图、自动响应式且没有虚拟 DOM 的响应式 UI 框架。框架本身由 hyoo-ru 社区公开开发；本站把指南、交互式课程、实时游乐场和 API 参考汇集于一处。

## $mol 可以用于生产吗？

可以。$mol 驱动着真实的应用和内部工具——参见[展示](#!section=docs/page=showcase)。它从单一 monorepo（MAM）交付，作者和社区每天都在使用。

## 运行时有多大？

很小。一个最小的应用大约是 123 KB 未压缩的 JavaScript，压缩后经网络传输大约 20 KB。渲染默认是虚拟化的（视口之外的组件永远不会被创建），并且构建只打包你实际用到的模块，所以打包体积随你的应用增长，而不是随框架增长。详情和可复现的基准测试参见[渲染](#!section=docs/page=rendering)。

## 我必须学一门新的模板语言吗？

你要学 `view.tree`，一种用于声明组件布局的紧凑树形语法。它是刻意保持小巧的——[视图](#!section=docs/page=views)一章一次就能涵盖你所需的一切。逻辑仍然用普通 TypeScript，样式也是带类型的。

## 它和 React、Vue 或 Svelte 有什么不同？

响应式是自动的——没有 `useState`、`useEffect`，也没有手动订阅。你描述 UI *是什么*；$mol 决定*如何*以及*何时*更新它。[概念对照表](#!section=docs/page=rosetta)把其他框架的概念映射到 $mol。

## 我在哪里获得帮助？

- 在 [DEV 社区](https://dev.to/t/mol)提问
- 浏览 [GitHub 上的 $mol 源码和 issues](https://github.com/hyoo-ru/mam_mol)
- 阅读 [mol.hyoo.ru](https://mol.hyoo.ru/) 上的参考文档

## 它采用什么许可证？

MIT。你可以在商业和开源项目中自由使用 $mol。
