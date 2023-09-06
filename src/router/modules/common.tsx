import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
import LayoutContainer from '@/layout'
// 常用组件
const commonRoutes: Array<RouteObject> = [
  {
    element: <LayoutContainer />,
    children: [
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
      },
      {
        path: '/common/drag',
        element: lazyLoad(
          lazy(() => import('@/views/common/drag/index')),
          {
            requiredAuth: true,
            title: '拖拽组件',
            code: 'commonDrag'
          }
        )
      }
    ]
  }
]

export default commonRoutes
