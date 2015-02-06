---
layout: post
title:  "spring framework notes"
date:  2015-02-06 16:59:56
categories: spring-framework
---

###2015年2月6日

####ComponentScan

设定扫描路径，将自动把路径中的注解过的组件注册为Spring beans。默认检测@Component, @Repository, @Service, and @Controller

对于在配置文件中配置component-scan而言

include-filter exclude-filter 包含或排除指定类型的内容，过滤的类型从例子中目前只看到注解不知道还有哪些可过滤的选择。

需要注意的是对于include-filter component-scan的use-default-filters默认为true则结果将为默认的过滤器和自己设定过滤器的合集。

####DispatcherServlet

是Spring对于HTTP请求的中心分发器，根据实现的handlerMapping将请求按对应的规则分发给指定的handler/controller，对于一个web app而言可以有多个，在spring 3.1以后可以在web.xml（原文是说 a web application context）中配置注入，而不是内部自行生成，对于在支持可编程注册servlet实例的servlet 3.0版本中比较有用。

####ContextLoaderListener

是一个用来启动或停止Spring的根WebApplicationContext（为一个web程序提供配置的接口 程序运行时是只读的）引导监听器 ，\_(:з」∠)\_ 好像很厉害的样子(buzhidaoshishenmegui)。

####碰巧看见的东西

在类开头看到@XmlRootElement @JsonAutoDetect注解

@XmlRootElement相关的注解是属于JAXB Java Architecture for XML Binding Java类结构的XML绑定，貌似有很多xsd文件指定转换规则
@JsonAutoDetect相关的注解应该是可以配置说明自动检测类与JSON映射的规则吧，使用Jackson的ObjectMapper可以完成映射转换。






