---
title: "在 Ubuntu 下快速安装 Nvidia 驱动"
date: "2018-10-22T15:06:04.000Z"
slug: "quick-way-to-install-nvidia-driver-in-ubuntu"
coverImage: "/images/2018/10/DB86DA56-16CA-4F2C-9C44-285D06BDE5DE.jpg"
tags: ["随笔小记", "Ubuntu", "Nvidia"]
author: "Kcat"
excerpt: ""
---
在 Ubuntu 下，如果下载了 Nvidia 官方的驱动，然后按照 Nvidia 官方繁琐的 [安装方法](https://us.download.nvidia.com/XFree86/Linux-x86_64/410.66/README/index.html) 安装真的是一种折磨，而且在其中也会遇到非常多的问题

**有没有一键安装的方法？**

答案是有的!

多谢 [Graphics Drivers](https://launchpad.net/~graphics-drivers) 团队的辛勤付出，把繁琐的安装过程进行封装，只需 apt 安装即可

我们只需要添加此 PPA[^1] 仓库地址然后进行安装即可：

```bash
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt-get update
```

更新仓库后，我们可以搜索一下：

```bash
sudo apt search nvidia
```

此 Blog 搜索时最新可用的版本是 `nvidia-390`，遂直接进行安装即可：

```bash
sudo apt install nvidia-390
```

等待安装完成之后，重启系统即可见证奇迹

[^1]: Personal Package Archives