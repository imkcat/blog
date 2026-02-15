---
title: "firewalld 的基本用法"
author: "Kcat"
date: "2017-03-14 17:49"
readTime: "4 min read"
tags: ["firewall-cmd", "firewalld"]
---

在 **RHEL 7** 和 **CentOS 7** 之后，都使用了 `firewalld` 来作为防火墙管理工具，只不过底层实现还是 `iptables`，并且主要使用 `firewall-cmd` 来配置

## 防火墙配置

防火墙主要有两种配置：`运行时`和`永久`

* `运行时`：在运行时下的配置修改都不是永久生效的，都会在重新加载后，加载永久下的配置为运行时的配置
* `永久`：修改永久下的配置，在重新加载后，都会覆盖运行时的配置，并且永久生效

## 可选参数说明

* `[--permanent]`：加上此参数代表的是修改永久下的配置，不带则是运行时的配置
* `[--zone=xx]`：加载此参数代表指定区域，例如 `public`

## 区域(Zone)

防火墙中可配置多种区域，并且也可激活指定的区域为当前区域

``` bash
#!/bin/bash
firewall-cmd --get-zones   // 获取所有的区域
firewall-cmd --get-active-zones   // 获取当前激活的区域
```

## 服务(Service)

服务就是当前防火墙允许可用的服务，例如 `ssh`、`ftp` and so on

``` bash
#!/bin/bash
firewall-cmd [--permanent] --get-services   // 获取所有的服务
firewall-cmd [--permanent] [--zone=zone] --add-service xx   // 添加指定的服务项
firewall-cmd [--permanent] [--zone= zone] --remove-service xx   // 移除指定的服务项
```

## 端口(Port)

当然，你也可以开放指定协议下的端口，或者禁用指定协议下的端口

``` bash
#!/bin/bash
firewall-cmd [--permanent] [--zone=xx] --add-port= portid/protocol   // 添加指定协议下的端口
firewall-cmd [--permanent] [--zone=xx] --remove-port= portid/protocol   // 移除指定协议下的端口
```

## 重载防火墙

在修改过区域设置，你可能需要重载防火墙以便配置生效

``` bash
#!/bin/bash
firewall-cmd --reload
```
