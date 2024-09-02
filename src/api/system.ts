import http from '@/utils/http'

export const getAllMenus = () => {
  return http.get<Menu.MenuOptions[]>('/menu/all?hasBtn=1')
}

export const createMenu = (data: MenuDto) => {
  return http.post('/menu', data)
}
export const updateMenu = (data: MenuDto) => {
  return http.put('/menu', data)
}
export const deleteMenu = (id: string) => {
  return http.delete('/menu/' + id)
}

export const getAllPerms = () => {
  return http.get<PermItem[]>('/perm/all')
}
export const getMenuPerm = (id: string) => {
  return http.get<MenuPermItem[]>(`menu/one/${id}/menu-perm`)
}

export interface MenuDto {
  code: string
  menuPermList: any[]
  name: string
  orderNum: number
  parentId: string
  type: number
  id?: string
}

export interface PermItem {
  desc: string
  method: string
  path: string
}

export interface MenuPermItem {
  id: string
  menuId: string
  apiUrl: string
  apiMethod: string
}
