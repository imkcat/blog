---
title: "Phabricator 解锁 Restricted Project"
author: "Kcat"
date: "2018-07-22 16:25"
readTime: "4 min read"
tags: ["随笔小记", "Phabricator"]
---

这是一个很无奈的问题，项目变成这样的状态：![Restricted Project](/images/unlock-restricted-project-in-phabricator/3wBsryciYFEBOP4Pft1jSsAtwvUwl87y.jpg)无法查询到项目，也无法编辑或者进入项目，解决了许久，最后其实发现自己只是想复杂了...

## 问题重现

1. 当项目只有自己的时候
2. 离开这个项目
3. 接着项目就变成了 `Restricted Project` 的状态

## 解决方案

其实只需要知道项目的 `PHID` 即可，但是通过 Phabricator 的 Web 端是无法查询到的，但是其实很简单，只需要进入 Phabricator 的数据库便可以查询到，一般为 `MySQL`，这里以它为例

1. 进入 MySQL
2. 选择 `phabricator_project` 数据库
3. 查询 `project` 表
4. 便可以通过 `name` 找到对应名字的项目数据列，`phid` 列便是它的 `PHID`，一般形式为 `PHID-PROJ-xxxxxxxxxxxxxxxxxxxx`
5. 退出 MySQL
6. 进入 Phabricator 目录下的 `bin` 子目录，运行以下命令即可
```bash
./policy unlock PHID-PROJ-xxxxxxxxxxxxxxxxxxxx
```