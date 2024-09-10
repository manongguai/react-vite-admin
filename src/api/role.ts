import { Pagination, PaginationResult } from '@/components/Page/type'
import http from '@/utils/http'

export const getAllRoles = () => {
  return http.get<RoleItm[]>('/role/list')
}

export interface RoleItm {
  id: string
  name: string
  remark: string
}

export interface QueryRoleList extends Pagination {
  name?: string
}

export interface RoleApiResult extends RoleItm {
  roleMenuList?: []
}

export interface ICreateOrUpdateRole {
  id?: string
  // 角色名称
  name?: string
  // 角色备注
  remark?: string
  // 菜单id
  menuIds?: string[]
}

export function getRoleList(params?: QueryRoleList) {
  return http.request<PaginationResult<RoleApiResult>>({
    url: '/role/listAndCount',
    method: 'get',
    ...{ params }
  })
}

export function getRolePerms(id: string) {
  return http.request<string[]>({
    url: `/role/one/${id}/perms`,
    method: 'get'
  })
}

export function createRole(data: ICreateOrUpdateRole) {
  return http.request<RoleApiResult>({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(data: ICreateOrUpdateRole) {
  return http.request<RoleApiResult>({
    url: '/role',
    method: 'put',
    data
  })
}

export function delRole(id: string) {
  return http.request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
