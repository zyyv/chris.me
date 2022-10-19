---
title: "带你深入了解 UnoCSS 核心引擎"
description: "一文带你深入了解 UnoCSS 核心引擎"
uid: 501
ctime: 2022-10-19T07:43:45.683Z
mtime: 2022-10-19T07:43:45.683Z
---

:ArticleToc
:ArticleHeader

## 目录
```md
src/
├── extractors/    # UnoCSS 提取器（提取给`UnoCSS`引擎进行解析）
│   └── ...
├── generator/     # 引擎核心功能
│    └── index.ts
├── utils/         # UnoCSS 工具函数
│   └── index.ts
└── config.ts/     # ResolveConfig
```

## Generator
如果你想使用`UnoCSS`{lang=html}的核心功能，你可以直接使用`createGenerator`{lang=ts}函数。

```ts
const uno = createGenerator({
  // 你的配置
  // ...
})
```

```ts
export function createGenerator(config?: UserConfig, defaults?: UserConfigDefaults) {
  return new UnoGenerator(config, defaults)
}
```
我们可以看到，`createGenerator`{lang=ts} 函数返回了一个`UnoGenerator`{lang=ts}类的实例，这个类包含了所有的核心功能。

```ts
export class UnoGenerator {
  constructor(
    public userConfig: UserConfig = {},
    public defaults: UserConfigDefaults = {},
  ) {
    this.config = resolveConfig(userConfig, defaults)
    this.events.emit('config', this.config)
  }

  // ...
```  

`UnoCSS`{lang=html} 在构造实例的时候会先去合并用户的配置和默认的配置项`resolveConfig`{lang=ts}。

## ResolveConfig
于是我们进入到 `config.ts`{lang=ts}，我们来看看是如何合并用户配置的。

```ts
const config = Object.assign({}, defaults, userConfig) as UserConfigDefaults
const rawPresets = (config.presets || []).flatMap(toArray).map(resolvePreset)

const sortedPresets = [
    ...rawPresets.filter(p => p.enforce === 'pre'),
    ...rawPresets.filter(p => !p.enforce),
    ...rawPresets.filter(p => p.enforce === 'post'),
  ]

const layers = Object.assign(DEFAULT_LAYERS, ...rawPresets.map(i => i.layers), userConfig.layers)
```
`UnoCSS`{lang=html} 采用`assign`{lang=ts}合并配置，并对配置中的预设进行`enforce`{lang=ts} 排序，也对`layer`{lang=ts}进行合并。

```ts
type mergeKey = 'rules' | 'variants' | 'extractors' | 'shortcuts' | 'preflights' | 'preprocess' | 'postprocess' | 'extendTheme' | 'safelist'

function mergePresets<T extends mergeKey>(key: T): Required<UserConfig>[T] {
  return uniq([
    ...sortedPresets.flatMap(p => toArray(p[key] || []) as any[]),
    ...toArray(config[key] || []) as any[],
  ])
}
```
`mergePresets`{lang=ts} 函数会对预设中的部分 `key`进行合并，并返回一个数组。
> 此举主要是为了合并多个预设中的相同字段的值进行汇总。

### extractors
```ts
const extractors = mergePresets('extractors')
if (!extractors.length)
  extractors.push(extractorSplit)
extractors.sort((a, b) => (a.order || 0) - (b.order || 0))
```

用户可以在预设中，自定义提取器，于是我们对其进行合并，并对它的执行顺序进行排序

### rules
我们都知道，`UnoCSS`{lang=html}有动静态规则，用户可以完全控制规则，使`UnoCSS`{lang=html} 按照其逻辑进行返回内容。

```ts
const rules = mergePresets('rules')
const rulesStaticMap: ResolvedConfig['rulesStaticMap'] = {}

const rulesSize = rules.length

const rulesDynamic = rules
  .map((rule, i) => {
    if (isStaticRule(rule)) {
      const prefix = rule[2]?.prefix || ''
      rulesStaticMap[prefix + rule[0]] = [i, rule[1], rule[2], rule]
      // delete static rules so we can't skip them in matching
      // but keep the order
      return undefined
    }
    return [i, ...rule]
  })
  .filter(Boolean)
  .reverse() as ResolvedConfig['rulesDynamic']
```
我们通过循环所有的规则将动静态规则分离：
```ts
// types
{
  rulesStaticMap: Record<string, [number, CSSObject | CSSEntries, RuleMeta | undefined, Rule] | undefined>
  rulesDynamic: [number, ...DynamicRule][] // [规则的索引， 具体的规则逻辑][]
}
```
`UnoCSS`{lang=html} 的动态解析逻辑为倒序解析，所以在最后会有 `reverse`{lang=ts} 动作。因为静态规则是一个对象，如果遇到重复的 `key`，会后者覆盖前者。
> 用户自定义动态规则时，优先会解析后面的规则
如果你的静态规则与`presetUno`{lang=ts} 或者其他预设规则冲突，不必担心，在`mergePresets`{lang=ts}时，优先以用户规则为主。

> Check The [Playground](https://uno.antfu.me/play/?html=DwEwlgbgUABDDGBXAzgFwPYFsC0AnRANgKbIAiAngHYCGmY8sMqRAHqtgEwsFQB8j%2BYmSq16UYAHpwEfuOmMkaLHkJFGzNp258Bq4TToNJ0-kA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCCMMUwARgK4zDoCeZF1tAKpYIcAL5x0UCCDgByNiIDGVKnIBQ61AA9IsFBgCGbADbw0mHPkLAiACgTq4cKKeoAuOAG0nz73KU2KhgZAFpXE1Q5MiQlCBNoTzkWEzYo8QBdEl9nLwCgkJBwt2jEODiEqCTKZDlM7JzvAHoAPUDgsIjqABFuLEMQYCUAEiayOwBKOABeAD44B3L4xPkaurEJrMavVvbC4siqXv7BkbGFqbmF2OWq%2BRS09c3s5y3nfhoYKk8vD6ERSZ8SifBhMVgcLjcSZbDbqIA&options=N4IgzgLgTglgxhEAuaBXApgGhNAhgOzADMB7KAW2SNwBswsQp0wAHEwmAN3StvoF8gA)



### themes
```ts
const theme = clone([
  ...sortedPresets.map(p => p.theme || {}),
  config.theme || {},
].reduce((a, p) => mergeDeep(a, p), {}))

;(mergePresets('extendTheme') as ThemeExtender<any>[]).forEach(extendTheme => extendTheme(theme))
```
我们将所有预设中的 `theme`{lang=ts} 和用户自定义的 `theme`{lang=ts} 进行深度合并，最后将 `extendTheme`{lang=ts} 中的函数执行，将 `theme`{lang=ts} 作为参数传入，这样用户就可以对 `theme`{lang=ts} 进行扩展。

> 将来我会在`presetMini`中解析 `theme`，并介绍其中的用法，敬请期待。

### shortcuts
