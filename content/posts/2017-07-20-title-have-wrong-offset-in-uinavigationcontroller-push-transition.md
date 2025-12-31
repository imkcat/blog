---
title: "在 UINavigationController 的 Push 过渡动画中 Title 的错误位移"
date: "2017-07-20T10:08:34.000Z"
slug: "title-have-wrong-offset-in-uinavigationcontroller-push-transition"
coverImage: "/images/2017/08/VKurHzrX6asXEoy0oecG6tOIvhd233E1.jpg"
tags: ["iOS", "Bugs report", "UINavigationController"]
author: "Kcat"
excerpt: ""
---
## Bug 描述
在 UINavigationController 处理 Push 方式的过渡动画中，父级 UIViewController 的 Title 在少于 **3个英文字符** 或 **2个中文字符** 的时候，会出现过渡的偏差

## Bug 复现步骤
1. 需要两个 UIViewController 并且被一个 UINavigationController 管理
2. 父级 UIViewController 的 Title 必须少于 **3个英文字符** 或 **2个中文字符**
3. Push 到下一级 UIViewController
4. 在屏幕左侧拖拉当前 UIViewController

## Bug 截图
| 字符数量 | 截图 | 表现情况 |
| :-: | :-: | :-: |
| 一个英文字符 | ![一个英文字符](/images/2017/08/nvX2xTqV4rqwxdF6rIowScigVBxQFw0e.jpg) | 偏差最大 |
| 两个英文字符 | ![两个英文字符](/images/2017/08/ZnRm7FxRZr2Uv73C3YGFRiU7Pkp82JNZ.jpg) | 略有偏差 |
| 三个英文字符 | ![三个英文字符](/images/2017/08/jwQ98w9FnBwnxJNflY44vAmVrU8aTTE7.jpg) | 基本正常 |

## Bug 处理
- ~~已提交至 Apple Bug Reporter~~
- ~~在 iOS 11 beta 4 (15A5327g) 中修复~~

![已修复](/images/2017/08/AcDWTY8kBD4M0b8QkYgNKluLJROniFrW.jpg)