---
title: "GraphQL 标准概览"
author: "Kcat"
date: "2020-01-09"
readTime: "4 min read"
tags: ["GraphQL"]
---

本篇基于 [2018 六月份](https://graphql.github.io/graphql-spec/June2018/) 发布的版本

## 简介 Overview

---

`GraphQL` 来自于 **Facebook**，Facebook 从 2012 年开始构思，在 2015 年正式发布开源

GraphQL 由两部分组成： `(GraphQL) Query Language` 和 `(GraphQL) Engine`，就如 `SQL` 和 `Database` 一样的关系，只不过 GraphQL 在 API 架构上表达了这种设计模式

客户端方一样需要发送请求至后端方，方式可以是 HTTP 亦或 WebSocket，只不过请求体本身的介质是 `Query Language`

后端方定义了整个 `Engine` 的所有类型和数据操作方式，而这个整体的表达称为 `Schema`

## 类型系统 Type System

---

> 以下的内容是表现在 Schema 上的


### 查询 Query

每个 Schema 都必须拥有一个顶级类型，那就是 `Query`，Query 即代表了查询数据的方式

Schema:
```graphql
type Query {
  version: String
}
```

Client:
```graphql
query {
  version
}
```

### 变动 Mutation

当需要对数据进行操作的话，是需要编写 `Mutation` 来进行的

Schema:
```graphql
type User {
  name: String
}

type Mutation {
  setName(name: String): User
}
```

Client:
```graphql
mutation {
  setName(name: "Zuck") {
    name
  }
}
```

### 基本类型 Scalars

- Int
- Float
- String
- Boolean
- ID

前四个就不需要过多描述了，而 `ID` 这个类型，字面意思上也肯定知道是用作 ID 的，但是同时可能就会有一些疑问，用 `Int`，`String` 不都可以用作 ID 么，`ID` 这个类型不就很多余么？

`ID` 可以是 `String` 类型，也可以是 `Int` 类型，它不是为了可读性，只是为了提供了一种多变的类型

### 对象 Objects

对象非常简单理解，就是字面意思，它包含了一系列的字段，而这些字段一般都是由 Scalar 或其他类型组成

Schema:
```graphql
type Person {
  name: String
  age: Int
  picture: String
}
```

#### 字段查询 Field Query

让某一个字段变成 Query，这样可以更加形象的描述 Object 和 Query 之间的上下关系结构

Schema:
```graphql
type Person {
  name: String
  pictures(size: Int): [String]
}
```

Client:
```graphql
query {
  user {
    name
    pictures(size: 10)
  }
}
```

#### 弃用字段 @deprecated

在某一个字段后面添加 `@deprecated`，即代表这个字段为弃用状态

Schema:
```graphql
type ExampleType {
  oldField: String @deprecated
}
```

并且可以给 @deprecated 添加 `reason` 字段，用以描述 **弃用理由**

Schema:
```graphql
type ExampleType {
  oldField: String @deprecated(reason: "Reason description")
}
```

#### 对象扩展 Object Extensions

对象扩展就是对现有的 Object 进行扩展，而无需增加一个新的 Object，和编程语言中 `Extension` 是一样的功能

Schema:
```graphql
extend type Story {
  isHiddenLocally: Boolean
}
```

### 接口 Interfaces

`Interface` 由一系列的字段组成，定义了一种实现协议，当某个 Object 实现了一个 Interface，那么就需要实现这个 Interface 里面的所有字段

Schema:
```graphql
interface NamedEntity {
  name: String
}

interface ValuedEntity {
  value: Int
}

type Person implements NamedEntity {
  name: String
  age: Int
}

type Business implements NamedEntity & ValuedEntity {
  name: String
  value: Int
  employeeCount: Int
}
```

Client:
```graphql
query {
  business(name: "business_name") {
    name
    value
    employeeCount
  }
}
```

### 联合 Unions

`Union` 是多个类型并集成一个类型，让这个并集类型可以同时拥有多个类型的字段，但是它在 Runtime 只能是其中一个类型


Schema:
```graphql
union SearchResult = Photo | Person

type Person {
  id: ID
  name: String
  age: Int
}

type Photo {
  id: ID
  height: Int
  width: Int
}

type SearchQuery {
  firstSearchResult: SearchResult
}
```

Client:
```graphql
{
  firstSearchResult {
    id
    ... on Person {
      name
      age
    }
    ... on Photo {
      height
      width
    }
  }
}
```

### 枚举 Enums

`Enum` 即枚举类型，无需多言

Schema:
```graphql
enum Direction {
  NORTH
  EAST
  SOUTH
  WEST
}
```

### 输入对象 Input Objects

`Input Objects` 为组织字段的结合体，可以组织一些字段成为一个集合结构，这样可以对字段进行约束和规范，且应只使用于 Mutation，Query 不应使用 Input

Schema:
```graphql
input CreatePoint2DInput {
  x: Float
  y: Float
}

type Mutation {
  createPoint2D(input: CreatePoint2DInput)
}
```

### 列表 List

`List` 即集合类型，正如编程语言中的 List 作用一样，包含一系列同样类型的元素

Schema:
```graphql
type Students {
  id: ID
  name: String
  age: Int
}

type Class {
  students: [Students]
}
```

## Fragments 片段

`Fragment` 主要存在于 Client 方的 Query Language 中

```graphql
query withFragments {
  user(id: 4) {
    friends(first: 10) {
      ...friendFields
    }
    mutualFriends(first: 10) {
      ...friendFields
    }
  }
}

fragment friendFields on User {
  id
  name
  profilePic(size: 50)
}
```

## Pagination Guideline 分页规范

GraphQL 中的建议分页规范是使用基于 `Cursor(游标)` 的分页方式

Schema:
```graphql
type Student {
  id: ID
  name: String
  age: Int
}

type StudentEdge {
  cursor: String!
  node: Student
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String!
  endCursor!
}

type StudentConnection {
  edges: [StudentEdge]
  nodes: [Student] // Optional use
  pageInfo: PageInfo!
  totalCount: Int!
}

type Class {
  students(first: Int, after: String, last: Int, before: String): StudentConnection
}
```

### 参数作用

> 参数一般为 first & after 或 last & before 配合使用

first: 从前到后取出的数量
after: 从前到后开始取值的游标位置

last: 从后到前取出的数量
before: 从后到前开始取值的游标位置

