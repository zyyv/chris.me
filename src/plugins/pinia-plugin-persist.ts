import type { PersistStrategy, PiniaPluginContext } from 'pinia'

type Store = PiniaPluginContext['store']
type PartialState = Partial<Store['$state']>

function updateStorage(strategy: PersistStrategy, store: Store) {
  const storage = strategy.storage || sessionStorage
  const storeKey = strategy.key || store.$id

  if (strategy.paths) {
    const partialState = strategy.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key]
      return finalObj
    }, {} as PartialState)

    storage.setItem(storeKey, JSON.stringify(partialState))
  } else {
    storage.setItem(storeKey, JSON.stringify(store.$state))
  }
}

export const piniaPluginPersist = ({
  options,
  store,
}: PiniaPluginContext): void => {
  if (options.persist?.enabled) {
    const defaultStrat: PersistStrategy[] = [
      {
        key: store.$id,
        storage: sessionStorage,
      },
    ]

    const strategies = options.persist.strategies?.length
      ? options.persist.strategies
      : defaultStrat

    strategies.forEach((strategy) => {
      const storageKey = strategy.key || store.$id
      const storage = strategy.storage || sessionStorage
      const storageResult = storage.getItem(storageKey)
      if (storageResult) {
        store.$patch(JSON.parse(storageResult))
        updateStorage(strategy, store)
      }
    })

    // TODO： 这里是全量更新，应该采用diff，找到最小更新节点，少量更新
    watch(
      () => store.$state,
      () => {
        strategies.forEach((strategy) => {
          updateStorage(strategy, store)
        })
      },
      { immediate: true, deep: true },
    )
  }
}
