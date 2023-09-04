import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
import LayoutContainer from '@/layout'
// 常用组件
const drawRoutes: Array<RouteObject> = [
  {
    element: <LayoutContainer />,
    children: [
      {
        path: '/draw/svg',
        element: lazyLoad(
          lazy(() => import('@/views/draw/Svg')),
          {
            requiredAuth: true,
            title: 'svg画图',
            code: 'drawSvg'
          }
        )
      },
      {
        path: '/draw/canvas',
        element: lazyLoad(
          lazy(() => import('@/views/draw/Canvas')),
          {
            requiredAuth: true,
            title: 'canvas画图',
            code: 'drawCanvas'
          }
        )
      }
    ]
  }
]

export default drawRoutes
