import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'

const userRoutes: Array<RouteObject> = [
  {
    path: '/user/list',
    element: lazyLoad(
      lazy(() => import('@/views/User/index')),
      {
        requiredAuth: true,
        title: '用户列表',
        code: 'userList'
      }
    )
  },
  {
    path: '/user/detail/:id',
    element: lazyLoad(
      lazy(() => import('@/views/User/detail')),
      {
        requiredAuth: true,
        title: '用户详情',
        code: 'userDetail'
      }
    )
  }
]

export default userRoutes
