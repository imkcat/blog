---
title: "World Creator 2 和 Unreal Engine 4"
date: "2020-03-22T13:56:47.000Z"
slug: "world-creator-and-unreal-engine"
coverImage: "/images/2020/03/xezwy7VFxTbEopgHxO4X3HfPB6qBDxzA.jpg"
tags: []
author: "Kcat"
excerpt: ""
---
> World Creator 2 是个非常强大的 Landscape 制作工具，而且在 GUI 和可视化方面还是要比 World Machine 要现代化太多了（虽然 World Machine 也有 GeoGlyph），再加上对 Game Engine 的友好度，就是它了

## 基础

Unreal 的 Landscape 有两个基本要素，**Component** 和 **Section**

### Component

Landscape 由若干个 `Component` 组成，Component 作为虚幻中 Landscape 的基本 **渲染单元**、**可视性计算单元**和**碰撞单元**

![urQLM6EST9TpXRHDh0tTMlw8SONJn7JN](/images/2020/03/urQLM6EST9TpXRHDh0tTMlw8SONJn7JN.jpg)

### Section

一个 Component 可以由 1(1 * 1) 或 4(2 * 2) 个 `Section` 组成

`Section` 是 Landscape 中 LOD 计算的基本单元

![OPmDZYArPbLNNJ24ZDM6GWLpGoKdvEsC](/images/2020/03/OPmDZYArPbLNNJ24ZDM6GWLpGoKdvEsC.jpg)

### 建议尺寸

Unreal 有一些建议尺寸和属性，列表如下：

![2NAV6v7EPk5ns3pWNdLDzvGQIvYCxiAH](/images/2020/03/2NAV6v7EPk5ns3pWNdLDzvGQIvYCxiAH.jpg)

## 用 World Creator 2 创建 Landscape Height Map

我们随意制作一个 Landscape，这里就不详细介绍 World Creator 2 的制作了，我们可以设置 `Terrain Size` 为 Unreal 建议的一个尺寸建议：`4033 * 4033`

![1Tw5zhpnlHUSZsYwUxXUigRpQUGZ6lsT](/images/2020/03/1Tw5zhpnlHUSZsYwUxXUigRpQUGZ6lsT.jpg)

下面进行导出操作

![XHeXwSNeMrHNeigCgvHpw1M5gyssfVlO](/images/2020/03/XHeXwSNeMrHNeigCgvHpw1M5gyssfVlO.jpg)

`Scale Z` 数值需要记住，在导入至 Unreal 时需要

`Flip Y` 是非常重要的选项，不勾选的话，创建的 Unreal Landscape 会是以 Y 轴镜像相反的

点击 Export 便可以进行导出处理

## 导入 Height Map 至 Unreal

打开 Unreal 便可以创建一个 Landscape 然后导入 Height Map 文件

![bWAG2Q1cmx1q6uIaJGZMt2NDNZEN2yNa](/images/2020/03/bWAG2Q1cmx1q6uIaJGZMt2NDNZEN2yNa.jpg)

一般情况下，便会自动匹配 Height Map 自动设置所有参数，如果没有的话，点击 `匹配数据` 便可以匹配参数

> 注意 `Scale Z` 不要忘记设置，因为在 Unreal 中创建 Landscape 时会在 Z 轴进行缩放，设置这个数值便可以修复 Landscape 高度差过大的问题

最后点击导入即可

## References

- [Landscape Technical Guide](https://docs.unrealengine.com/en-US/Engine/Landscape/TechnicalGuide/index.html)