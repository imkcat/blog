---
title: "使用 Flask-Migrate 来迁移数据库"
author: "Kcat"
date: "2017-08-07 22:30"
readTime: "4 min read"
tags: ["Python", "Database"]
---

使用 Flask-SQLAlchemy[^1] 的童靴，可能会经常改动某些数据模型的属性，当然有更好的选择，那就是 Flask-Migrate[^2]

## 安装
安装我觉得其实可以忽略这一步;)，肯定用 `pip` 啦

``` bash
pip install Flask-Migrate
```

## 使用

有两个方式可以使用 `Flask-Migrate` ，我一一介绍

### 使用 Flask

下面是官方例子

``` python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
```

通过三个命令即可进行迁移

``` bash
$ flask db init
```

`init`命令会初始化一个迁移脚本的版本管理仓库至`migrations`目录

``` bash
$ flask db migrate
```

执行`migrate`命令后会生成所有的迁移脚本

``` bash
$ flask db upgrade
```

最后`upgrade`命令就是迁移的操作

### 使用 Flask-Script

Flask-Script[^3] 是 `Flask` 的一个扩展包，用来使用扩展脚本

下面是官方例子

``` python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))

if __name__ == '__main__':
    manager.run()
```

它最大的不同就是让一个名为 `manager` 的实例来运行，它其实理解为 `加了扩展的Flask实例` 而已，但是缺点是如果使用 `Gunicorn` 启动会有一些问题，解决方法[^4]

使用 `Flask-Script` 和直接使用 `Flask` 来迁移的命令很相似

``` bash
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
```

其中需要注意的就是以 python 文件方式来处理迁移脚本

[^1]: [Flask-SQLAlchemy Source](https://github.com/mitsuhiko/flask-sqlalchemy)
[^2]: [Flask-Migrate Source](https://github.com/miguelgrinberg/Flask-Migrate)
[^3]: [Flask-Script Source](https://github.com/smurfix/flask-script)
[^4]: [How to use Flask-Script and Gunicorn](https://stackoverflow.com/questions/14566570/how-to-use-flask-script-and-gunicorn)