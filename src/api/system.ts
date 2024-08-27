import http from '@/utils/http'

export const getAllMenus = () => {
  return http.get<Menu.MenuOptions[]>('/menu/all', {})
}
