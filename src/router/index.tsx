import { Navigate, useRoutes } from 'react-router-dom'
import { lazy, useEffect, useState } from 'react'
import lazyLoad from '@/router/lazyLoad'
import LayoutContainer from '@/layout'
import Login from '@/views/login/index'
import { RouteObject } from './interface'
import i18n from '@/language'
import useLoadRoutes from './useLoadRoutes'

// * 导入所有router
const metaRouters = import.meta.glob('./modules/*.tsx', {
  eager: true
}) as Record<
  string,
  {
    [key: string]: any
  }
>

// * 处理路由
export const routerArray: RouteObject[] = []
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key])
  })
})
export const staticRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      {
        path: '/home',
        element: lazyLoad(
          lazy(() => import('@/views/Home')),
          {
            title: i18n.t('home.title'),
            requiredAuth: true,
            code: 'home'
          }
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]
const Router = () => {
  const { dynamicRoutes } = useLoadRoutes()
  const [routes, setRoutes] = useState([] as RouteObject[])
  useEffect(() => {
    dynamicRoutes.forEach((route) => {
      staticRoutes[1].children!.push(route)
    })
    setRoutes(staticRoutes)
  }, [dynamicRoutes])

  return useRoutes(routes)
}
export default Router
