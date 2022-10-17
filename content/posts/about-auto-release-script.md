---
title: "About Auto Release Script"
description: "This is a description of the post."
uid: 501
ctime: 2022-10-17T07:02:48.054Z
mtime: 2022-10-17T07:02:48.054Z
---

:ArticleToc
:ArticleHeader


## 背景
可能大家在公司写业务的时候，可能都会涉及到不同环境的分支的上线部署。测试，预发，正式服也都是不同的分支，打不同的`tag`去触发`CI/CD`。我们可能会在测试服改很多次bug，打很多的`tag`，发布不同的测试版本。

我个人是个非常不喜欢记太多命令的人，于是为了偷懒，为什么这么多的操作何不去写个脚本，一行命令就搞定呢。由于这样的契机，写了这个针对多环境的`tag`触发脚本。
