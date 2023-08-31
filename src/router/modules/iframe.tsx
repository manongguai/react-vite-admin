import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
const iframeRoutes: Array<RouteObject> = [
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

export default iframeRoutes
