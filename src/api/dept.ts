import http from '@/utils/http'

export interface ICreateOrUpdateDept {
  id?: string
  parentId: string
  name: string
  leader: string
  remark: string
  orderNum: number
}

export interface DeptApiResult {
  id: string
  name: string
  parentId: string
  status: 0 | 1
  leader: string
  remark: string
  orderNum: number
}

export function getDeptList() {
  return http.request<DeptApiResult[]>({
    url: '/dept/list',
    method: 'get'
  })
}

export function createDept(data: ICreateOrUpdateDept) {
  return http.request({
    url: '/dept',
    method: 'post',
    data
  })
}

export function updateDept(data: ICreateOrUpdateDept) {
  return http.request({
    url: '/dept',
    method: 'put',
    data
  })
}

export function deleteDept(id: string) {
  return http.request({
    url: `/dept/${id}`,
    method: 'delete'
  })
}
