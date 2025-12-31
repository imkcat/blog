---
title: "解决那些在 macOS 上霸占 CPU 使用率的进程 - AAM Updates Notifier"
date: "2013-08-28T11:00:00.000Z"
slug: "high-cpu-progress-in-macos-aam-updates-notifier"
coverImage: "/images/2017/08/xVM6Lt7DINH51qVV5OwEQ3SjaPqDcIna.jpg"
tags: ["macOS", "Hackintosh"]
author: "Kcat"
excerpt: ""
---
此博客是我在远景论坛上黑苹果板块于 2013 年发表的[这篇帖子](http://bbs.pcbeta.com/viewthread-1392489-1-1.html)修改得来，所以主要面向于黑果无法监测 CPU 变频的情况下的解决办法

## AAM Updates Notifier

有些安装了 Photoshop 的童鞋一般开机的时候会有这个进程，这是 Adobe 的检查更新的进程，虽然开机的时间停几分钟就没有了，但是毕竟没有什么用，所以就不必可怜它啦。

### 解决办法
删除位于 `/Library/LaunchAgents`和`~/Library/LaunchAgentsand`里面的`com.adobe.AAM.Updater-1.0.plist` 就可以了

