import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
import LayoutContainer from '@/layout'

// 测试路由，全屏无layout
const testRoutes: Array<RouteObject> = [
  {
    path: '/test',
    element: lazyLoad(
      lazy(() => import('@/views/test/index')),
      {
        requiredAuth: true,
        title: '测试页面',
        code: 'test'
      }
    )
  }
]

export default testRoutes
