import { Pagination, PaginationResult } from '@/components/Page/type'
import http from '@/utils/http'
import { isNullOrUnDef } from '@/utils/is'

export interface QueryPostList extends Pagination {
  name?: string
  code?: string
  status?: string | 0 | 1
}

export interface ICreateOrUpdatePost {
  id?: string
  name: string
  code?: string
  remark: string
  status?: 1 | 0
  orderNum: number
}

export interface PostApiResult {
  id: string
  code: string
  name: string
  status: 0 | 1
  remark: string
  orderNum: number
  createDate: string
}

/** 查询岗位列表 */
export function getPostList(params: QueryPostList) {
  if (isNullOrUnDef(params.status)) {
    delete params.status
  }
  return http.request<PaginationResult<PostApiResult>>({
    url: '/post/list',
    method: 'get',
    params
  })
}

/** 创建岗位 */
export function createPost(data: ICreateOrUpdatePost) {
  return http.request({
    url: '/post',
    method: 'post',
    data
  })
}

/** 更新岗位 */
export function updatePost(data: ICreateOrUpdatePost) {
  return http.request({
    url: '/post',
    method: 'put',
    data
  })
}

/** 删除岗位 */
export function deletePost(id: string) {
  return http.request({
    url: `/post/${id}`,
    method: 'delete'
  })
}

export function getPostDetail(id: string) {
  return http.request<PostApiResult>({
    url: `/post/${id}`,
    method: 'get'
  })
}
