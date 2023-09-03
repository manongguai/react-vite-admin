import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
import LayoutContainer from '@/layout'
const iframeRoutes: Array<RouteObject> = [
  {
    element: <LayoutContainer />,
    children: [
      {
        path: '/iframe/bing',
        loader: () => {
          return {
            iframeSrc: 'https://cn.bing.com/'
          }
        },
        element: lazyLoad(
          lazy(() => import('@/views/Iframe')),
          {
            requiredAuth: true,
            code: 'bing',
            title: '必应'
          }
        )
      }
    ]
  }
]

export default iframeRoutes
