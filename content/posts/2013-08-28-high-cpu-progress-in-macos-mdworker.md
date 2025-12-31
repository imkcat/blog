---
title: "解决那些在 macOS上 霸占 CPU 使用率的进程 - mdworker"
date: "2013-08-28T12:00:00.000Z"
slug: "high-cpu-progress-in-macos-mdworker"
coverImage: "/images/2017/08/trHCwjJbF542hH2TAlN0ud5vjIETfNdc.jpg"
tags: ["macOS", "Hackintosh"]
author: "Kcat"
excerpt: ""
---
此博客是我在远景论坛上黑苹果板块于 2013 年发表的[这篇帖子](http://bbs.pcbeta.com/viewthread-1392489-1-1.html)修改得来，所以主要面向于黑果无法监测 CPU 变频的情况下的解决办法

## mdworker[^1]

### 什么是 mdworker？
`mdworker` 全称为 `metadata server worker(元数据服务器处理)`，`mdworker` 是`spotlight` 的一部分，是 Mac 的基础搜索引擎

### mdworker 让 CPU 拖慢，占用到60%？
是的，`mdworker` 有时候会导致 Mac 速度变慢，同时高 CPU 占用，这是完全正常的，你应该让它运行到结束，这时候 CPU 占用就恢复正常了。

### mdworker 要花多长时间才能完成进程？
这完全取决于你的 Mac 文件系统最后一次索引大量的新文件（我个人在这理解为是有新文件等产生，文件系统便会进行索引），如果你只是插入一个外接硬盘，那么就期盼它处理一小会，对于 `mdworker` 来说，15分钟到多于一个小时都不是特别大量的时间。

### 我可以杀掉这个进程么？我杀掉了会有什么后果？
你不可以杀掉这个进程，因为他在执行一个索引 Mac 内容的服务，如果你杀掉它，你的 Mac 文件系统就无法完整索引，同时搜索能力将会大幅度减少直到 `mdworker` 重新运行，或者完整索引，杀掉它没有什么大问题，就是不建议。

### 我怎么样停止 mdworker 或者关闭 mdworker？
`mdworker` 我不建议关闭，因为如果要关闭 `mdworker`，就需要关闭 `spotlight`，但是如果真的想要关闭，请继续往下看

## spotlight[^2]

### 关闭 spotlight
1. 在终端命令输入 `sudo nano /etc/hostconfig`
2. 找到 `SPOTLIGHT=-YES-` 改成 `SPOTLIGHT=-NO-`，如果没有的话就在后面加上 `SPOTLIGHT=-NO-`
3. 保存，退出 nano 编辑器
4. 关闭索引，在终端输入 `mdutil -i off /`
5. 同时抹去 spotlight 索引 `mdutil -E /`
6. 重启系统

### 重新启动 spotlight
1. 按照 `关闭spotlight` 步骤，只不过把 `SPOTLIGHT=-NO-` 改成 `SPOTLIGHT=-YES-`
2. 终端输入 `mdutil -i on /`
3. 重启系统

### 修复spotlight[^3]
以下 `spotlight` 三种不工作的情况也可以参考上述操作 `spotlight` 方法来修复

*  `spotlight` 菜单高亮，但是却无搜索的行为
*  `spotlight` 有搜索行为，却不显示任何结果
*  `spotlight` 有结果，但是很少，不完全

1. 杀掉"SystemUIServerI"进程
    打开活动监视器，然后把 SystemUIServer 进程退出，过一会状态栏便会重建，一般情况下，spotlight就会正常

2. 手动重建 spotlight 索引
    1. 终端输入 `sudo mdutil -E /`
    2. 然后输入密码，一般情况要求管理员权限才能执行
    3. 然后会提示你索引将会重建，等待它完成重建，时间的长短取决于硬盘大小，文件数量等(PS:你也可以通过 MainMenu 工具重建 `spotlight` 索引)

3. 更改桌面分辨率（这个方法仅适用于点击 spotlight 后，没有显示搜索框的情况）

    这个问题比较少见，这个文章的笔者出现这个状况，有童鞋出现这个问题也可以参考
    方法就是打开显示器设置，里面更改分辨率，更改为小于你当前的分辨率，`640 × 480` 一般就
    正常工作了，然后重新恢复原来的分辨率，然后 `spotlight` 就会正常。

4. 清除caches和preferences

    这个方法是清除 `spotlight` 的 `caches` 和 `preferences`，最好是用 `MainMenu` 或者 `OnyX`，一般建议 MainMenu，因为简易一些

    安装` MainMenu` 后，图标会出现在状态栏，然后点击 `Cleaning` 把 `User Cache`, `System Cache`, `Font Caches` 不同种类的缓存清理掉

5. 重启 macOS
    有些时候重启就会修复 `spotlight`，但是尽可能的避免重启，重启是不大好的办法

最后普及一下 `mds`，`mdworker` 和 `spotlight` 的行为关系，是 **比利♂关系**，I'm just kidding ;)
`mds` 进程和 `mdworker` 进程一般情况下是在 `spotlight` 索引的时候同时运行的，让这些进程运行完成是和 Mac 文件系统搜索索引是有很大的关系的。

[^1]:[mdworker – What is mdworker?](http://osxdaily.com/2009/09/14/mdworker-what-is-mdworker/)
[^2]:[How to Completely Disable Spotlight](http://osxdaily.com/2007/03/22/how-to-completely-disable-spotlight/)
[^3]:[Spotlight won’t work? Fix a broken Spotlight menu with these troubleshooting tips](http://osxdaily.com/2007/02/15/spotlight-wont-work-fix-a-broken-spotlight-menu-with-these-troubleshooting-tips/)