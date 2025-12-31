---
title: "使用 OpenSSL 生成 RSA 私匙和公匙"
date: "2017-03-10T08:52:00.000Z"
slug: "generate-public-and-privacy-rsa-key-with-openssl"
coverImage: "/images/2017/08/sYdgdyLR8uTHIfVDYDsVdlHIpnGU1mvr.jpg"
tags: ["genrsa", "OpenSSL", "RSA"]
author: "Kcat"
excerpt: ""
---
## What's OpenSSL

OpenSSL 是一个开源的面向安全传输层(TLS)和安全套接层(SSL)的工具集

## genrsa 命令

主要用于**生成** RSA 私匙

[genrsa](https://www.openssl.org/docs/manmaster/man1/genrsa.html) 的命令格式如下:

``` ini
openssl genrsa [-help] [-out filename] [-passout arg] [-aes128] [-aes192] [-aes256] [-aria128] [-aria192] [-aria256] [-camellia128] [-camellia192] [-camellia256] [-des] [-des3] [-idea] [-f4] [-3] [-rand file(s)] [-engine id] [numbits]
```

### 主要参数

* `-out`: 输出的文件名，如无此参数则会输出内容至命令行中
* `numbits`: 生成私匙的位数，默认为 `2048`

### 示例

``` bash
#!/bin/bash
openssl genrsa -out rsa_private_key.pem 2048
```

## rsa 命令

主要用于**处理** RSA 匙

[rsa](https://www.openssl.org/docs/manmaster/man1/rsa.html) 的命令格式如下:

``` ini
openssl rsa [-help] [-inform PEM|NET|DER] [-outform PEM|NET|DER] [-in filename] [-passin arg] [-out filename] [-passout arg] [-aes128] [-aes192] [-aes256] [-aria128] [-aria192] [-aria256] [-camellia128] [-camellia192] [-camellia256] [-des] [-des3] [-idea] [-text] [-noout] [-modulus] [-check] [-pubin] [-pubout] [-RSAPublicKey_in] [-RSAPublicKey_out] [-engine id]
```

### 主要参数

* `-pubout`: 指定输出为公匙而不是私匙
* `-in`: 输入文件
* `-out`: 输出的文件名，如无此参数则会输出内容至命令行中

### 示例

``` bash
#!/bin/bash
openssl rsa -pubout -in rsa_private_key.pem -out rsa_public_key.pem
```
