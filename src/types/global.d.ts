import '@/store'
declare global {
  import { MessageInstance, HookAPI, NotificationInstance } from 'antd'
  export interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    $message: MessageInstance
    $modal: HookAPI
    $notification: NotificationInstance
  }
  export interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void
    browserLanguage: string
  }
  export type { RootState } from '@/store'
  // * Menu
  export namespace Menu {
    interface MenuOptions {
      path: string
      title: string
      icon?: string
      close?: boolean
      children?: MenuOptions[]
    }
  }
  export interface SetAction<T> {
    type: string
    payload: T
  }
  export interface ViteEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_PRE: string
    readonly VITE_PORT: number
    readonly VITE_GLOB_APP_TITLE: boolean
    readonly VITE_DROP_CONSOLE: boolean
    readonly VITE_BUILD_GZIP: boolean
    readonly VITE_MOCK: boolean
  }
  export interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_PRE: string
    readonly VITE_PORT: string
    readonly VITE_GLOB_APP_TITLE: string
    readonly VITE_DROP_CONSOLE: string
    readonly VITE_BUILD_GZIP: string
    readonly VITE_MOCK: string
  }
  export interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
