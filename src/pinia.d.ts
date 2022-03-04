import 'pinia'

declare module 'pinia' {
  export interface PersistStrategy {
    key?: string
    storage?: Storage
    paths?: string[]
  }

  export interface PersistOptions {
    enabled: true
    strategies?: PersistStrategy[]
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: PersistOptions
  }
}
