---
layout: post
title:  "mongoDB用户权限配置笔记"
date:  2015-1-20 17:23:04
categories: mongodb
---
```html
<style>
<!--
 /* Font Definitions */
 @font-face
	{font-family:宋体;
	panose-1:2 1 6 0 3 1 1 1 1 1;}
@font-face
	{font-family:宋体;
	panose-1:2 1 6 0 3 1 1 1 1 1;}
@font-face
	{font-family:"Calibri Light";
	panose-1:2 15 3 2 2 2 4 3 2 4;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;}
@font-face
	{font-family:"\@宋体";
	panose-1:2 1 6 0 3 1 1 1 1 1;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{margin:0cm;
	margin-bottom:.0001pt;
	text-align:justify;
	text-justify:inter-ideograph;
	font-size:10.5pt;
	font-family:"Calibri","sans-serif";}
h1
	{mso-style-link:"标题 1 Char";
	margin-top:17.0pt;
	margin-right:0cm;
	margin-bottom:16.5pt;
	margin-left:0cm;
	text-align:justify;
	text-justify:inter-ideograph;
	line-height:240%;
	page-break-after:avoid;
	font-size:22.0pt;
	font-family:"Calibri","sans-serif";}
h2
	{mso-style-link:"标题 2 Char";
	margin-top:13.0pt;
	margin-right:0cm;
	margin-bottom:13.0pt;
	margin-left:0cm;
	text-align:justify;
	text-justify:inter-ideograph;
	line-height:173%;
	page-break-after:avoid;
	font-size:16.0pt;
	font-family:"Calibri Light","sans-serif";}
p.MsoHeader, li.MsoHeader, div.MsoHeader
	{mso-style-link:"页眉 Char";
	margin:0cm;
	margin-bottom:.0001pt;
	text-align:center;
	layout-grid-mode:char;
	border:none;
	padding:0cm;
	font-size:9.0pt;
	font-family:"Calibri","sans-serif";}
p.MsoFooter, li.MsoFooter, div.MsoFooter
	{mso-style-link:"页脚 Char";
	margin:0cm;
	margin-bottom:.0001pt;
	layout-grid-mode:char;
	font-size:9.0pt;
	font-family:"Calibri","sans-serif";}
a:link, span.MsoHyperlink
	{color:#0563C1;
	text-decoration:underline;}
a:visited, span.MsoHyperlinkFollowed
	{color:#954F72;
	text-decoration:underline;}
pre
	{mso-style-link:"HTML 预设格式 Char";
	margin:0cm;
	margin-bottom:.0001pt;
	font-size:12.0pt;
	font-family:宋体;}
p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
	{margin:0cm;
	margin-bottom:.0001pt;
	text-align:justify;
	text-justify:inter-ideograph;
	text-indent:21.0pt;
	font-size:10.5pt;
	font-family:"Calibri","sans-serif";}
span.1Char
	{mso-style-name:"标题 1 Char";
	mso-style-link:"标题 1";
	font-weight:bold;}
span.HTMLChar
	{mso-style-name:"HTML 预设格式 Char";
	mso-style-link:"HTML 预设格式";
	font-family:宋体;}
span.nx
	{mso-style-name:nx;}
span.p
	{mso-style-name:p;}
span.o
	{mso-style-name:o;}
span.s2
	{mso-style-name:s2;}
span.2Char
	{mso-style-name:"标题 2 Char";
	mso-style-link:"标题 2";
	font-family:"Calibri Light","sans-serif";
	font-weight:bold;}
span.Char
	{mso-style-name:"页眉 Char";
	mso-style-link:页眉;}
span.Char0
	{mso-style-name:"页脚 Char";
	mso-style-link:页脚;}
.MsoChpDefault
	{font-family:"Calibri","sans-serif";}
 /* Page Definitions */
 @page WordSection1
	{size:595.3pt 841.9pt;
	margin:72.0pt 90.0pt 72.0pt 90.0pt;
	layout-grid:15.6pt;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 ol
	{margin-bottom:0cm;}
ul
	{margin-bottom:0cm;}
-->
</style>
<div class=WordSection1 style='layout-grid:15.6pt'>

<h1 align=center style='text-align:center'><span lang=EN-US>mongodb</span><span
style='font-family:宋体'>用户角色权限配置</span></h1>

<p class=MsoNormal><span lang=EN-US style='color:#BFBFBF'>mongodb version 2.6.2</span></p>

<p class=MsoNormal><span lang=EN-US>&nbsp;</span></p>

<h2><span style='font-family:宋体'>无任何数据的空</span><span lang=EN-US>mongodb</span><span
style='font-family:宋体'>数据库</span></h2>

<p class=MsoListParagraph style='text-indent:0cm'><span style='font-family:
宋体'>空数据库中将无任何</span><span lang=EN-US>user</span><span style='font-family:宋体'>数据，第一次登录可通过</span><span
lang=EN-US>mongod</span><span style='font-family:宋体'>加</span><span lang=EN-US>--noauth</span><span
style='font-family:宋体'>参数（其实不添</span><span lang=EN-US>--auth</span><span
style='font-family:宋体'>参数应该就无权限验证）或通过</span><span lang=EN-US>localhost
exception</span><span style='font-family:宋体'>（默认开启），启动时可通过</span><span
lang=EN-US>--setParameter</span><span style='font-family:宋体'>设定是否开启。启动</span><span
lang=EN-US>mongod</span><span style='font-family:宋体'>后使用</span><span
lang=EN-US>mongo</span><span style='font-family:宋体'>即可登录。</span></p>

<p class=MsoListParagraph style='text-indent:0cm'><span lang=EN-US>&nbsp;</span></p>

<h2><span style='font-family:宋体'>创建用户</span></h2>

<p class=MsoListParagraph style='text-indent:0cm'><span style='font-family:
宋体'>使用</span><span lang=EN-US>admin</span><span style='font-family:宋体'>数据库</span></p>

<div style='border:none;border-left:solid #494747 4.5pt;padding:0cm 0cm 0cm 9.0pt;
background:#F5F6F7;margin-left:21.2pt;margin-right:0cm'><pre style='margin-top:
18.0pt;margin-right:0cm;margin-bottom:18.0pt;margin-left:0cm;text-indent:7.05pt;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span class=nx><span lang=EN-US style='font-size:10.5pt;
font-family:"Courier New";color:#222222'>use</span></span><span lang=EN-US
style='font-size:10.5pt;font-family:"Courier New";color:#222222'> <span
class=nx>admin</span></span></pre></div>

<p class=MsoNormal><span style='font-family:宋体'>在</span><span lang=EN-US>admin</span><span
style='font-family:宋体'>数据库中创建用户，赋予用户权限</span></p>

<div style='border:none;border-left:solid #494747 4.5pt;padding:0cm 0cm 0cm 9.0pt;
background:#F5F6F7;margin-left:21.2pt;margin-right:0cm'>

<p class=MsoNormal align=left style='margin-top:18.0pt;margin-right:0cm;
margin-bottom:18.0pt;margin-left:0cm;text-align:left;text-indent:7.05pt;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span lang=EN-US style='font-family:"Courier New";color:#222222'>db.createUser(</span></p>

<p class=MsoNormal align=left style='margin-top:18.0pt;margin-right:0cm;
margin-bottom:18.0pt;margin-left:0cm;text-align:left;text-indent:7.05pt;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span lang=EN-US style='font-family:"Courier New";color:#222222'> 
{</span></p>

<p class=MsoNormal align=left style='margin-top:18.0pt;margin-right:0cm;
margin-bottom:18.0pt;margin-left:0cm;text-align:left;text-indent:7.05pt;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span lang=EN-US style='font-family:"Courier New";color:#222222'>   
user</span><span lang=EN-US style='font-family:"Courier New";color:#666666'>:</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'> </span><span
lang=EN-US style='font-family:"Courier New";color:#4070A0'>&quot;siteUserAdmin&quot;</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'>,</span></p>

<p class=MsoNormal align=left style='margin-top:18.0pt;margin-right:0cm;
margin-bottom:18.0pt;margin-left:0cm;text-align:left;text-indent:7.05pt;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span lang=EN-US style='font-family:"Courier New";color:#222222'>   
pwd</span><span lang=EN-US style='font-family:"Courier New";color:#666666'>:</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'> </span><span
lang=EN-US style='font-family:"Courier New";color:#4070A0'>&quot;password&quot;</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'>,</span></p>

<p class=MsoNormal align=left style='margin-top:18.0pt;margin-right:0cm;
margin-bottom:18.0pt;margin-left:0cm;text-align:left;text-indent:7.05pt;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span lang=EN-US style='font-family:"Courier New";color:#222222'>   
roles</span><span lang=EN-US style='font-family:"Courier New";color:#666666'>:</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'> [ { role</span><span
lang=EN-US style='font-family:"Courier New";color:#666666'>:</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'> </span><span
lang=EN-US style='font-family:"Courier New";color:#4070A0'>&quot;userAdminAnyDatabase&quot;</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'>, db</span><span
lang=EN-US style='font-family:"Courier New";color:#666666'>:</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'> </span><span
lang=EN-US style='font-family:"Courier New";color:#4070A0'>&quot;admin&quot;</span><span
lang=EN-US style='font-family:"Courier New";color:#222222'> } ]</span></p>

<p class=MsoNormal align=left style='margin-top:18.0pt;margin-right:0cm;
margin-bottom:18.0pt;margin-left:0cm;text-align:left;text-indent:7.05pt;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span lang=EN-US style='font-family:"Courier New";color:#222222'> 
}</span></p>

<p class=MsoNormal align=left style='margin-top:18.0pt;margin-right:0cm;
margin-bottom:18.0pt;margin-left:0cm;text-align:left;text-indent:7.05pt;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span lang=EN-US style='font-family:"Courier New";color:#222222'>)</span></p>

</div>

<p class=MsoListParagraph style='margin-left:18.0pt;text-indent:0cm'><span
lang=EN-US>&nbsp;</span></p>

<p class=MsoListParagraph style='text-indent:0cm'><span style='font-family:
宋体'>其中</span><span lang=EN-US>roles </span><span style='font-family:宋体'>中</span>
<span lang=EN-US style='font-family:"Courier New";color:#4070A0'>userAdminAnyDatabase
</span><span style='font-family:宋体'>角色是</span><span lang=EN-US>admin</span><span
style='font-family:宋体'>数据库中内建的角色，有为所有数据库分配用户及角色的权限，但是不能访问</span><span
lang=EN-US>collection</span><span style='font-family:宋体'>中的数据，详细的</span><span
lang=EN-US>mongodb</span><span style='font-family:宋体'>内建角色可访问</span><span
lang=EN-US><a href="http://docs.mongodb.org/manual/reference/built-in-roles/">http://docs.mongodb.org/manual/reference/built-in-roles/</a></span><span
style='font-family:宋体'>查看详细说明，其中</span><span lang=EN-US>root</span><span
style='font-family:宋体'>为最高权限，</span><span lang=EN-US>__system</span><span
style='font-family:宋体'>为软件内部角色不应该使用。</span></p>

<p class=MsoListParagraph style='text-indent:0cm'><span style='font-family:
宋体'>另外用户权限相关命令可查看文档说明</span><span lang=EN-US><a
href="http://docs.mongodb.org/manual/reference/security/">http://docs.mongodb.org/manual/reference/security/</a></span><span
style='font-family:宋体'>。</span></p>

<p class=MsoListParagraph style='text-indent:0cm'><span style='font-family:
宋体'>之后使用</span><span lang=EN-US>mongod –auth</span><span style='font-family:
宋体'>有权限的方式启动后，可使用</span><span lang=EN-US>mongo </span><span style='font-family:
宋体'>【数据库名】</span><span lang=EN-US>-u </span><span style='font-family:宋体'>【用户名】</span><span
lang=EN-US> -p </span><span style='font-family:宋体'>【密码】的参数登录，之后用户可执行赋予的权限范围内的命令。</span></p>

<h2><span lang=EN-US>ip</span><span style='font-family:宋体'>访问限制</span></h2>

<p class=MsoNormal><span style='font-family:宋体'>我没有从</span><span lang=EN-US>mongodb</span><span
style='font-family:宋体'>的说明文档中找到限制某用户只能从某</span><span lang=EN-US>ip</span><span
style='font-family:宋体'>登录的设置方式，说明文档只提及了两种关于数据库访问显示的方法：</span></p>

<p class=MsoListParagraph style='margin-left:18.0pt;text-indent:-18.0pt'><span
lang=EN-US>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style='font-family:宋体'>通过配置文件或启动参数，在</span><span
lang=EN-US>mongod</span><span style='font-family:宋体'>启动的时候设定</span><span
lang=EN-US>bind_ip</span><span style='font-family:宋体'>，如：</span></p>

<p class=MsoListParagraph style='margin-left:18.0pt;text-indent:0cm'><span
style='font-family:宋体'>配置文件中添加</span></p>

<div style='border:none;border-left:solid #494747 4.5pt;padding:0cm 0cm 0cm 9.0pt;
background:#F5F6F7;margin-left:18.0pt;margin-right:0cm'>

<p class=MsoListParagraph align=left style='margin-top:18.0pt;margin-right:
0cm;margin-bottom:18.0pt;margin-left:0cm;text-align:left;line-height:18.0pt;
background:#F5F6F7;word-break:break-all;border:none;padding:0cm'><span
lang=EN-US style='font-family:"Courier New";color:#222222'>net:</span></p>

<p class=MsoListParagraph align=left style='margin-top:18.0pt;margin-right:
0cm;margin-bottom:18.0pt;margin-left:0cm;text-align:left;text-indent:0cm;
line-height:18.0pt;background:#F5F6F7;word-break:break-all;border:none;
padding:0cm'><span lang=EN-US style='font-family:"Courier New";color:#222222'>  
          bindIp: 127.0.0.1,192.168.X.XX</span></p>

</div>

<p class=MsoListParagraph align=left style='text-align:left;text-indent:0cm'><span
lang=EN-US>         </span><span style='font-family:宋体'>或启动时添加</span> <span
lang=EN-US>--bind_ip</span></p>

<p class=MsoListParagraph align=left style='text-align:left'><span
style='font-family:宋体'>修改需要重新启动数据库</span></p>

<p class=MsoListParagraph align=left style='text-align:left;text-indent:0cm'><span
lang=EN-US>&nbsp;</span></p>

<p class=MsoListParagraph align=left style='margin-left:18.0pt;text-align:left;
text-indent:-18.0pt'><span lang=EN-US>2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style='font-family:宋体'>是使用操作系统或第三方解决方案来限制对于</span><span
lang=EN-US>mongod</span><span style='font-family:宋体'>运行实例的</span><span
lang=EN-US>ip</span><span style='font-family:宋体'>和端口访问，如</span><span
lang=EN-US>Linux</span><span style='font-family:宋体'>使用</span><span lang=EN-US>IPtable</span><span
style='font-family:宋体'>，</span><span lang=EN-US>windows</span><span
style='font-family:宋体'>使用防火墙或其他方案。</span></p>

<p class=MsoListParagraph align=left style='margin-left:18.0pt;text-align:left;
text-indent:0cm'><span lang=EN-US>&nbsp;</span></p>

<h2><span style='font-family:宋体'>最后</span></h2>

<p class=MsoListParagraph align=left style='text-align:left;text-indent:0cm'><span
style='font-family:宋体'>需要获得其他内容建议访问</span><span lang=EN-US><a
href="http://docs.mongodb.org/manual/reference/">http://docs.mongodb.org/manual/reference/</a></span><span
style='font-family:宋体'>查看。</span></p>

<p class=MsoListParagraph align=left style='text-align:left;text-indent:0cm'><span
style='font-family:宋体'>另外如果用户通过</span><span lang=EN-US>mongo</span><span
style='font-family:宋体'>登录后，</span><span lang=EN-US>mongod</span><span
style='font-family:宋体'>命令行提示</span><span lang=EN-US>Unauthorized not authorized
on XXX to execute command</span><span style='font-family:宋体'>之类的内容并不是登录认证，只是用户分配的角色是有限制的，不能执行所命令。</span></p>

<p class=MsoListParagraph align=left style='text-align:left;text-indent:0cm'><span
lang=EN-US>&nbsp;</span></p>

</div>
```