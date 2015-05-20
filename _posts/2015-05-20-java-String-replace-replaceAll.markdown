---
layout: post
title:  "java String replaceAll 和 replace 方法"
date:  2015-04-14 20:49:30
categories: java
---

###震了一下

在坛子里看见有人问为什么用 java String 的 replaceAll 方法在字符串中的引号前面加反斜杠时候，第二个参数要打五个反斜杠。

{% highlight java %}
"我是一个包含\"引号的字符串".replaceAll("\"","\\\\\"");
{% endhighlight %}

果断执行了一下，\_(:з」∠)\_确实感觉好诡异啊，改成三个反斜杠替换后看不到有添加斜杠 - -。。

###这个世界不好了

文档大法好。

看完总的来说就是 replaceAll 第二个参数 replacement 在替换时也是包含两种特殊处理的， replacement 字符串中的 ${name} 或 $g 的格式会按正则捕捉的组名称或编号替换后在append入最终字符串；replacement中的字符 "\\" 会被认为是对后面字符进行转义， 添加时会被直接丢弃掉，然后直接 append 后面那个字符， 比如replacement是 "\\\\" ，那么会先丢弃前一个"\\" , 然后append 后一个字符 也就是 "\\", 如果replacement是"\\\\\\" , 那么会出现越界异常。。。越界异常。。异常 。。。（java.util.regex.Matcher.appendReplacement）

###最后

还是感觉有点反人类，以后还是这么写吧。。

{% highlight java %}
"我是一个包含\"引号的字符串".replaceAll("\"",Matcher.quoteReplacement("\\\“"))
{% endhighlight %}

String 的 replace 和 replaceAll 两个方法参数也挺坑的，第一个参数 replace 的不是正则，replaceAll 的是正则，我为什么觉得这个坑，其实是因为以前踩过别人因为这点不同写出来的bug\_(:з」∠)\_



