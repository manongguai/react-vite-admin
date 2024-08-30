import http from '@/utils/http'

export const getAllMenus = () => {
  return http.get<Menu.MenuOptions[]>('/menu/all', {})
}

export const createMenu = (data: MenuDto) => {
  return http.post('/menu', data)
}
export const updateMenu = (data: MenuDto) => {
  return http.put('/menu', data)
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
