import '@/store'
declare global {
  import { MessageInstance, HookAPI, NotificationInstance } from 'antd'
  export interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    $message: MessageInstance
    $modal: HookAPI
    $notification: NotificationInstance
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
      isMenu?: boolean
    }
  }
  export interface SetAction<T> {
    type: string
    payload: T
  }
  export interface GlobEnv {
    VITE_BASE_URL: string
    VITE_PRE: string
    VITE_PORT: number
    VITE_GLOB_APP_TITLE: string
    VITE_DROP_CONSOLE: boolean
    VITE_BUILD_GZIP: boolean
  }
}
