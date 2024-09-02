import http from '@/utils/http'
import { UserData } from '@/views/perm/users/type'
export interface UserInfo {
  username?: string
  phone?: string
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
  return http.get<UserInfo>(
    '/user/one/info',
    {},
    {
      notAllowCancel: true
    }
  )
}

export const login = (userInfo: ReqLoginForm) => {
  return http.post<ResLogin>('/auth/login', userInfo, {
    notAllowCancel: true
  })
}

export const getMenus = () => {
  return http.get<Menu.MenuOptions[]>(
    '/perm/menu',
    {},
    {
      notAllowCancel: true
    }
  )
}

export const getAuthRoutes = () => {
  return http.get<string[]>(
    '/perm/authRoutes',
    {},
    {
      notAllowCancel: true
    }
  )
}

export const getUserList = ({
  page,
  size,
  status,
  account
}: {
  page: number
  size: number
  status?: number
  account?: string
}) => {
  return http.get<{
    list: UserData[]
    total: number
  }>(
    `/user/list?page=${page}&size=${size}&status=${status || ''}&account=${
      account || ''
    }`
  )
}
