import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
import LayoutContainer from '@/layout'

const userRoutes: Array<RouteObject> = [
  {
    element: <LayoutContainer />,
    children: [
      {
        path: '/user/list',
        element: lazyLoad(
          lazy(() => import('@/views/user/index')),
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
          lazy(() => import('@/views/user/detail')),
          {
            requiredAuth: true,
            title: '用户详情',
            code: 'userDetail'
          }
        )
      }
    ]
  }
]

export default userRoutes
