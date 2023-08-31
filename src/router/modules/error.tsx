import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'

const errorRoutes: Array<RouteObject> = [
  {
    path: '/404',
    meta: {
      requiredAuth: true,
      title: 'Not Found'
    },
    element: lazyLoad(lazy(() => import('@/views/error/404')))
  },
  {
    path: '/403',
    meta: {
      requiredAuth: true,
      title: 'Not Authorized'
    },
    element: lazyLoad(lazy(() => import('@/views/error/403')))
  }
]

export default errorRoutes
