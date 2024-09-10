export interface Pagination {
  page: number
  size: number
}

export interface PaginationResult<T> {
  list: T[]
  total: number
}
