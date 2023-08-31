import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
const iframeRoutes: Array<RouteObject> = [
  {
    path: '/iframe/bing',
    element: lazyLoad(
      lazy(() => import('@/views/Iframe')),
      {
        requiredAuth: true,
        code: 'bing',
        title: '必应',
        iframeSrc: 'https://cn.bing.com/'
      }
    )
  }
]

export default iframeRoutes
