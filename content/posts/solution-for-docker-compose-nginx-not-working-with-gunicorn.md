---
title: "解决 Docker-compose 中 Nginx 无法正常代理 Gunicorn"
author: "Kcat"
date: "2017-07-18 23:07"
readTime: "4 min read"
tags: ["Docker", "Docker Compose", "Nginx", "Gunicore", "随笔小记"]
---

使用 Docker-compose.yml 用 command 启动 Gunicorn，同时启动 Nginx，但是 Gunicorn 的地址无法被 Nginx 正常代理

## 问题例子

### Docker-compose.yml

``` yaml
version: "3"

services:  
  app:
    build: ./app
    command: gunicorn -w 4 -b :5000 server:app
    expose:
      - 5000

  nginx:
    build: ./nginx
    ports:
      - 80:80
    links:
      - app
```

### nginx.conf

``` nginx
server {
    listen 80;
    server_name _;

    location / {
         proxy_pass http://app:5000;
         proxy_set_header Host $host;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 解决方法

1. 不使用 Docker-compose 中的 command，使用 Gunicorn 的 Configuration File[^1] 来配置  Gunicorn
2. 创建一个任意名称（例如：`gunicorn_config.py`）的 Python 文件放到主程序  `server.py`（名称以你情况而定），也就是 Gunicorn 需要启动 Python 程序的同一目录下
3. 更改 Docker-compose 的 command 为 `gunicorn --config=gunicorn_config.py master:app`

#### gunicorn_config.py 例子
``` python
bind = "0.0.0.0:5000"
workers = "4"
```

### 参考
* [Stack Overflow](https://stackoverflow.com/questions/29793944/docker-compose-nginx-does-not-work-with-django-and-gunicorn)

[^1]: [Configuration File](http://docs.gunicorn.org/en/latest/configure.html#configuration-file)

