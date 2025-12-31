---
title: "Atom 在国内无法安装 Package 的解决方案"
date: "2017-03-29T04:01:00.000Z"
slug: "solution-for-install-atom-package-in-china"
coverImage: "/images/2017/08/E8Lo980XVqnj7PbK3bHQP5O2VJKiLUBi.jpg"
tags: ["Atom", "apm", "npm"]
author: "Kcat"
excerpt: ""
---
由于被墙的原因，在国内使用 Atom 的 Package(包)面板来安装 Package 基本都无法正常安装，有些时候 VPN 也不好使，那么怎么才能完美的安装 Package 呢？我们用 npm[^npm] 来解决

## 安装 npm 并且替换内置源为国内淘宝源

npm 一般在已经安装了 Node.js 的运行环境中就已默认安装，此篇便不过多介绍 Node.js 了，Node.js 是一个基于 [Chrome's V8 JavaScript引擎](https://developers.google.com/v8/) 的 JavaScript 运行环境

### 安装 npm
可以访问 Node.js 的 [官网](https://nodejs.org) 下载安装，安装后打开 Terminal，输入以下命令检测是否正常安装 npm

``` bash
#!/bin/bash
npm version
```

如果输出以下格式的内容，便是已正常安装

``` json
{ intentions: '1.1.2',
  npm: '3.10.10',
  ares: '1.10.1-DEV',
  http_parser: '2.7.0',
  icu: '58.2',
  modules: '48',
  node: '6.10.1',
  openssl: '1.0.2k',
  uv: '1.9.1',
  v8: '5.1.281.95',
  zlib: '1.2.8' }
```

### 替换 npm 内置源为淘宝源

由于 npm 内置源非常慢，会拖慢安装的速度，所以我们需要替换为国内的 [淘宝源](https://npm.taobao.org/)

``` bash
npm config set registry https://registry.npm.taobao.org
```

## 查找并且下载 Package

1. Atom 提醒安装 Package,当你需要安装某个 Package 或者 Atom 提示你需要安装某个 Package 的时候，你需要去 Atom 的 [Packages网站](https://atom.io/packages) 进行搜索
2. 输入指定的 Package 名字进行搜索
3. 进入 Package 页面，点击 repo 进入 Package 的 GitHub 主页，点击 `Versions` 查看最新的 release 版本
 ![点击Versions](/images/2017/08/0Mzldh2bL9f2pJwQlEdUBkFSPb7KJLsR.jpg)
 
4. 下载 zip 格式的源码
 ![下载zip源码](/images/2017/08/mXLOVdinwZJVDYaTDR9F6TRNPyHYTvHB.jpg)

5. 下载并且解压后，移动至 `无版本号Package文件夹`，例如：下载的 zip 文件为 `linter-2.2.0.zip`，移动到 `linter` 的文件夹
 ![文件夹结构](/images/2017/08/M65e8T3Ex4LfznGyIhLmQYiyn7CVq6qB.jpg)

## 安装 Package

1. 查看 Atom 的 Packages 目录，在 Atom 的 `Preferences` 的 `Install` 标签可以看到 Atom 的 `Packages目录`
 ![查看Packages目录](/images/2017/08/PTklV3Vx4aXvxyNyAb4ZIS8hotRMOupr.jpg)

2. 把之前 `无版本号Package文件夹` 复制到 Atom 的 `Packages目录`

3. 打开 Terminal，进入 `无版本号Package文件夹`

``` bash
#!/bin/bash
cd linter   //进入无版本号Package文件夹
npm install   //进行Package的安装
```

安装后，重启 Atom 便可以正常使用，不会再因为 Atom 自带的 Package 安装失败而发愁

[^npm]: npm是一个JavaScript的Package管理模块，方便部署JavaScript项目时下载所依赖的Package