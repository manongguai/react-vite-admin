import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'

const userRoutes: Array<RouteObject> = [
  {
    path: '/user/list',
    meta: {
      requiredAuth: true,
      title: '用户列表'
    },
    element: lazyLoad(lazy(() => import('@/views/User/index')))
  },
  {
    path: '/user/detail',
    meta: {
      requiredAuth: true,
      title: '用户详情'
    },
    element: lazyLoad(lazy(() => import('@/views/User/detail')))
  }
]

export default userRoutes
