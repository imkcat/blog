---
title: "Swift & C"
author: "Kcat"
date: "2018-01-05"
readTime: "5 min read"
imageUrl: "/images/swift-and-c/index.jpg"
tags: ["Swift", "C", "LLVM"]
slug: "swift-and-c"
---

因为 Swift 是建立在 LLVM 之上的，所以 Swift 是支持与 C 交互的。但是在 Swift 中，让其与 C 混编是一件说起来有点麻烦又不太麻烦的事儿，麻烦就是要实现混编可能需要一些零碎的步骤，不麻烦就是 Swift 也提供了和 C 对应的等价类型来进行转换使用

## 让 Swift 可调用 C

### 创建 Module Map 文件

Swift 是建立在 LLVM[^2] 之上的，并且两者都是 Chris Lattner 的杰作，所以当然也就支持 LLVM 的 Module[^3] 模块，而我们需要使用的是此模块中的 Module Map Language[^4]

`Module Map Language` 是用来描述模块头文件逻辑的，而我们需要为模块创建一个名称为 `module.modulemap` 的文件，并且文件需要使用 `Module Map Language` 来描述模块逻辑，以便 Swift 导入

首先我们拥有这样一个结构的目录：

![Project structure](/images/swift-and-c/kVWM6Efytv4CPYCerBTIxB6Xc7MVAexn.jpg)

我们拥有两个 C 文件名为 `hello.c` 和 `hello.h`，并且 `hello.c` 只有一个函数 `hello`

``` c
#include "hello.h"

void hello() {
    printf("Hello");
}
```

我们现在目前是无法进行调用的，这个时候需要在 `Hello` 目录下创建一个文件名为 `module.modulemap` 的 Module Map 文件，并且内容为：

```
module Hello {
    header "hello.h"
    export *
}
```

这段表示我们创建了一个名为 `Hello` 的模块，并且描述了 `hello.h` 为头文件

### 导入 Module Map 文件

创建好了 Module Map 文件之后，我们需要让编译器能够找到 Module Map 文件，这样才可以进行调用

我们进入 `Build Settings` 中，找到 `Swift Compiler - Search Paths` 部分下的 `Import Paths`，把 Module Map 文件的路径添加上：

![Import Paths](/images/swift-and-c/8ELgQjEBZqnyoHZPl8gaXfVBRATeOeZZ.jpg)

### 调用 C 函数

这个时候，便可以在任意的 Swift 文件中导入 Hello 模块并使用 C 函数：

``` swift
import Hello

func printHello() {
    hello()
}
```

## Swift & C 的交互

### Swift & C 的等价类型表

在 Apple 的官方文档[^1]中，就详细列出了两者之间的等价类型:

| C | Swift | Typealias |
| :-: | :-: | :-: |
| bool | CBool | Bool |
| char, signed char | CChar | Int8 |
| unsigned char | CUnsignedChar | UInt8 |
| short | CShort | Int16 | 
| unsigned short | CUnsignedShort | UInt16 |
| int | CInt | Int32 |
| unsigned int | CUnsignedInt | UInt32 |
| long | CLong | Int |
| unsigned long | CUnsignedLong | UInt |
| long long | CLongLong | Int64 |
| unsigned long long | CUnsignedLongLong | UInt64 |
| wchar_t | CWideChar | UnicodeScalar |
| char16_t | CChar16 | UInt16 |
| char32_t | CChar32 | UnicodeScalar |
| float | CFloat | Float |
| double | CDouble | Double |

[^1]:[Interacting with C APIs](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithCAPIs.html#//apple_ref/doc/uid/TP40014216-CH8-ID17)
[^2]:[LLVM](http://llvm.org/)
[^3]:[LLVM Modules](http://clang.llvm.org/docs/Modules.html#modules)
[^4]:[Module Map Language](http://clang.llvm.org/docs/Modules.html#module-map-language)