import { languageEnums } from '@/enums/languageEnum'
import { MappingAlgorithm } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'

export interface UserState {
  userInfo: {
    username?: string
    phone?: string
  }
  accessToken: string
  refreshToken: string
  authMenus: Menu.MenuOptions[]
  authRouter: string[]
}

export type GlobalTheme = 'light' | 'dark'
export type GlobalLanguage = languageEnums.ZH | languageEnums.EN | ''

// 色弱模式，灰色模式，默认
export type WeakOrGray = 'weak' | 'gray' | null
export interface GlobalState {
  collapsed: boolean
  language: GlobalLanguage
  themeConfig: {
    fullScreenIcon: boolean
    componentSize: SizeType
    languageIcon: boolean
    theme: GlobalTheme
    primary: string
    breadcrumb: boolean
    tabs: boolean
    footer: boolean
    themeAlgorithm: MappingAlgorithm
    weakOrGray: WeakOrGray
    collapseIcon: boolean
  }
}

export interface BreadcrumbState {
  breadcrumbs: {
    [propName: string]: any
  }
}

export interface TabState {
  tabActive: string
  tabList: Menu.MenuOptions[]
}
