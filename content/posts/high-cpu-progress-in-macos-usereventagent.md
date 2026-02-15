---
title: "解决那些在 macOS 上霸占 CPU 使用率的进程 - UserEventAgent"
author: "Kcat"
date: "2013-08-28 18:00"
readTime: "4 min read"
tags: ["macOS", "Hackintosh"]
---

此博客是我在远景论坛上黑苹果板块于2013年发表的[这篇帖子](http://bbs.pcbeta.com/viewthread-1392489-1-1.html)修改得来，所以主要面向于黑果无法监测CPU变频的情况下的解决办法

## UserEventAgent

在测试 CPU 变频的时候，因为 UserEventAgent 进程疯狂的占用 CPU 使用率，每次开机后十分钟之内都一直 100%

1. 让 CPU 频率无法变动，或者变动非常小
2. 第二就是因为 CPU 频率一直最大，发热量很大。

不管怎么样，有问题就试着解决，最后找到了解决方法[^1]

### 原文

I have fixed it! Here is what I did:

I saw this output of a list of files attached to this process, so I thought, what if I delete one?

`/System/Library/UserEventPlugins/AppleHIDMouseAgent.plugin/Contents/MacOS/AppleH IDMouseAgent`

This seemed to be the driver for an non-apple mouse, a `HID (Human Interface Device)` USB driver

This is what the driver contains, opening it in Coda:
`System/Library/Frameworks/IOKit.framework` (Wasn't that for reading CPU temp?)

`HIDHotPlugHandler` (Plug USB mouse in, and turn CPU up?)

`HIDUnplugHandler` (Unplugging USB mouse, and put CPU down?)

`com.apple.AppleHIDMouseAgent` (That's the drivers name)

I don't know this all, and if it was needed. SO I just deleted the AppleH IDMouseAgent.plugin, and everything is working fine now! Even the apple magic mouse is still working. 

(ACTUALLY I DON'T DELETED THE PLUGIN, I JUST MOVED IT TO MY DOCUMENTS FOLDER, JUST IN CASE...)

I hope this helps, and could this have any concequences? Apple does NOT include plugins that can just be deleted, I guess?

### 我拙译一下重点

我看了这个进程所连接的文件列表，所以就尝试的删除 `/System/Library/UserEventPlugins/AppleHIDMouseAgent.plugin/Contents/MacOS/AppleH IDMouseAgent`

这个看起来是非苹果鼠标的驱动，`HID(human interface device人性化接口设备)` USB驱动

这是驱动的详情，用Coda打开 `System/Library/Frameworks/IOKit.framework` (这是为了读取CPU临时缓存么?)

`HIDHotPlugHandler` (USB鼠标一插就让CPU频率猛增?)

`HIDUnplugHandler` (不插USB鼠标就会让CPU频率降下来?)

`com.apple.AppleHIDMouseAgent` (这个是驱动的名字)

我不知道他们是否都必须，所以我只是删除了 `AppleHIDMouseAgent.plugin`，但是所有的都能够正常工作！甚至 Apple Magic Mouse 也能正常工作

(我希望这个有效，但是这个有什么后果么？我猜除了这个插件之外都不可以被删除)

## 解决办法
把 `System/Library/UserEventPlugins/AppleHIDMouseAgent.plugin/Contents/MacOS/AppleHIDMouseAgent` 删除，重启即可

[^1]:[Why is my UserEventAgent high CPU?](https://discussions.apple.com/thread/4405353)


