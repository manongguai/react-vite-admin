import http from '@/utils/http'

export const getAllRoles = () => {
  return http.get<RoleItm[]>('/role/list')
}

export interface RoleItm {
  id: string
  name: string
  remark: string
}
