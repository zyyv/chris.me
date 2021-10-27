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

  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions
  }
}
