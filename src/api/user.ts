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
  return http.get<UserInfo>('/userInfo')
}

export const login = (userInfo: ReqLoginForm) => {
  return http.post<ResLogin>('/login', userInfo)
}

export const getMenuList = () => {
  return http.get<Menu.MenuOptions[]>('/menuList')
}
