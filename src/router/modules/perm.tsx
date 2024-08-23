import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
import LayoutContainer from '@/layout'
// 常用组件
const permRoutes: Array<RouteObject> = [
  {
    element: <LayoutContainer />,
    children: [
      {
        path: '/perm/users',
        element: lazyLoad(
          lazy(() => import('@/views/perm/users/index')),
          {
            requiredAuth: true,
            title: '用户管理',
            code: 'perm_users'
          }
        )
      },
      {
        path: '/perm/roles',
        element: lazyLoad(
          lazy(() => import('@/views/perm/roles/index')),
          {
            requiredAuth: true,
            title: '角色管理',
            code: 'perm_roles'
          }
        )
      },
      {
        path: '/perm/depts',
        element: lazyLoad(
          lazy(() => import('@/views/perm/depts2/index')),
          {
            requiredAuth: true,
            title: '部门管理',
            code: 'perm_depts'
          }
        )
      },
      {
        path: '/perm/posts',
        element: lazyLoad(
          lazy(() => import('@/views/perm/posts/index')),
          {
            requiredAuth: true,
            title: '岗位管理',
            code: 'perm_posts'
          }
        )
      }
    ]
  }
]

export default permRoutes
