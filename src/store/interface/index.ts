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
