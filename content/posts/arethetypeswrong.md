---
date: 2024-12-12T00:00:00.000Z
description: Analyzing TypeScript types of npm packages
title: Are the types wrong?
tags:
  - Pnpm
  - Attw
lang: en
---

特别感谢 [@userquin](https://github.com/userquin) 的帮助和他的 [PR](https://github.com/unocss/unocss/pull/4322) 启发了我写这篇文章。

> 言简意赅，如若表达有误，还请指正。也请参阅官方文档 [arethetypeswrong](https://github.com/arethetypeswrong/arethetypeswrong.github.io)

## What is `arethetypeswrong`?

`arethetypeswrong` (abbreviated as `attw` below) is a tool for analyzing TypeScript types of npm packages. By analyzing the type definition files of npm packages, `attw` finds problems in them and provides suggestions for fixing them. The goal of `attw` is to help developers better understand the type definitions of npm packages and improve code quality.

It can help you analyze and detect the following problems:

- [💀 Resolution failed](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/NoResolution.md)
- [❌ No types](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/UntypedResolution.md)
- [🎭 Masquerading as CJS](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FalseCJS.md)
- [👺 Masquerading as ESM](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FalseESM.md)
- [⚠️ ESM (dynamic import only)](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/CJSResolvesToESM.md)
- [🐛 Used fallback condition](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FallbackCondition.md)
- [🤨 CJS default export](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/CJSOnlyExportsDefault.md)
- [❗️ Incorrect default export](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FalseExportDefault.md)
- [❓ Missing `export =`](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/MissingExportEquals.md)
- [🚭 Unexpected module syntax](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/UnexpectedModuleSyntax.md)
- [🥴 Internal resolution error](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/InternalResolutionError.md)
- [🕵️‍♂️ Named exports](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/NamedExports.md)

## How to use `arethetypeswrong`?

你可以在线使用 https://arethetypeswrong.github.io/ 或者 使用 CLI 工具。

```bash
pnpm i -g @arethetypeswrong/cli
```


