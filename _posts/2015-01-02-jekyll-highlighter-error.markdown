---
layout: post
title:  "GitHub Pages build failure caused by syntax highlighter"
date:   2015-01-02 02:17:47
categories: GitHub-Pages highlighter
---
不得不说，从GitHub发送的Page build failure真没什么收获

>The page build failed with the following error:   
>Page build failed. For more information,   
>see https://help.github.com/articles/troubleshooting-github-pages-build-failures.   
>If you have any questions please contact us at https://github.com/contact.

总之只能一个一个排查，sass~嗯貌似没问题，_config.yml~嗯照着Google找到的说法改了好几遍也没起什么作用。删掉第一篇博文里面的内容，commit，呦~原来错在这里面啊。看来看去也markdown里面也就是highlight有可能出问题了吧。。。

1个小时过去了~

好吧pygments高亮在markdown里面syntax type写成shell会出错啊- -|。。。\_(:з」∠)\_=3本地用Rouge貌似没什么事啊。   
顺便把style sheet大略改了改，css还是蛮苦手的，反正看着比默认主题顺眼了(｀・ω・´)。

第一篇博文就自己掉坑里了，syntax highlighter：怪我咯。