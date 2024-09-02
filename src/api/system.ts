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

export interface MenuDto {
  code: string
  menuPermList: any[]
  name: string
  orderNum: number
  parentId: string
  type: number
  id?: string
}
