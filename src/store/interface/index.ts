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

export interface GlobalState {
  collapsed: boolean
  language: 'zh-CN' | 'en-US'
  themeConfig: {
    theme: 'default' | 'dark'
    primary: string
    breadcrumb: boolean
    tabs: boolean
    footer: boolean
  }
}
