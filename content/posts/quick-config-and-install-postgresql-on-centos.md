---
title: "CentOS 下 PostgreSQL 的快速安装和配置"
author: "Kcat"
date: "2017-03-13 22:51"
readTime: "4 min read"
tags: ["CentOS", "PostgreSQL"]
---

此篇博客面向新手，所以比较通俗易懂，如有不够严谨的地方请指出，不接受撕逼 ;)

## 安装 PostgreSQL 环境

### 新装环境

首先如果是新安装 CentOS 的时候，可以从`已选环境的附加选项`中勾选 `PostgreSQL 数据库服务器`选项以便默认安装，减少配置步骤

### 已装环境

当然，如果是已有 CentOS 环境，那么可以通过以下命令安装`PostgreSQL 数据库服务器`

``` bash
#!/bin/bash
sudo yum install postgresql
sudo yum install postgresql-server
```

## 配置 PostgreSQL

### 更改系统用户 postgres 密码

安装过后，系统用户会增加一个名为 `postgres` 的用户，默认没有密码，那么便更改它的系统用户密码

``` bash
#!/bin/bash
sudo passwd postgres
```

### 创建一个数据库集群[^1]目录并且给予 postgres 用户对此目录的操作权限

我们需要创建一个给`数据库集群`存放的目录(目录自行决定，以下集群目录都将以 `PATH` 来代表)，并且目录下的权限需要指定为 `postgres` 用户可读写，其他用户无法读写

``` bash
#!/bin/bash
su   // 切换为root用户
mkdir PATH   // (PATH路径请自行决定)
chown -R postgres:postgres PATH	   // 使目录属主和属组都为postgres
```

### 初始化数据库集群

切换为 `postgres` 用户，然后对集群目录进行初始化

``` bash
#!/bin/bash
su postgres   // 切换为 postgres 用户
initdb -D PATH   // 初始化数据库集群，如果已经设置了 $PGDATA 环境变量，-D可忽略
```

### 启动数据库服务器

`pg_ctl` 是 `PostgreSQL` 封装的一个程序，可以用于初始化，启动，停止，重启 `PostgreSQL` 数据库集群等操作

``` bash
#!/bin/bash
pg_ctl start -D PATH   // 启动数据库服务器
```

如果没有什么问题，那么现在数据库服务器是正在运行的 ;)

[^1]:**数据库集群(标准SQL术语称为目录集群)**：用文件系统的术语来说，一个数据库集群是一个目录，所有数据都将存放在这个目录中