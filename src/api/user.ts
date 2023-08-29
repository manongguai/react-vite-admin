import http from '@/utils/http'

interface UserInfo {
  name: string
  phone: string
}
export interface ReqLoginForm {
  username: string
  password: string
}
export interface ResLogin {
  accessToken: string
  refreshToken: string
}
export const getUserInfo = () => {
  return http.get<UserInfo>('/userInfo', {
    notAllowCancel: true
  })
}

export const login = (userInfo: ReqLoginForm) => {
  return http.post<ResLogin>('/login', userInfo)
}

export const getMenus = () => {
  return http.get<Menu.MenuOptions[]>('/menus')
}
