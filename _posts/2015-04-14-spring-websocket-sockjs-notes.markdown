---
layout: post
title:  "spring websocket sockjs notes"
date:  2015-04-14 20:49:30
categories: websocket
---

###接触
前几天为了实现一个社交系统的新消息推送功能，接触了一下 WebSocket，当时考虑服务器性能略差，PM对浏览器端暂时没有比较高兼容要求，所以最终决定使用 WebSocket 实现。

###准备
当然咯，先是查各种资料，问各路大神。
其实一开始我主要是有两个问题搞不明白：

1.  WebSocket 的 Endpoint（javax.websocket.Endpoint）或者说是 Spring 的 WebSocketHandler 和每个用户 session 的关系，在Handler中如何管理 WebSocket session

2.  WebSocket session 如何和现有的 HttpSession 对应，或者通过 HttpSession 和系统中的用户对应

第一个问题主要是并没有看到 Spring 官网的范例有对 Session 的存储处理，所以我就疑惑了，服务器要主动向用户发信息要怎么获取 session 呢，是 Spring 已经替我处理了还是需要我自己维护 session 。看到网上很多简易的例子上都没有处理用户的问题，甚至有些直接在连接时由 URI 的参数传递用户名给后台用来分辨用户，毕竟是例子嘛 - -| 也不能要求太高。

###渐渐明晰
首先让我晕乎好久是第二个问题，其实怎么关联在我了解了协议的大致过程以后就已经知道怎么解决了，WebSocket 协议先通过现有的 Http 连接握手，之后协商端口通过 TCP 双向通信，那么在握手的时候当然是可以获得 HttpSession 的。不过一开始我还没决定是不是用 Spring 的实现，其实在 stackoverflow 上看到好多方案也都是用 javax.websocket 的注解写的，看着看着就看到一个[问题](http://stackoverflow.com/questions/17936440/accessing-httpsession-from-httpservletrequest-in-a-web-socket-socketendpoint)下面两个得票最高的解答下面似乎有很多争论，主要是对于 WebSocket configurator 相关的并发问题，TL;DR，HttpSession 取值为 null 云云，总之嗅到一点危险的气息，还是跑去用 Spring 的实现了，表面上看 Spring 的文档似乎没有提到这种问题，用拦截器拦截每次 Http 握手，在拦截器里可以获取 HttpSession，通过 attributes Map 传递属性给 WebSocket session。
第一问题嘛，看起来还是需要自己来管理session，最后我是用用户名和 session 对应的，想了想一个用户有可能会有多个 session，每次服务器推送提醒的时候，通过用户名找到所有此用户的所有 session 全部推一遍。

###实现
实现其实挺快的，WebSocketConfigurer 配置 path，Handler 还有拦截器。Handler 在 session 建立后将 session 塞入 Map 中此用户存放 session 的 list 中，session 关闭时 remove（如是我就给自己挖了个坑），发送的就不赘述了。

###启动
\_(:з」∠)\_ maven tomcat plugin 实在不知道怎么配置才能正常建立 WebSocket，plugin添加了WebSocket等依赖运行时仍然不能正常连接，这个之前也没解决，所以这次就圆润的直接扔外部 tomcat 里了，运行-启动-发送，提示推过来了(｀・ω・´)，多建立了几个连接似乎也没出现什么问题，暂时算解决了，然后前端另一个同事搞定了。

###回顾
系统上线以后遇到不少性能问题，WebSocket 也被考虑过，之后尝试通过浏览器创建大量 WebSocket 连接，在连续建立关闭连接时 tomcat 线程数会有比较大的波动，CPU消耗似乎并不明显，发送消息时，系统的资源消耗也没明显变化。P.S. Chrome 41+ 貌似只能建立255个 WebSocket 连接，IE11 连续创建4个连接就会提示安全错误，FireFox没注意个数。
下来考虑解决浏览器WebSocket兼容问题，最后选择使用 sockjs，Spring 有 sockjs 后端的实现，省时省力。Spring 的 sockjs 实现对于不支持 WebSocket 的浏览器使用的文件流或者XHR的连接处理需要 Servlet 3.0 的支持（异步Servlet），Spring 的 Dispatcher 和其他 filter 需要在配置时添加 async-supported，configurer 添加 withSockJS。然后跑起来，sockjs fall back 后的连接方式似乎经常在发送时出现异常，做好异常处理以后似乎也没什么大碍，因为这个结局方案连接是否保持依赖心跳，浏览器连接关闭后服务器需要到下一次心跳才能关闭连接（在不使用 WebSocket 的情况下客户端调用close似乎也没有效果），这个倒不是问题，但是这些错误倒是牵出来我前面天然呆的bug代码。用户的 WebSocket session 的 list 被两个事件异步操作，而我直接从map里取出来list就遍历 - -| ， 还好查出来了， list new 一份出来即可。

end





