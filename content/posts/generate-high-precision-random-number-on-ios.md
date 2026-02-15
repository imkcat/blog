---
title: "iOS 高精度随机数"
author: "Kcat"
date: "2015-01-04 07:25"
readTime: "4 min read"
tags: ["iOS", "随笔小记"]
---

在iOS开发中，对于随机数的生成，很多同学可能会使用例如 `random()` 或者 `rand()` 这样的函数，但是我在实际开发中并没有达到实际所要求的随机需求，所以在查找了相关的资料后发现了 `arc4random()` ，达到了我的预期要求

由于 `rand()` 和 `random()` 这样的函数并不是真正的伪随机数产生器，而 `arc4random()` 是一个真正意义上的伪随机数产生器

``` objectivec
// 生成一个fromValue至toValue之间的随机浮点数
((float)arc4random() / 4294967296) * (toValue - fromValue) + fromValue
```

另外还有一个函数为 `arc4random_uniform` ，并且要比 `arc4random()` 生成的随机数更加的平均一些

``` objectivec
// 生成一个fromValue至toValue之间的随机数
fromValue+arc4random_uniform((toValue - fromValue) + 1)  
```