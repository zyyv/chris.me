---
title: "How to write a pinia plugin 🤔️"
description: "一文带入走进 Pinia 插件的世界"
uid: 501
ctime: 2022-10-17T10:51:13.858Z
mtime: 2022-10-17T10:51:13.858Z
---

:ArticleToc
:ArticleHeader


## plugin 能干嘛

-   向`store`添加新属性
-   定义`store`时添加新选项
-   向`store`添加新方法
-   包装现有方法
-   更改甚至取消操作
-   实现本地存储等副作用
-   **只**对特定的`store`应用

## plugin本质

`pinia`的插件本质是一个函数，函数的返回值会混入到`store`

案例上手：
```typescript
import { createPinia } from 'pinia'

// 向所有的store混入一个secret属性
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
pinia.use(SecretPiniaPlugin)
```
```typescript
// 使用 
const store = useStore()
store.secret // 'the cake is a lie'
```

```typescript
export interface Pinia {
  install: Exclude<Plugin['install'], undefined>
  state: Ref<Record<string, StateTree>>
  use(plugin: PiniaStorePlugin): Pinia // 使用插件
  _p: Array<PiniaStorePlugin>
  _a: App
  _testing?: boolean
}
```

```typescript
use(plugin) {
  if (!localApp) {
    toBeInstalled.push(plugin)
  } else {
    _p.push(plugin)
  }
  return this
}
```
看一下源码的类型定义，我们可以看到`pinia`通过`use`使用插件，使用的插件会存放在实例的`_p`数组中，并返回`this`，即当前的实例。

## 插件的使用时机
```typescript
function buildStoreToUse(
  partialStore: StoreWithState<Id, S, G, A>,
  descriptor: StateDescriptor<S>,
  $id: Id,
  getters: G = {} as G,
  actions: A = {} as A,
  options: DefineStoreOptions<Id, S, G, A>
) {
  ... // 省略部分代码
  // apply all plugins
  pinia._p.forEach((extender) => {
    if (__DEV__ && IS_CLIENT) {
      // @ts-expect-error: conflict between A and ActionsTree
      const extensions = extender({ store, app: pinia._a, pinia, options })
      Object.keys(extensions || {}).forEach((key) =>
        store._customProperties.add(key)
      )
      assign(store, extensions)
    } else {
      // 插件返回的结果混合到 store 上面
      // @ts-expect-error: conflict between A and ActionsTree
      assign(store, extender({ store, app: pinia._a, pinia, options }))
    }
  })

  return store
}
```
在`buildStoreToUse`函数中我们可以看到插件的应用，而`buildStoreToUse`恰好也是`useStore`的最后一步，此时我们可以拿到`store`的完整所有属性。

我们看到函数对`pinia._p`的所有插件进行循环，`extender`即我们`use`的插件。插件在此刻运行，把`{ store, app: pinia._a, pinia, options }`作为参数传递给我们的插件，而这个参数就是我们插件拿到的上下文。最后插件的返回结果会通过`Object.assign`进行混合。

即插件应用成功。此刻我们的`store`的能力就进行增加。

```typescript
export function myPiniaPlugin(context) {
  context.pinia // the pinia created with `createPinia()`
  context.app // the current app created with `createApp()` (Vue 3 only)
  context.store // the store the plugin is augmenting
  context.options // the options object defining the store passed to `defineStore()`
  // ...
}
```

## 简单的案例

我们可以通过简单地在插件中返回它们的对象来向每个商店添加属性：

```typescript
pinia.use(() => ({ hello: 'world' }))
```

还可以直接在`store`上设置属性

```typescript
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

插件*返回*的任何属性都将被 devtools 自动跟踪，因此为了`hello`在 devtools 中可见，请确保`store._customProperties` 仅当您想在 devtools 中调试它时才将其添加到dev 模式：

```typescript
// from the example above
pinia.use(({ store }) => {
  store.hello = 'world'
  // make sure your bundler handle this. webpack and vite should do it by default
  if (process.env.NODE_ENV === 'development') {
    store._customProperties.add('secret')
  }
})
```
