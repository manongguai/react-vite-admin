import { Pagination, PaginationResult } from '@/components/Page/type'
import http from '@/utils/http'

export interface OssApiResult {
  id: string
  // 文件路径
  url: string
  // 文件size
  size: number
  // 文件 mimetype
  type: string
  // 注释
  business: string

  userId: string

  userAccount: string

  createDate: string
}

export interface findOssList extends Pagination {
  startDay?: string

  endDay?: string
}

export function getFileList(params: findOssList) {
  return http.request<PaginationResult<OssApiResult>>({
    url: '/oss/list',
    method: 'get',
    params
  })
}

export function fileUpload(data: FormData) {
  return http.request<OssApiResult[]>({
    url: '/oss/upload',
    method: 'post',
    data
  })
}
