import { MappingAlgorithm } from 'antd'

export interface UserState {
  userInfo: {
    username?: string
    phone?: string
  }
  accessToken: string
  refreshToken: string
  menuList: Menu.MenuOptions[]
  authRouter: string[]
}

export type GlobalTheme = 'light' | 'dark'
export type GlobalLanguage = 'zh-CN' | 'en-US'

export interface GlobalState {
  collapsed: boolean
  language: GlobalLanguage
  themeConfig: {
    theme: GlobalTheme
    primary: string
    breadcrumb: boolean
    tabs: boolean
    footer: boolean
    themeAlgorithm: MappingAlgorithm
  }
}

export interface BreadcrumbState {
  breadcrumbs: {
    [propName: string]: any
  }
}
