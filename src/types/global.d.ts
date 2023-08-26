import '@/store'

declare global {
  export interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
  export type { RootState } from '@/store'

  // * Menu
  export namespace Menu {
    interface MenuOptions {
      path: string
      title: string
      icon?: string
      isLink?: string
      close?: boolean
      children?: MenuOptions[]
    }
  }
  export interface SetAction<T> {
    type: string
    payload: T
  }
}
