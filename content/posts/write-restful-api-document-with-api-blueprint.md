---
title: "使用 API Blueprint 来编写 RESTful API 文档"
author: "Kcat"
date: "2017-11-30 23:34"
readTime: "4 min read"
tags: ["API Blueprint", "Markdown", "RESTful", "API", "Sublime Text", "Atom", "snowboard", "aglio"]
---

可能在很多地方，编写文档或许是非常敷衍或潦草的事情，一个可能连排版都没有的 Word 文档可能就充当了文档的重要地位，但是这对于开发协作和后期的未知问题，仅仅只是时间的问题。在开发 RESTful API 中，随着时间的增长，API 的数量越来越多，查阅维护整理也就变得更加需要，文档需求的地位就越来越高。而编写 RESTful API 文档的方式有很多，例如：RAML、Swagger、apiDoc... 而我选择的是 API Blueprint，为啥呢？因为是用 `Markdown` 来进行编写，而且能够利用一些工具通过语法渲染成文档网页，何乐而不为呢？

## I. 语法

之前我们讲了，API Blueprint 虽然是以 Markdown 为基础语法，但后缀名规范保存为 `.apib` 而不是 `.md` ，想入坑也是要记住一些 API Blueprint 规范的指定语法的，语法方面我认为只需要讲比较重要的要点而不需要详细来讲，想了解更加进阶和详细的用法需要去看一下[官方文档](https://github.com/apiaryio/api-blueprint/blob/master/API%20Blueprint%20Specification.md)，官方文档非常详细

###### 我写了个我认为便于理解的例子：

``` markdown
# Group Apple
此组下的所有资源都和 Apple 有联系

## 手机 [/phones/{phone_id}]
代表 Apple 所有已发布的手机

+ Model (application/json)
    + Body
            {
                "id": 手机ID,
                "name": 手机名称,
                "release_date": 手机发布时间
            }
            
### 获取手机信息 [GET]
获取手机详细信息

+ Parameters
    + phone_id (string, required) - 手机ID

+ Response 200
    [Phone][]

```

### Group
从以上例子中能看到 `Group` 关键字，了解 RESTful[^1] API 的童靴应该都知道 API 是以 `Resource(资源)` 为操作单位的方式进行开发，`Group` 关键字代表关系紧密资源的一个集合

### Resource
我们已经知道是作为 API 中操作的基本单位模型

###### 例子中 `手机` 就是 `Resource`：

- 名称后面包含了资源的 URL
- `Model` 关键字定义了资源的模型，为了方便资源可在 API Blueprint 中重复利用

### Action
`Action` 就是对资源的操作，资源可以包含 `增删改查` 等操作，就可以理解为操作类似数据库中的数据一样

- 创建一个资源: [POST] `https://api.com/phones`
- 删除一个资源: [DELETE] `https://api.com/phones/phone_id`
- 获取一个资源: [GET] `https://api.com/phones/phone_id`
- 更新一个资源: [PUT] `https://api.com/phones/phone_id`

###### 例子中 `获取手机信息` 为获取资源的操作：

- 后面的 `GET` 就是 HTTP 的请求方法
- `Parameters` 代表了 URL 的参数，也就是 `手机` URL 中的 `{phone_id} `，其中也包括类型和是否是必需参数
- `Response` 就是 HTTP 请求的响应体，后面跟 `状态码`

## II. 编写工具

编写 Markdown 当然几乎任何文本编辑器都可以胜任，但是如果你想要 `语法高亮` 的话，那就需要配合一些额外的文本编辑器扩展来达到需求，下面我就推荐几个 `文本编辑器 + 扩展` 的组合

### Sublime Text + API Blueprint Sublime Text Plugin

Sublime Text 是许多人常用的文本编辑器，我在这里就不多加描述了，[API Blueprint Sublime Text Plugin](https://github.com/apiaryio/api-blueprint-sublime-plugin) 能够让 Sublime Text 支持 API Blueprint 的语法高亮，我使用这个工具组合进行编写 API Blueprint 的

### Atom + API Blueprint Grammar for Atom + API Blueprint Preview

Atom 是由 GitHub 开发的自由及开放源代码的文字与代码编辑器，拥有非常多的插件

[API Blueprint Grammar for Atom](https://github.com/danielgtaylor/atom-language-api-blueprint) 能够为 Atom 带来语法高亮的特性

[API Blueprint Preview](https://github.com/danielgtaylor/atom-api-blueprint-preview) 能够让 Atom 给 API Blueprint 文档渲染成 HTML 网页进行预览

## III. 渲染工具

编写完了 API Blueprint 文档之后，API Blueprint 的另一大方便之处就是可以渲染成静态 HTML 让工作的同事或需要查阅 API 的人员方便查看，工具比较常用的一般是 [snowboard](https://github.com/bukalapak/snowboard) 和 [aglio](https://github.com/danielgtaylor/aglio)

[^1]:[Representational state transfer](https://en.wikipedia.org/wiki/Representational_state_transfer)