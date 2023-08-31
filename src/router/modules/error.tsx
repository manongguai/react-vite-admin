import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'

const errorRoutes: Array<RouteObject> = [
  {
    path: '/404',
    element: lazyLoad(
      lazy(() => import('@/views/error/404')),
      {
        requiredAuth: true,
        title: 'Not Found',
        code: '404'
      }
    )
  },
  {
    path: '/403',
    element: lazyLoad(
      lazy(() => import('@/views/error/403')),
      {
        requiredAuth: true,
        title: 'Not Authorized',
        code: '403'
      }
    )
  }
]

export default errorRoutes
