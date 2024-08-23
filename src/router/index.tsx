import { Navigate, useRoutes } from 'react-router-dom'
import { lazy, useEffect, useState } from 'react'
import lazyLoad from '@/router/lazyLoad'
import LayoutContainer from '@/layout'
import Login from '@/views/login/index'
import { RouteObject } from './interface'
import i18n from '@/language'
import useLoadRoutes from './useLoadRoutes'
import FullLoading from '@/components/Loading/FullLoading'
import { useAppSelector } from '@/hooks/redux.hooks'
import useMenu from '@/hooks/menu.hooks'

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
          lazy(() => import('@/views/home')),
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
  useMenu() // 请求菜单
  const { dynamicRoutes } = useLoadRoutes()
  const [isLoaded, setIsLoaded] = useState(false)
  const { accessToken } = useAppSelector((store) => store.user)

  const [routes, setRoutes] = useState(staticRoutes)
  useEffect(() => {
    if (dynamicRoutes.length > 0) {
      const newRoutes = [...staticRoutes]
      dynamicRoutes.forEach((route) => {
        newRoutes[1].children!.push(route)
      })
      setRoutes(newRoutes)
      setIsLoaded(true)
    }
  }, [dynamicRoutes])

  if (accessToken && !isLoaded) {
    return useRoutes([{ path: '*', element: <FullLoading></FullLoading> }])
  }
  return useRoutes(routes)
}
export default Router
