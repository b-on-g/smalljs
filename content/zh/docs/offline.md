# 离线

$mol 应用可以在没有网络的情况下继续工作——在线打开一次，之后离线也依然可用，甚至可以作为 PWA 安装。这来自一个内置模块 `mol/offline/install`，并且与任何数据层无关。

## 它做什么

`mol/offline/install` 运行 `$mol_offline`，后者把一个 **service worker**（`web.js`）注册为缓存代理。每一个成功的静态资源 `GET`——应用包、样式、图片——都会存入名为 `$mol_offline` 的缓存。之后加载时，worker 直接从缓存返回这些响应，因此应用瞬间打开，并通过回退到缓存副本挺过 HTTP 错误或断线。由于整个应用都可缓存并以此方式提供，浏览器可以提供**将其安装为 PWA**。

## 如何启用

在应用的 `*.meta.tree` 中加入一行：

```tree
include \/mol/offline/install
```

这个强制 include 把模块拉入打包，于是它的 service worker 作为副作用完成注册——无需其他代码引用它。关于 `include` 的工作方式，参见[模块元数据](#!section=docs/page=meta)。

浏览器在运行时的两个要求：

- 通过 **HTTPS** 提供（开发时用 `localhost`）——否则 service worker 拒绝运行。
- 提供一个 Web 应用清单（manifest），使应用可安装。

## 它*不是*什么

离线缓存让*单个*客户端在没有网络时继续工作。它**不**在客户端之间同步数据：带查询字符串的请求会被直接放行，非 `GET` 请求从不缓存。当多个客户端或设备需要共享同一份实时、可编辑的数据——并进行无冲突合并——时，那是另一回事，由独立的 [Giper Baza](#!section=docs/page=giper-baza) 项目处理。
