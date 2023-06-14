---
title: "带你深入了解 UnoCSS 核心引擎"
description: "一文带你深入了解 UnoCSS 核心引擎"
uid: 501
ctime: 2022-10-19T07:43:45.683Z
mtime: 2022-10-19T07:43:45.683Z
draft: false
---

:ArticleToc
<!-- :ArticleHeader -->

# {{ $doc.title}}

{{  $doc.ctime  }}

## Dirs
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
const uno = createGenerator({ // 你的配置 })
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
`mergePresets`{lang=ts} 函数会对预设中的部分`key`{lang=ts}进行合并，并返回一个数组。
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


### shortcuts
我们知道我们的`shortcuts`{lang=ts}也有动静态区分，`StaticShortcutMap`{lang=ts} `DynamicShortcut<Theme>`{lang=ts}，而且`shortcuts`的类型不一，既可以是`Array`{lang=ts} Or `Object`{lang=ts}，所以我们需要对其进行处理：
```ts
export function resolveShortcuts(shortcuts: UserShortcuts): Shortcut[] {
  return toArray(shortcuts).flatMap((s) => {
    if (Array.isArray(s))
      return [s]
    return Object.entries(s)
  })
}
```

还记得我们的`rawPreset`{lang=ts}吗？在`preset`{lang=ts} `Resolve`{lang=html} 时，我们会将`shortcuts`{lang=ts}和`rules`{lang=ts}进行一并处理
主要是因为当我们的`preset`{lang=ts}中指定了`prefix`{lang=ts} `layer`{lang=ts}时，为了使其工作在正确的预设环境中，我们需要将其进行一次`Resolve`{lang=html}。
```ts
if (preset.prefix || preset.layer) {
  const apply = (i: Rule | Shortcut) => {
    if (!i[2])
      i[2] = {}
    const meta = i[2]
    if (meta.prefix == null && preset.prefix)
      meta.prefix = preset.prefix
    if (meta.layer == null && preset.layer)
      meta.prefix = preset.layer
  }
  shortcuts?.forEach(apply)
  preset.rules?.forEach(apply)
}
```

### themes
```ts
const theme = clone([
  ...sortedPresets.map(p => p.theme || {}),
  config.theme || {},
].reduce((a, p) => mergeDeep(a, p), {}))

;(mergePresets('extendTheme') as ThemeExtender<any>[]).forEach(extendTheme => extendTheme(theme))
```
我们将所有预设中的 `theme`{lang=ts} 和用户自定义的 `theme`{lang=ts} 进行深度合并，最后将 `extendTheme`{lang=ts} 中的函数执行，将 `theme`{lang=ts} 作为参数传入，这样用户就可以对 `theme`{lang=ts} 进行扩展。

> 将来我会在`presetMini`{lang=ts}中解析 `theme`{lang=ts}，并介绍其中的用法，敬请期待。

### autocomplete
提取每个预设中的 `autocomplete`{lang=ts}，并将其合并为一个数组，最后将其作为 `autocomplete`{lang=ts} 的值。
```ts
const autocomplete = {
  templates: uniq(sortedPresets.map(p => toArray(p.autocomplete?.templates)).flat()),
  extractors: sortedPresets.map(p => toArray(p.autocomplete?.extractors)).flat()
    .sort((a, b) => (a.order || 0) - (b.order || 0)),
}
```

`ResolveConfig` 流程结束，最后返回我们的 `config`{lang=ts}。
```ts
return {
  mergeSelectors: true,
  warn: true,
  blocklist: [],
  sortLayers: layers => layers,
  ...config,
  presets: sortedPresets,
  envMode: config.envMode || 'build',
  shortcutsLayer: config.shortcutsLayer || 'shortcuts',
  layers,
  theme,
  rulesSize,
  rulesDynamic,
  rulesStaticMap,
  preprocess: mergePresets('preprocess') as Preprocessor[],
  postprocess: mergePresets('postprocess') as Postprocessor[],
  preflights: mergePresets('preflights'),
  autocomplete,
  variants: mergePresets('variants').map(normalizeVariant),
  shortcuts: resolveShortcuts(mergePresets('shortcuts')),
  extractors,
  safelist: mergePresets('safelist'),
}
``` 

## Generate
`UnoCSS`{lang=html} 的 `Generate`{lang=html} 核心，主要是将我们的 `input`{lang=ts} 解析生成 `css`{lang=ts}。

```ts
async generate(
  input: string | Set<string> | string[],
  options: GenerateOptions = {},
): Promise<GenerateResult> {
  const {
    id, // 在提取token阶段用到文件id
    scope, // 生成的css的作用域
    preflights = true, // 是否生成preflights
    safelist = true, // 是否应用safelist
    minify = false, // 是否压缩css
  } = options
  
  // ...
}  
```
首先我们先观察函数的参数与返回值，我们可以看到，`input`{lang=ts} 可以是 `string`{lang=ts} `Set`{lang=ts} `Array`{lang=ts}，`options`{lang=ts} 有 `id`{lang=ts} `scope`{lang=ts} `preflights`{lang=ts} `safelist`{lang=ts} `minify`{lang=ts}，返回值是一个`Promise`{lang=ts} `GenerateResult`{lang=ts}。


### applyExtractors
`UnoCSS`{lang=html} 会将 `input`{lang=ts} 交给 `extractors`{lang=ts} 进行解析提取`token`{lang=ts}，最终提取出的 `token`{lang=ts} 会是`Set`{lang=ts} `string`{lang=ts}的形式，确保每个 `token`{lang=ts} 是唯一的。
```ts
const tokens: Readonly<Set<string>> = isString(input)
      ? await this.applyExtractors(input, id)
      : Array.isArray(input)
        ? new Set(input)
        : input
```

因为我们的 `config.extractors`{lang=ts} 是一个数组，所以我们需要遍历它，将 `input`{lang=ts} 交给每个 `extractor`{lang=ts} 进行解析，最后将所有解析出来的 `token`{lang=ts} 合并为一个 `Set`{lang=ts}。
```ts
const context: ExtractorContext = {
  get original() { return code },
  code,
  id,
}

for (const extractor of this.config.extractors) {
  const result = await extractor.extract(context)
  if (result) {
    for (const token of result)
      set.add(token)
  }
}
``` 

如果我们应用了`safelist`{lang=ts}，那么我们还需要将`safelist`{lang=ts}中的`token`{lang=ts}合并到`set`{lang=ts}中。
```ts
if (safelist)
  this.config.safelist.forEach(s => tokens.add(s))
```

最后我们得到了我们需要去解析的所有`token`{lang=ts}，接下来将这些`token`{lang=ts}解析成`css`{lang=ts}。
