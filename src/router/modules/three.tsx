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
        path: '/three/car',
        element: lazyLoad(
          lazy(() => import('@/views/three/car/Car')),
          {
            requiredAuth: true,
            title: '3D汽车展示',
            code: 'threeCar'
          }
        )
      },
      {
        path: '/three/christmas',
        element: lazyLoad(
          lazy(() => import('@/views/three/christmas/Christmas')),
          {
            requiredAuth: true,
            title: '圣诞贺卡',
            code: 'threeChristmas'
          }
        )
      }
    ]
  }
]

export default drawRoutes
