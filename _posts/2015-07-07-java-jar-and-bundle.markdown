---
layout: post
title:  "java jar 和 bundle"
date:  2015-07-07 11:11:26
categories: java
---

###OSGi的bundle和jar包

####1. bundle和jar是同样类型的文件，从扩展名就能看出来- -，bundle是一个jar包

####2. jar包中的类的可见度

一般来说，在平常的class path下，所有的包中的类都是全局共享的，如果class path中同包下有两个相同的类，其中一个将会被忽略。而在OSGi中不同的bundle使用不同的类加载器，多个bundle共享一个虚拟机，与此同时，包间类的默认可见度也发生了变化（类均变为默认对其他bundle不可见），bundle间类的可见是由manifest文件中的`Import-Package`和`Export-Package`等`metadata`定义的，或者说他与一般的jar不同的就是这些告知OSGi如何使用它的这些说明信息。相应的，如果bundle不在OSGi容器中使用，就不存在这种可见度效果了。

####3. 其他
	
剩下的其实都算是在OSGi下bundle的特性了吧，多版本共存，声明bundle间的依赖，运行声明周期等等。

###maven打包bundle
使用`maven bundle plugin`打包（插件的instructions指令我还没搞清楚所有的写法），总之从下面的指令里还是能看出和一般jar的打包的区别的，在instructions中包含的定义，如果看过打好的bundle中的manifest文件就可以明白，这些就是打包时要写入manifest文件中的bundle的基本信息、依赖和包导入导出等metadata，总之就是OSGi能读懂的说明，规则什么的还是去容器的官网看spec比较靠谱。
{% highlight xml %}
<plugin>
    <groupId>org.apache.felix</groupId>
    <artifactId>maven-bundle-plugin</artifactId>
    <extensions>true</extensions>
    <configuration>
        <instructions>
            <Bundle-SymbolicName>${project.artifactId}</Bundle-SymbolicName>
            <Bundle-Description>${project.description}</Bundle-Description>
            <Import-Package>com.fasterxml.uuid;resolution:=optional,com.fasterxml.uuid.impl;resolution:=optional,com.fasterxml.uuid.ext;resolution:=optional,*;resolution:=optional</Import-Package>
            <DynamicImport-Package>*</DynamicImport-Package>
            <Embed-Dependency>*;scope=compile|runtime</Embed-Dependency>
        </instructions>
    </configuration>
    <version>${maven.bundle.plugin.version}</version>
</plugin>
{% endhighlight %}
