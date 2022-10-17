:ArticleHeader={title:About-auto-release-script}

## 背景
可能大家在公司写业务的时候，可能都会涉及到不同环境的分支的上线部署。测试，预发，正式服也都是不同的分支，打不同的`tag`去触发`CI/CD`。我们可能会在测试服改很多次bug，打很多的`tag`，发布不同的测试版本。

我个人是个非常不喜欢记太多命令的人，于是为了偷懒，为什么这么多的操作何不去写个脚本，一行命令就搞定呢。由于这样的契机，写了这个针对多环境的`tag`触发脚本。

## 原理
1. 通过写入的命令获取发布的环境，并判断环境和部署的分支名是否对应
2. 打tag，更改 `package.json` 版本号
3. `git push`

## 实现
实现方式为`node`，然后使用`zx` 去执行`git`命令。`zx`是一个`node`的`shell`工具，可以直接在`node`中执行`shell`命令，不需要`child_process`，`zx`的文档在这里：[zx](github.com/google/zx)

### script
首先我们在`scripts`文件夹下面建立我们的`release`脚本文件

然后思考，如何接受我们需要接受的**环境变量**（`env`）呢？

于是我们可以在`package.json`中定义我们命令，通过命令的方式传入写入环境。

例如：
```json
// package.json
"scripts": {
    "release:test": "zx scripts/release.mjs -- test",
    "release:pre": "zx scripts/release.mjs -- pre",
    "release:prod": "zx scripts/release.mjs -- prod"
}
```

### env
上面我们脚本命令传入参数，区别与不同的环境，于是我们接受环境变量（`env`）
```mjs
const [,,,, env] = process.argv // test or pre or prod
```

这样我们就拿到了环境变量。但是出于严谨性判断，可能我们会在错误的分支上打`tag`，于是我们需要对命令发布的时机和当前分支做判断

首先我们建立环境变量和正确分支之前的映射关系

例如：
```mjs
// 自行更改
const tag2branch = {
    test: 'dev', // test 对应 dev 分支
    pre: 'pre', // pre 对应 pre 分支
    prod: 'master' // prod 对应 master 分支
}
```

然后判断当前分支是否在映射表里。

如何查看当前分支呢？

很简单，我们使用`zx` 执行 `git branch`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81fda787925a4165bbc85aa1460fb3c3~tplv-k3u1fbpfcp-watermark.image?)

我们发现当前分支前面有一个`*`进行标记，于是我们根据这一点，获取当前分支名。
```mjs
const res = await $`git branch`
const branchs = res.stdout.split('\n')
const currentBranch = branchs.find(b => b.includes('*')).replace(/[\*|\s]*/g, '') // 当前分支名
```

然后判断`currentBranch`是否是`env`所对应的正确分支。

### newVersion

我们做了`env`与`branch`的判断，接下来我们需要生成下一次正确发布的版本。于是很简单 我们只需要对上一次的版本号进行+1操作就好了

如何获取上一次的发布的版本号呢？ `git tag`这个命令就很符合我们的要求，他会列出所有的`tag`。

于是 我们使用`zx` 执行 `git tag`。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ed36bd4b02141efb827bd071f9f6106~tplv-k3u1fbpfcp-watermark.image?)

（截取一小部分）我们发现我们需要对`tags`进行`env`的过滤


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cabe8bb9a45d43d8ad8fbcc8256bd8b4~tplv-k3u1fbpfcp-watermark.image?)

我们还发现`tags`的排序也有问题，并不是按照正确的版本顺序排，我们还需要正确的`sort`一下。

> 根据个人情况而定。我司的`tag`都是 `${env}-${version}`格式

获取`env`对应的所有`versions`

```javascript
const res = await $`git tag`
const prefix = `${env}-`
const allVersions = res.stdout.split('\n').filter(tag => tag.includes(env)).map(tag => tag.replace(new RegExp(prefix), ''))
```
然后在对`veisons`进行正确的排序，排序算法参考的别人的算法，待会见源码

```javascript
const sortVersions = sortVersion(allVersions) // 排序
```
这样`sortVersions[sortVersions.length - 1]`便是我们的最新的版本号

我们再进行+1操作，生成最新的版本号。
```js
const latestVersion = sortVersions[sortVersions.length - 1]
const ltStr = latestVersion.split('.')
ltStr[ltStr.length - 1] = Number(ltStr[ltStr.length - 1]) + 1

return ltStr.join('.') // 最新的版本号， 也就是需要发布的版本号
```
我们再去使用`bumpp`去更改我们`package.json`的`version`。

### runShell
功能已经全部完善了，最后我们再`git push`就好了

```mjs
async function runShell(version) {
  const tag = `${env}-${version}`
  await $`git add .`
  await $`git commit -m "chore: release ${tag}"`
  await $`git tag ${tag}`
  await $`git push`
  await $`git push origin --tags`
  await $`clear`
  console.log(`release success for ${tag} !`)
}
```

## 源码
```json
// package.json
{
    "type": "module",
    "scripts": {
        "release:test": "zx scripts/release.mjs -- test",
        "release:pre": "zx scripts/release.mjs -- pre",
        "release:prod": "zx scripts/release.mjs -- prod"
    }
}
```

```typescript
// scripts/release.mjs
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
