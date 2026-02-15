---
title: "Logic Pro X 中使用 AUPitch 做高质的自动化曲线"
author: "Kcat"
date: "2017-08-27 23:27"
readTime: "4 min read"
tags: ["Logic Pro", "音乐后期", "DAW", "AUPitch", "Pitch Shifter", "Vocal Transformer"]
---

我想可能许多人都会使用到 `Pitch Shifter` 或者 `Vocal Transformer` 这两个效果器来处理音高效果

## Pitch Shifter

**Pitch Shifter** 提供了一种结合音高转换后版本的信号与原始信号的简单方法。使用音调移动获得最佳结果。

![Pitch Shifter](/images/use-aupitch-to-make-automation-curves-smooth-in-logic-pro-x/Auy88kzPbuWMlEisAOfZ8zeJQwxJe9TE.jpg)

## Vocal Transformer

**Vocal Transformer** 可用来移调声乐线的音高，增加或减少旋律的范围，或甚至将其减少到单个音符，以映射旋律的音高。无论您怎么改变旋律的音高，信号（共振峰）的组成部分都保持不变

![Vocal Transformer](/images/use-aupitch-to-make-automation-curves-smooth-in-logic-pro-x/yUV8yM6b0E3b8UIdmttQLA2tuk2q9zcV.jpg)

## 自动化曲线的问题

但是当处理自动化曲线音高效果的时候，可能上面两个使用上就会出现一些问题，我们一起来看一下

### Pitch Shifter

**Pitch Shifter** 需要调整的属性为 `Semi Tones`，但是由于单位量级的问题，就会出现下面这样的自动化曲线（已经不能称为曲线了，哈哈）：

![Pitch Shifter 自动化曲线](/images/use-aupitch-to-make-automation-curves-smooth-in-logic-pro-x/xfT0pvQ3nXaxN2uiCCFSEtSTJzerjoi4.jpg)

### Vocal Transformer

**Vocal Transformer** 需要调整的属性为 `Pitch`，而且是可以画出两个目标音高之间的自动化曲线：

![Vocal Transformer 自动化曲线](/images/use-aupitch-to-make-automation-curves-smooth-in-logic-pro-x/hkLFp1XqWJI8FyHRjnxvj6Td8HP6JtZ9.jpg)

但是，问题就在当 `Mix` 属性为正常100%开启后，未调整 `Pitch` 属性也会影响到原轨的质量，所以非常的纠结 :(

> 所以怎么办呢？Apple其实还开发了一个效果器 `AUPitch`，这个效果器解决了所有的问题

## AUPitch

**AUPitch** 可以在 `效果器列表` - `音频单元` - `Apple` 下找到：

![AUPitch位置](/images/use-aupitch-to-make-automation-curves-smooth-in-logic-pro-x/KPdIKJCjHHMKS59lgNHhQx0ju5L19BVF.jpg)

![AUPitch](/images/use-aupitch-to-make-automation-curves-smooth-in-logic-pro-x/gc0ApSDYmrdXj8W1uxp7i62ssgeJZ3Fp.jpg)

**AUPitch** 是通过调节 `音高` 属性的，并且当 `效果混合` 开启后也不会影响到原轨的质量

用 **AUPitch** 做自动化音高曲线：

![AUPitch自动化曲线](/images/use-aupitch-to-make-automation-curves-smooth-in-logic-pro-x/id9ZvFk9D9wC5ARXj10pc6ajFyNNHq9L.jpg)