---
layout: post
title:  "测试环境服务器出现 java.lang.NoClassDefFoundError: Could not initialize class sun.awt.X11GraphicsEnvironment"
date:  2015-08-07 09:51:26
categories: java
---

###Activiti 生成流程图

测试环境在`Activiti`生成流程图的时候偶尔会出现错误：

> java.lang.NoClassDefFoundError: Could not initialize class sun.awt.X11GraphicsEnvironment

但是只要出现一次就一直引起后端报错。看起来应该和Activiti没有关系，而是和调用的图形功能有关。

###解决

解决方案似乎很快就找到了，虚拟机启动添加参数：

> -Djava.awt.headless=true

或运行的程序执行：

> System.setProperty("java.awt.headless", "true"); 

###原因

图形库调用似乎会使得程序试图调用`XWindows`运行在图形界面中，当对应的 dll 或者 so 文件找不到的时候就会出现这样的类定义找不到的错误。真正的解决方案似乎是需要安装 Xorg 相关的库，并将他们置于 classpath 中。headless 的设定是让程序不运行在图形界面下，而是运行在命令行模式下，这对一般的 web 程序应该是没影响的，但是对于有 UI 交互的程序就不适用了，还是需要解决依赖问题才行。


