---
layout: post
title:  "在Windows下运行Jekyll"
date:   2015-01-01 22:42:29
categories: jekyll windows
---
在windows配置运行环境坑确实不少\_(:з」∠)\_，[github帮助页面](https://help.github.com/articles/using-jekyll-with-pages/)上看起来似乎是挺简单的。

###1. 安装Ruby
从[ruby官网下载页面](https://www.ruby-lang.org/en/downloads/)的说明找到[rubyinstaller](http://rubyinstaller.org/)（Ruby安装工具）。

>下载 -> 安装（安装路径文件夹名字中不能有空格）-> 添加环境变量

###2. 安装bundler - 包管理器
好吧，输入`gem install bundler`回车，喜闻乐见的看到返回证书错误~那就不用https协议吧。

{% highlight Windows batch files %}
gem sources --remove https://rubygems.org/
gem sources --add http://rubygems.org/
{% endhighlight %}

###3. 安装Jekyll
在repository下创建了`Gemfile`
{% highlight Ruby %}
source 'http://rubygems.org'
gem 'github-pages'
{% endhighlight %}

输入`bundle install`，console告诉我它在解析依赖，结果安装第一个依赖包RedCloth的时候就报错了，好吧原来还需要安装rubyinstaller的[DEVELOPMENT KIT](http://rubyinstaller.org/downloads/)，RedCloth需要build环境。

解压好DEVELOPMENT KIT之后还需要执行dk.rb完成安装
{% highlight Windows batch files %}
ruby dk.rb init
ruby dk.rb install
{% endhighlight %}

配置完成后再在Gemfile所在目录执行`bundle install`，依赖成功下载。

###4. 使用Jekyll生成空博客
在repository目录下执行
{% highlight Windows batch files %}
jekyll new .
{% endhighlight %}
结果返回错误，好吧目录还把必须是空的，移走文件。。。

###5. 在本地预览
在repository目录下执行
{% highlight Windows batch files %}
jekyll serve
{% endhighlight %}
居然又报错了\_(:з」∠)\_，找不到which指令似乎没有影响serve启动，但是之后pygments（用来处理语法高亮的）报错，`_site`下生成的静态页面都是空白的。

Goooogle...

pygments需要python2，我安装的是python3，怪我咯。。。
最后我直接换成rouge处理高亮了。
{% highlight Windows batch files %}
gem install rouge
{% endhighlight %}

修改空博客目录下的_config.yml，添加：
{% highlight Windows batch files %}
highlighter: rouge
{% endhighlight %}

重启jekyll serve，终于看到了博客内容。

###6. 调整模板
默认的说明文字自然都得改掉啦~=￣ω￣=~

话说默认主题的代码高亮和行内的代码背景的淡紫色实在是有点碍眼。。。一看时间都快2点了还是洗洗睡好了~
