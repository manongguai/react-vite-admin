import http from '@/utils/http'
import { isNullOrUnDef } from '@/utils/is'
import { createUserDto, updateUserDto, UserData } from '@/views/perm/users/type'
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

export interface UserParams {
  page: number
  size: number
  status?: number | undefined
  username?: string
}
export const getUserList = ({ page, size, status, username }: UserParams) => {
  return http.get<{
    list: UserData[]
    total: number
  }>(
    `/user/list?page=${page}&size=${size}&status=${
      isNullOrUnDef(status) ? '' : status
    }&username=${username || ''}`
  )
}

export const createUser = (data: createUserDto) => {
  return http.post('/user', data)
}
export const updateUser = (data: updateUserDto) => {
  return http.put('/user', data)
}
export const deleteUser = (id: string) => {
  return http.delete('/user/' + id)
}

export const getUserRoles = (id: string) => {
  return http.get('/user/' + id + '/role')
}

export const resetPassword = (id: string) => {
  return http.put(`user/password/reset/${id}`)
}

export const changeStatus = (data: { id: string; status: number }) => {
  return http.put(`/user/status/change`, data)
}
