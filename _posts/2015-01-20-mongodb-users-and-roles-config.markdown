---
layout: post
title:  "mongoDB用户权限配置笔记"
date:  2015-1-20 17:23:04
categories: mongodb
---
#####mongodb version 2.6.2

###无任何数据的空mongodb数据库
空数据库中将无任何user数据，第一次登录可通过mongod加--noauth参数（其实不添--auth参数应该就无权限验证）或通过localhost exception（默认开启），启动时可通过--setParameter设定是否开启。启动mongod后使用mongo即可登录。

###创建用户

使用admin数据库

>use admin

在admin数据库中创建用户，赋予用户权限

>db.createUser(
>  {
>    user: "siteUserAdmin",
>    pwd: "password",
>    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
>  }
>)

其中roles 中 userAdminAnyDatabase 

角色是admin数据库中内建的角色，有为所有数据库分配用户及角色的权限，但是不能访问collection中的数据，详细的mongodb内建角色可访问[http://docs.mongodb.org/manual/reference/built-in-roles/](http://docs.mongodb.org/manual/reference/built-in-roles/)查看详细说明，其中root为最高权限，__system为软件内部角色不应该使用。
另外用户权限相关命令可查看[文档说明](http://docs.mongodb.org/manual/reference/security/)。


之后使用mongod –auth有权限的方式启动后，可使用mongo 【数据库名】-u 【用户名】 -p 【密码】的参数登录，之后用户可执行赋予的权限范围内的命令。


###ip访问限制
我没有从mongodb的说明文档中找到限制某用户只能从某ip登录的设置方式，说明文档只提及了两种关于数据库访问显示的方法：

1.通过配置文件或启动参数，在mongod启动的时候设定bind_ip，如：

配置文件中添加

>net:
>  		bindIp: 127.0.0.1,192.168.X.XX

或启动时添加 --bind_ip

修改需要重新启动数据库

2.是使用操作系统或第三方解决方案来限制对于mongod运行实例的ip和端口访问，如Linux使用IPtable，windows使用防火墙或其他方案。

###最后

需要获得其他内容建议访问[http://docs.mongodb.org/manual/reference/](http://docs.mongodb.org/manual/reference/)查看。
另外如果用户通过mongo登录后，mongod命令行提示Unauthorized not authorized on XXX to execute 

command之类的内容并不是登录认证，只是用户分配的角色是有限制的，不能执行所命令。

话说用MongoVUE 1.5.3创建的用户用的是版本1的用户权限方案还是蛮坑的，执行 db.getSiblingDB("admin").runCommand({authSchemaUpgrade: 1 }); 可以升级权限方案。

