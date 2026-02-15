---
title: "解决 macOS 上 Docker.qcow2 文件无限增长大小的问题"
author: "Kcat"
date: "2017-07-27 09:44"
readTime: "4 min read"
tags: ["Docker", "macOS", "随笔小记"]
---

在 macOS 上使用 Docker 会发现一个问题，尤其是少于 256G SSD 的 MacBook Pro，这个问题可能会更加明显，那就是发现磁盘的可用空间会随着使用 Docker 而越来越少，当你去删除所有的 image 或者 container ，发现磁盘可用大小基本没什么变化，所以想要急切恢复可用的空间的童靴，就用下面的办法来解决

## Docker.qcow2
磁盘可用空间越来越少的罪魁祸首就是这个 `Docker.qcow2` 文件，这个文件 Docker 使用的一个 qcow[^1] 格式的镜像文件，它会随着使用而增长

## 解决方法
在网上有许多解决方法，使用脚本或者 `qemu-img` 命令来解决，我推荐使用Docker自带的清理办法

1. 打开 Docker 的 `Preferences` 偏好设置
2. 点击 `Reset` 标签
3. 点击 `Remove all data` 即可开始清理

[^1]: [Qcow](https://en.wikipedia.org/wiki/Qcow)