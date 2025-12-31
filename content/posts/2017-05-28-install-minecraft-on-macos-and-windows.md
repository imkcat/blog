---
title: "在 macOS 和 Windows 平台上安装 Minecraft"
date: "2017-05-28T10:27:00.000Z"
slug: "install-minecraft-on-macos-and-windows"
coverImage: "/images/2017/08/ZpVQjEGg22g2LHClzSucGitGNG0JoRjn.jpg"
tags: ["HMCL", "Minecraft", "macOS", "Windows"]
author: "Kcat"
excerpt: ""
---
由于我的一个朋友想出个安装 Minecraft 的图文教程，正好顺便就帮他写了这边图文教程，内容面向不清楚如何安装 Minecraft 的童靴

## 我买了正版的Minecraft

入手正版的童靴，在 Minecraft官方网站[^1] 即可下载，这篇 Blog 就不具体描述如何下载安装了

<h2 id="require_components"> 准备工作 </h2>

下载并安装以下必需组件：

* JRE[^2]：[Windows](https://java.com/zh_CN/download/manual.jsp#win) / [macOS](https://java.com/zh_CN/download/manual.jsp#mac)

## HMCL 是什么？

HMCL 又名 **Hello Minecraft! Launcher** (以下都简写为HMCL)，是一款强大的 Minecraft 启动器，开发作者是 huanghongxun[^3]，并以 `GPL v3` 协议下开源在 Github[^4]

HMCL 拥有 Mod 管理、自定义游戏配置、自动安装(Forge, LiteLoader 和 OptiFine)等许多强大的功能，并且软件拥有兼容 Windows/macOS/Linux 三个平台的版本

了解了HMCL是什么之后，我们可以使用 HMCL 来下载和安装 Minecraft 各个版本

## 下载 HMCL

打开 HMCL 的 Github发布页面[^5]，然后下载你所使用的操作系统对应的安装包即可

![下载对应版本](/images/2017/08/JUz7Q08CSf0SgNTUiG3y8BSBBvqZbk8u.jpg)

## 安装 HMCL

安装的部分其实就要看个人的习惯了，HMCL 是一个独立的程序，它并不是一个安装包形式的执行文件，下面是不同平台的安装建议

### Windows

在Windows 下建议把 **HMCL-xx.exe** 文件放在一个名称意义明确的文件夹中

### macOS

在 macOS 下打开 DMG 映像文件，把 HMCL 文件复制到应用程序中

## 运行 HMCL

运行 HMCL，那就应该会正常进入 HMCL 的主界面，如果没有正常进入主界面，可能由于没有安装 `JRE`，请完成[准备工作](#require_components)

## 下载 Minecraft

1. 点击 HMCL 的 `游戏设置`
2. 点击 `游戏下载`，选择你想要下载的 Minecraft 版本，再点击 `下载` 即可下载 Minecraft
 ![下载Minecraft](/images/2017/08/xoNwfQyhQLEKrGn35SfGtNdP5suYbXPo.jpg)
3. 等待游戏下载完成
4. 点击 `主页` 进入 HMCL 主页，选择下载好的 Minecraft 版本
5. 填写你想要的游戏玩家名称，点击 `启动Minecraft` 可进入 Minecraft
 ![启动Minecraft](/images/2017/08/sO8rGkvEO3OZQvx1JG4r7O6cqjeUZo6Q.jpg)
6. 然后即可开玩 Minecraft 了

[^1]: [Minecraft官方网站](https://minecraft.net/zh-hans/)
[^2]: **Java Runtime Environment:** 简称 JRE，是一个软件，由太阳微系统所研发，JRE 可以让电脑系统运行 Java 应用程序（Java Application）
[^3]: [huanghongxun Github](https://github.com/huanghongxun)
[^4]: [HMCL Source](https://github.com/huanghongxun/HMCL)
[^5]: [HMCL Release](https://github.com/huanghongxun/HMCL/releases)