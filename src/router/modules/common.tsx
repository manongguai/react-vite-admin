import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'

// 常用组件
const commonRoutes: Array<RouteObject> = [
  {
    path: '/common/tour',
    element: lazyLoad(
      lazy(() => import('@/views/common/tour/index')),
      {
        requiredAuth: true,
        title: '漫游式引导',
        code: 'commonTour'
      }
    )
  },
  {
    path: '/common/icons',
    element: lazyLoad(
      lazy(() => import('@/views/common/icons/index')),
      {
        requiredAuth: true,
        title: '图标使用',
        code: 'commonIcons'
      }
    )
  }
]

export default commonRoutes
