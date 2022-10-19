---
title: "About Auto Release Script 🚀"
description: "This is a description of the post."
uid: 501
ctime: 2022-10-17T07:02:48.054Z
mtime: 2022-10-17T07:02:48.054Z
---

:ArticleToc
:ArticleHeader


## Background

可能大家在公司写业务的时候，可能都会涉及到不同环境的分支的上线部署。测试，预发，正式服也都是不同的分支，打不同的`tag`{lang=html}去触发`CI/CD`{lang=html}。

我们可能会在测试服改很多次 bug，打很多的`tag`{lang=html}，发布不同的测试版本。基于我司的`CI/CD`{lang=html}是自动化流程，和相匹配的契机，便写了一个自动化的脚本，来帮助我们快速的发布各种版本。

## Principle

1. 通过命令获取发布的环境
2. 根据环境和配置进行匹配
3. 修改`package.json`{lang=html}中的`version`{lang=html}字段
4. 通过`bummp`{lang=html}进行`Release`{lang=html}

## Implementation
我们借助[`zx`{lang=ts}](https://github.com/google/zx)来实现这个脚本。
> [`zx`{lang=ts}](https://github.com/google/zx) A tool for writing better scripts

### Script

首先我们在`scripts`{lang=html}文件夹下面建立我们的`release`{lang=html}脚本文件,然后思考，如何接受我们需要接受的环境变量`env`{lang=ts}呢？

于是我们可以在`package.json`{lang=ts}中定义我们命令，通过命令的方式传入写入环境。
```json
// package.json
"scripts": {
  "release:test": "zx scripts/release.mjs -- test",
  "release:pre": "zx scripts/release.mjs -- pre",
  "release:prod": "zx scripts/release.mjs -- prod",
}
```

### Env
上面我们脚本命令传入参数，区别与不同的环境，于是我们接受环境变量`env`{lang=ts}
```ts
const [,,,, env] = process.argv // test or pre or prod
```
这样我们就拿到了环境变量。但是出于严谨性判断，可能我们会在错误的分支上打`tag`{lang=html}，于是我们需要对命令发布的时机和当前分支做判断

首先我们建立环境变量和正确分支之前的映射关系:

```ts
const tag2branch = {
  test: 'test',
  pre: 'pre',
  prod: 'main',
}
```

然后判断当前分支是否在映射表里,如何查看当前分支呢？很简单，我们使用`zx`{lang=ts} 执行 `git branch`{lang=ts}

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81fda787925a4165bbc85aa1460fb3c3~tplv-k3u1fbpfcp-watermark.image?)

我们发现当前分支前面有一个`*`{lang=html}进行标记，于是我们根据这一点，获取当前分支名。
```ts
const res = await $`git branch`
const branchs = res.stdout.split('\n')
const currentBranch = branchs.find(b => b.includes('*')).replace(/[\*|\s]*/g, '')
```

然后判断`currentBranch`{lang=ts}是否是`env`{lang=ts}所对应的正确分支。

### NewVersion

我们做了`env`{lang=ts}与`branch`{lang=ts}的判断，接下来我们需要生成下一次正确发布的版本。于是很简单 我们只需要对上一次的版本号进行+1操作就好了

如何获取上一次的发布的版本号呢？ `git tag`{lang=ts}这个命令就很符合我们的要求，他会列出所有的`tag`{lang=html}。

于是 我们使用`zx`{lang=ts} 执行 `git tag`{lang=ts}。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ed36bd4b02141efb827bd071f9f6106~tplv-k3u1fbpfcp-watermark.image?)

> 截取一小部分,我们发现我们需要对`tags`{lang=html}进行`env`{lang=ts}的过滤

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cabe8bb9a45d43d8ad8fbcc8256bd8b4~tplv-k3u1fbpfcp-watermark.image?)

我们还发现`tags`{lang=html}的排序也有问题，并不是按照正确的版本顺序排，我们还需要正确的`sort`{lang=ts}一下。

> 根据个人情况而定。我司的`tag`{lang=html}都是 `${env}-${version}`{lang=ts}格式

获取`env`{lang=ts}对应的所有`versions`{lang=ts}

```ts
const res = await $`git tag`
const allVersions = res.stdout.split('\n')
  .filter(tag => tag.includes(env))
  .map(tag => tag.replace(new RegExp(`v(.+)-${env}`), '$1'))
```
然后在对`veisons`{lang=ts}进行正确的排序。
> 排序算法参考的别人的算法，待会见源码

```ts
const sortVersions = sortVersion(allVersions)
```
这样`sortVersions[sortVersions.length - 1]`{lang=ts}便是我们的最新的版本号。

为了配合`bummp`{lang=ts}并且确保`package.json`{lang=html}的版本号也是正确的，我们需要将`package.json`{lang=html}的版本号也更新一下。

```ts
await modifyPkgVersion(sortVersions[sortVersions.length - 1] ?? '0.0.0')

async function modifyPkgVersion(version) {
  const pkg = await $`cat package.json`
  await $`echo ${pkg.stdout.replace(/\"version\":\s*\"[^\"]+\"/, `"version": "${version}"`)} > package.json`
}
```

### Bummp Realease
我们已经将`package.json`{lang=html}更新为最新的版本，那么我们就可以使用`bummp`{lang=ts}进行发布了。

```ts
async function release() {
  await $`pnpm exec bumpp package.json --commit "chore: release ${env} v%s" --push --tag "v%s-${env}"`
  console.log(`${env} release success !`)
}
```
> 每个人的`bumpp`{lang=ts}的配置可能不一样，这里只是一个简单的示例，我司的`tag`{lang=html}格式是`v${version}-${env}`{lang=ts}。

## Source Code
```ts
import { $ } from 'zx'

const env = getEnv()
const tag2branch = {
  test: 'test',
  pre: 'pre',
  prod: 'main',
}

run()

async function run() {
  const isRightBranch = await isEnvBranch(env)
  if (!isRightBranch) {
    console.log('不是正确的分支')
    return
  }

  await modifyLastVersion()
  await release()
}

function getEnv() {
  const [, , , , env] = process.argv
  return env
}

// 修改最新的版本号
async function modifyLastVersion() {
  const lastVersion = await getLatestTag()
  if (!lastVersion)
    console.log('没有历史 tag 版本，自动从 0.0.0 开始')

  await modifyPkgVersion(lastVersion ?? '0.0.0')
}

// 修改package.json的版本号
async function modifyPkgVersion(version) {
  const pkg = await $`cat package.json`
  await $`echo ${pkg.stdout.replace(/\"version\":\s*\"[^\"]+\"/, `"version": "${version}"`)} > package.json`
  await clearLog()
}

async function release() {
  await $`pnpm exec bumpp package.json --commit "chore: release ${env} v%s" --push --tag "v%s-${env}"`
  await clearLog()
  console.log(`${env} release success !`)
}

async function isEnvBranch() {
  const res = await $`git branch`
  const branchs = res.stdout.split('\n')
  const currentBranch = branchs.find(b => b.includes('*')).replace(/[\*|\s]*/g, '')

  const aimBranch = tag2branch[env]
  await clearLog()
  return aimBranch === currentBranch
}

async function getLatestTag() {
  const res = await $`git tag`
  const allVersions = res.stdout.split('\n')
    .filter(tag => tag.includes(env))
    .map(tag => tag.replace(new RegExp(`v(.+)-${env}`), '$1'))
  const sortVersions = sortVersion(allVersions)
  await clearLog()
  return sortVersions[sortVersions.length - 1] || undefined
}

async function clearLog() {
  await $`clear`
}

function sortVersion(arr) {
  const result = [...arr]
  result.sort((a, b) => {
    const items1 = a.split('.')
    const items2 = b.split('.')
    let k = 0
    for (const i in items1) {
      const a1 = items1[i]
      const b1 = items2[i]
      if (typeof a1 === 'undefined') {
        k = -1
        break
      }
      else if (typeof b1 === 'undefined') {
        k = 1
        break
      }
      else {
        if (a1 === b1)
          continue
        k = Number(a1) - Number(b1)
        break
      }
    }
    return k
  })

  return result
}
```
