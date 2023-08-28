import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from '../interface'
import IFrame from '@/views/Iframe'

const iframeRoutes: Array<RouteObject> = [
  {
    path: '/iframe/bing',
    meta: {
      requiredAuth: true,
      title: '必应',
      iframeSrc: 'https://cn.bing.com/'
    },
    element: <IFrame />
  }
]

export default iframeRoutes
