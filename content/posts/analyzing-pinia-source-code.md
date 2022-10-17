---
title: 'Analyzing Pinia Source Code'
description: 'A deep dive into Pinia source code'
uid: 501
ctime: 2022-10-17T10:56:06.284Z
mtime: 2022-10-17T10:56:06.284Z
---

:ArticleToc
:ArticleHeader

## 前言
最近翻看`vue`的rfcs提案时，忽然看到`vuex5.0`的提案，看到社区也有很多的探索讲解，于是我想给大家来点干货，顺便记录下我学习`pinia`的过程。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d96b0f1f65dd443f888e8bce38a3c0b2~tplv-k3u1fbpfcp-watermark.image)
5.0的提案非常具有新鲜感，对比`vuex4`具有很大的改进
- 支持`options api` and `composition api`
- 没有`mutations`
- 没有嵌套的模块
- 更好`typescript`支持
- 自动化的代码差分

于是我`fork`的一份代码，为了充分的理解`pinia`的流程，我在`examples`文件夹下使用`webpack`搭建了一个本地服务进行代码调试，欢迎大家`clone`和`debug`

备注：`pinia version: 2.0`

官网：[https://pinia.esm.dev/](https://pinia.esm.dev)

我的git地址：[https://github.com/chris-zhu/learn-pinia](https://github.com/chris-zhu/learn-pinia)

> 以下直接进行源码拆分讲解，api部分参考官网

## 入口 `createPinia`
假设你阅读或使用过`pinia`，我们知道`pinia`的入口是通过`createPinia`创建的`Pinia`实例，当我们在`vue`中使用时，使用`app.use(pinia)`加载`pinia`
```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App).use(pinia)
app.mount('#app')
```

看下源码实现
```ts
export function createPinia(): Pinia {
  const state = ref({})
  let localApp: App | undefined
  const _p: Pinia['_p'] = []
  const toBeInstalled: PiniaStorePlugin[] = []

  // 这是当前的pinia实例
  const pinia: Pinia = markRaw({
    install(app: App) { // pinia 通过vue的插件机制，暴露对外的install方法
      pinia._a = localApp = app
      app.provide(piniaSymbol, pinia) // 通过provide提供pinia实例，供后续使用
      app.config.globalProperties.$pinia = pinia // 暴露全局属性 $pinia
      if (IS_CLIENT)
        setActivePinia(pinia) // 设置当前活跃的 pinia

      toBeInstalled.forEach(plugin => _p.push(plugin)) // 加载pinia插件
    },

    use(plugin) { // 这是pinia暴露的插件用法
      if (!localApp)
        toBeInstalled.push(plugin) // 将插件存入[]，待初始化的时候使用
      else
        _p.push(plugin)

      return this
    },

    _p,

    _a: localApp!, // app 实例

    state, // 所有状态
  })

  return pinia
}
```

> 详细注释已标明

可以看到 `pinia 实例`拥有`state = ref({})` 这其实是所有的state的集合，后面会在`init`的时候，将其他模块的`state`挂载到`pinia`下

其实`pinia`也更好的集成了 `vue devtools`

```ts
if (__DEV__ && IS_CLIENT)
  pinia.use(devtoolsPlugin)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a52d3485f554cf0954645dca9dfba3b~tplv-k3u1fbpfcp-watermark.image)


## 定义store `defineStore`
我们回顾一下 `defineStore Api`，可以看到，使用`defineStore`需要传入一个`options`配置，定义每一个`store`
```ts
import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
export const useStore = defineStore({
  // unique id of the store across your application
  id: 'storeId',
})
```
我们来看下源码是如何写的呢？

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/710f457604bc4ee78a01a20f7eb11914~tplv-k3u1fbpfcp-watermark.image)

可以清晰的看到，`defineStore` 简单的返回定义好的`useStore`，并标记唯一`$id`

我们看看内部的`useStore`是如何处理传入的`options`

> 个人见解：我将`useStore`分为4部分处理，下面逐一讲解

### 初始化形参`pinia`
粘贴部分代码讲解
```ts
const currentInstance = getCurrentInstance()
const shouldProvide = currentInstance && !pinia

pinia
  = (__TEST__ && activePinia && activePinia._testing ? null : pinia)
  || (currentInstance && inject(piniaSymbol))
```

```ts
if (shouldProvide)
  provide(storeAndDescriptor[2], store)
```

首先通过`vue`的`getCurrentInstance`拿到当前的vue实例，并判断形参的`pinia`是否存在，以后须判断是否需要向`children`提供当前的`store`

> 这里提前讲有点懵，可以先略过，稍后再回顾

`pinia` 如果没有则会通过`inject`获取，因为在 `app.use`的时候，`install`方法内已经提供了

### 设置`activePinia`
```ts
if (pinia) setActivePinia(pinia)
pinia = getActivePinia()
```
主要是设置当前活跃的是哪个`pinia`实例，当有多个`pinia`实例时，方便获取当前活跃的`pinia`实例

```ts
export let activePinia: Pinia | undefined

export const setActivePinia = (pinia: Pinia | undefined) =>
  (activePinia = pinia)

export const getActivePinia = () => {
  if (__DEV__ && !activePinia) {
    warn(
      '[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?\n\n'
        + 'const pinia = createPinia()\n'
        + 'app.use(pinia)\n\n'
        + 'This will fail in production.',
    )
  }

  return activePinia!
}
```


### 添加store缓存
```ts
export const storesMap = new WeakMap<
Pinia,
Map<
string,
[
  StoreWithState<string, StateTree>,
  StateDescriptor<StateTree>,
  InjectionKey<Store>,
]
>
>()
```
首先会导入一个`storesMap`，它的数据结构为`WeakMap`，`key`时一个`pinia`实例，`value`是一个`Map`结构

```ts
let storeCache = storesMap.get(pinia)
if (!storeCache) storesMap.set(pinia, (storeCache = new Map()))
```

先通过`pinia`作为`key`取`store`的缓存，如果缓存不存在，那么便设置一个新的`Map`
```ts
let storeAndDescriptor = storeCache.get(id)

let store: Store<Id, S, G, A>

if (!storeAndDescriptor) {
  // 下面传入的参数：{options.id, options.state, 还记得pinia实例的state吗shi?是个Ref对象} 
  storeAndDescriptor = initStore(id, state, pinia.state.value[id])
  storeCache.set(id, storeAndDescriptor)
  
  ...
} else {
  ...
}
```
可以清晰看到，`storeCahe`通过`id`获取store的缓存与store的一些描述符（`storeAndDescriptor`）

当我们没有获取到`storeCahe`时，会进行`initStore`的操作，并且可以看出`initStore`的返回结果，就是我们想要的`storeAndDescriptor`，并重新添加到缓存里面

### initStore
先看看 initStore 的参数与返回值
```ts
function initStore<
  Id extends string,
  S extends StateTree,
  G extends GettersTree<S>,
  A, /* extends ActionsTree */
>(
  $id: Id, // 每一个模块的id
  buildState: () => S = () => ({} as S), // 模块的state
  initialState?: S | undefined, // pinia实例下`{id}`的状态
): [
    StoreWithState<Id, S, G, A>,
    { get: () => S, set: (newValue: S) => void },
    InjectionKey<Store>,
  ] {
  // .. someCode
}
  ```
  形参在注释中标注，而我们可以看到返回值这一块，它将返回一个数组格式，
  - `StoreWithState`这是交给外部使用的`store`实例
  - 第二位其实是`state`的属性描述符
  - 这是一个需要`provide`提供的`InjectionKey`
  
然后看程序主体这一块
```ts
const pinia = getActivePinia()
pinia.state.value[$id] = initialState || buildState()
```
拿到当前活跃的`pinia`, 将模块的`state`通过`id`挂在到`pinia.state`下面


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5465363df38040c39adee7de5e2c2fce~tplv-k3u1fbpfcp-watermark.image)

后面是定义了一些变量，有我们经常使用的`patch`函数，然后是一些依赖的收集与触发，我们留到下一章再讲

```ts
const storeWithState: StoreWithState<Id, S, G, A> = {
  $id,
  _p: pinia,
  _as: actionSubscriptions as unknown as StoreOnActionListener[],

  // $state is added underneath

  $patch,
  $subscribe,
  $onAction,
  $reset,
} as StoreWithState<Id, S, G, A>

const injectionSymbol = __DEV__
  ? Symbol(`PiniaStore(${$id})`)
  : /* istanbul ignore next */
  Symbol()
 ```
 
 我们可以看到`storeWithState`的完整形态，它包含了一些属性与方法暴露给外部使用
 
 而我们的`injectionSymbol`是一个包含`$id`的`Symbol`类型
 
 ```ts
 return [
   storeWithState,
   {
     get: () => pinia.state.value[$id] as S,
     set: (newState: S) => {
       isListening = false
       pinia.state.value[$id] = newState
       isListening = true
     },
   },
   injectionSymbol,
 ]
```
值得注意的是，数组的第二位是我们`descriptor`，主要是对state的获取与设置，因为我们可以通过在`pinia`实例上通过`id`拿到模块的`state`

最后返回用数组包装的数据。`initStore`结束
 
### buildStoreToUse
回到`defineStore`的过程，当我们`initStore`结束，拿到`storeAndDescriptor`，会进行一个设置缓存的动作（上面有提到）

那么`store`到底是什么数据格式呢，其实还是要通过`buildStoreToUse`包装一下

```ts
store = buildStoreToUse<
Id,
S,
G,
// @ts-expect-error: A without extends
A
>(
  storeAndDescriptor[0], // storeWithState
  storeAndDescriptor[1], // descriptor
  id, // options.id
  getters, // options.getters
  actions, // options.actions
  options,
)
  ```
那我们来看看是如何包装的把

#### getters
首先拿到当前活跃的`pinia`实例
```ts
const pinia = getActivePinia()

const computedGetters: StoreWithGetters<G> = {} as StoreWithGetters<G>
for (const getterName in getters) {
  computedGetters[getterName] = computed(() => {
    setActivePinia(pinia)
    return getters[getterName].call(store, store)
  }) as StoreWithGetters<G>[typeof getterName]
}
```
可以看到，使用了`for in`循环处理我们的配置的`getters`，同时，`getters`的`key`缓存到了`computedGetters`里面，并且使用`computed`包裹，实现了真正的计算属性。对`getters`通过`call`绑定`this`到`store`，并传入`store`到`getters`内


#### actions
```ts
const wrappedActions: StoreWithActions<A> = {} as StoreWithActions<A>
for (const actionName in actions) {
  wrappedActions[actionName] = function(this: Store<Id, S, G, A>) {
    setActivePinia(pinia)
    const args = Array.from(arguments) as Parameters<A[typeof actionName]>
    const localStore = this || store // 兼容箭头函数处理

    let afterCallback: (
      resolvedReturn: UnwrapPromise<ReturnType<A[typeof actionName]>>
    ) => void = noop
    let onErrorCallback: (error: unknown) => void = noop
    function after(callback: typeof afterCallback) {
      afterCallback = callback
    }
    function onError(callback: typeof onErrorCallback) {
      onErrorCallback = callback
    }

    partialStore._as.forEach((callback) => {
      callback({ args, name: actionName, store: localStore, after, onError })
    })

    let ret: ReturnType<A[typeof actionName]>
    try {
      ret = actions[actionName].apply(localStore, args as unknown as any[])
      Promise.resolve(ret).then(afterCallback).catch(onErrorCallback)
    } catch (error) {
      onErrorCallback(error)
      throw error
    }

    return ret
  } as StoreWithActions<A>[typeof actionName]
}
```
同样看到使用`for in`循环处理我们的`actions`，`actions`的`key`处理到了`wrappedActions`里面，
当我们触发`action`时，首先会设置最新的`pinia`实例。定义了一个`localStore`，并对其做了一个兼容处理，当时`action`为箭头函数时，`localStore`会指向`store`。

```ts
partialStore._as.forEach((callback) => {
  callback({ args, name: actionName, store: localStore, after, onError })
})
```
然后`action`的触发会对收集到的依赖进行发布

```ts
let ret: ReturnType<A[typeof actionName]>
try {
  ret = actions[actionName].apply(localStore, args as unknown as any[])
  Promise.resolve(ret).then(afterCallback).catch(onErrorCallback)
} catch (error) {
  onErrorCallback(error)
  throw error
}
return ret
```
可以看到`action`的触发通过`apply`的方式传参，绑定`this`为`localStore`，同时它讲`arguments`数组化作为`payload`传入第二个参数，这意味着，在我们的`actions`中，可以有多个`payload`进行传递

我们`actions`执行的结果保存到`ret`中，再用`promise`包裹一层，最后我们返回原始的`ret`值。其实在这里我们可以看到，`Pinia`实现了将`actions`同步和异步的共同处理。对比`vuex`，`actions`是处理异步任务的配置项，返回结果用`promise`包装。而`Pinia`则是直接返回`actions`的返回值，通过`promise`进行事件循环的微任务执行，达到异步的处理。

#### store

```ts
const store: Store<Id, S, G, A> = reactive(
  assign(
    __DEV__ && IS_CLIENT
      ? // devtools custom properties
        {
          _customProperties: markRaw(new Set<string>()),
        }
      : {},
    partialStore,
    // using this means no new properties can be added as state
    computedFromState(pinia.state, $id),
    computedGetters,
    wrappedActions,
  ),
) as Store<Id, S, G, A>
 ```
然后处理我们的store，其实是使用了`Object.assign`进行混合

其实我们已经理解到`store`的`state`、`getters`都是用`computed`进行包装。使得我们可以直接对`state`进行直接的修改，对比`vuex`的`mutations`修改，操作上也是简化了不少

```ts
Object.defineProperty(store, '$state', descriptor)
```
然后给`store`的`$state`添加我们传过来的属性描述符

最后返回`store`，`buildStoreToUse`结束。


```ts
if (shouldProvide)
  provide(storeAndDescriptor[2], store)
 ```
 回到最初的`shouldProvide`，它决定是否允许`child`重用这个`store`以避免创建一个新的`store`

## 总结

第一章，简单介绍了入门篇章，后面将持续讲解，不定期更新。

以上及以下是我对`Pinia`的个人理解，如果不足或失误，请指正。

![pinia_1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63bdb685dd27444d99ff1cc682acf6fc~tplv-k3u1fbpfcp-watermark.image)
