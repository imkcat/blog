---
title: "pip 的基本用法"
date: "2017-03-10T02:32:00.000Z"
slug: "use-case-for-pip"
coverImage: "/images/2017/08/rhiTxDUpEUaBEHXsBYeCU0Sv3qaYkLfA.jpg"
tags: ["Python", "pip", "virtualenv"]
author: "Kcat"
excerpt: ""
---
在 `virtualenv` 中，我们可以很方便的将当前 `virtualenv` 环境下所有所需的包清单至一个指定文件中，同时也可以很轻松的使用这个文件来批量安装所有所需的包

## 进入 virtualenv 目录并且激活环境

打开命令行

``` bash
#!/bin/bash
cd [virtualenv-path]  // 首先进入指定的virtualenv目录
source ./bin/activate  // 激活环境
```

## 生成 requirements.txt 包清单文件

``` bash
#!/bin/bash
pip freeze > requirements.txt
```

这句代码将会生成一个 `requirements.txt` 文件至 `virtualenv根目录`，`requirements.txt` 文件名是可选的，无所谓什么名字，`requirements.txt` 只是一个被规范成大家使用的名称而已

生成的 `requirements.txt` 文件格式如下:

``` ini
Flask==0.12
Flask-HTTPAuth==3.2.2
Flask-SQLAlchemy==2.2
Jinja2==2.9.5
MarkupSafe==1.0
six==1.10.0
SQLAlchemy==1.1.6
...
```

## 安装 requirements.txt 包清单文件至 virtualenv

``` bash
#!/bin/bash
pip install -r requirements.txt
```

这句代码会把包清单中所有指定的包安装到当前的 `virtualenv` 中

## 退出已激活 virtualenv 环境

``` bash
#!/bin/bash
deactivate  //退出当前激活的环境
```
