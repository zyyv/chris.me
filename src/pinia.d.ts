/// <reference types="pinia" />

import { StateTree, GettersTree } from 'pinia'

export interface PersistStrategy {
  key?: string
  storage?: Storage
  paths?: string[]
}

export interface PersistOptions {
  enabled: true
  strategies?: PersistStrategy[]
}

declare module 'pinia' {
  export interface DefineStoreOptions<
    Id extends string,
    S extends StateTree,
    G extends GettersTree<S>,
    A
  > {
    persist?: PersistOptions
  }
}
