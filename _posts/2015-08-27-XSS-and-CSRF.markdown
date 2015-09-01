---
layout: post
title:  "XSS和CSRF"
date:  2015-08-27 15:10:30
categories: security
---

### 定义

#### XSS

> 原名`CSS` cross-site scripting 跨站脚本攻击，当然用这个缩写就是作死了，和`CSS` cascading style sheet 重名了，大概是`cross≈X`（都是叉）就换成`X`了吧。

#### CSRF
> cross-site request forgery 跨站请求伪造

### 场景

#### XSS
攻击者通过各种方式，在网页中注入可以被用户执行的代码。可执行的代码一般就是页面内嵌的javascript或者引用的javascript，甚至类型其他代码。既然攻击者能在你要浏览的网页中放入他编写出来的代码，那么很显然他能做到浏览器运行javascript做的所有事情。在网页中注入代码的方式也是多种多样的，比如中间人攻击（MITM），网页和它相关的资源在未到达你的浏览器的时候就被人截获，在中间偷偷加了些东西。比如前段时间某墙利用某度对github的攻击，某墙在某度页面中引用的js资源中加入了向github发送请求的代码，用户的浏览器收到脚本，自动向发送请求，造成对github的DDoS攻击。如果添加的脚本是其他的目的，比如说窃取当前页面中的秘密信息，比如未设为`http only`的cookie等等，就有损害被攻击者的利益。除了中间人攻击，网站还有可能本身存在着安全漏洞，比如没有转义用户输入的不安全字符信息，没有处理数据库中取出的数据，从URL的`query`中直接取得数据，为做处理就插入到页面中（URL很容易被重新构造，然后让受攻击者点击）等等。

#### CSRF
跨站请求伪造，其实意思很明显，就是伪造用户的请求，被攻击者在不知情的情况下向服务器发送了请求。首先有两个对象被攻击者和攻击者针对的目标网站S，攻击者通过XSS和其他注入手段或者自己建立一个网站，在页面上构造某些脚本或者表单向S中的某个URL发送请求，既然脚本能够提交表单，那么一般就不需要用户点击提交了。可能这个URL背后操作的资源是你在网站S上的资产，或者是社交网站发帖的`web service`（由于请求是攻击者伪造的，那么发出什么内容那就看攻击者的心情了）。当然，如果是和你的账户相关的数据，只有你当前浏览器在网站S上的`session`还是有效的时候才能起效，脚本发出AJAX请求由于同源原则，cookie不会发送过去，而且也不会收到任何`response`，应该不会起效了；但是，表单没有这种限制，表单可以将（网站S的）cookie和请求数据一起发送给网站S，从而使得请求伪造执行成功。

#### 组合
刚刚已经说到了，攻击者可能会将XSS用在被攻击者经常访问的其他网站上，这个网站存在XSS安全漏洞，成功构造表单和脚本，被攻击者提交表单，CSRF大成功 - 。-。还有可能在同源的网站上，被攻击的站点S没有XSS漏洞，但是同源的网站E上存在，那么E就成为了最弱的一环。

### 阻止

#### XSS
XSS可以通过中间人攻击来实施，而中间人攻击是很难阻止的，一般网站都是通过加密比如使用https的手段防止数据包被中间人篡改，但是如果网站的CA是中间人的话，似乎也没什么用（不知道我理解的对不对 - -）。对于网站自身的bug，那就是要对用户数据或者其他不安全的数据进行审查清理（sanitize），比如论坛一般允许用户输入富文本信息，这些就是藏匿不安全文本的多发地。

#### CSRF
一般解决方案似乎都是用一个随机串做token，服务器端存放在session中，渲染页面时把token放在页面表单的隐藏域中或者`head`的meta中，比如：

> <meta name="csrf-token" content="ToKEn234SA"\>

放在表单中，token自然就在表单提交的时候传递给后端了，

> <input type="hidden" name="csrf-token" id="csrf-token" value="ToKEn234SA"\>

如果放在meta中或者其他存放数据的attribute比如：

> <div id="csrf-token" data-csrf-token="ToKEn234SA"\></div\>

那就需要使用javascript取出token值再提交到后端，如果后端当前session中的缓存存在这个token，那么一般认为不是伪造的请求了。除非攻击者能够窃取此用户的cookie获得session id之类的敏感信息，他才能获得token。很多Web框架比如java spring的spring security，Python 的 django 也有相关中间件专门处理csrf问题。

###相关
[http://security.stackexchange.com/questions/22903/why-refresh-csrf-token-per-form-request](http://security.stackexchange.com/questions/22903/why-refresh-csrf-token-per-form-request)

[https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)

[http://stackoverflow.com/questions/20504846/why-is-it-common-to-put-csrf-prevention-tokens-in-cookies](http://stackoverflow.com/questions/20504846/why-is-it-common-to-put-csrf-prevention-tokens-in-cookies)

[http://docs.spring.io/autorepo/docs/spring-security/3.2.0.CI-SNAPSHOT/reference/html/csrf.html](http://docs.spring.io/autorepo/docs/spring-security/3.2.0.CI-SNAPSHOT/reference/html/csrf.html)

[https://docs.djangoproject.com/en/1.7/ref/contrib/csrf/](https://docs.djangoproject.com/en/1.7/ref/contrib/csrf/)


