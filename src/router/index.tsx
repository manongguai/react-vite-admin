import { Navigate, createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import lazyLoad from '@/router/lazyLoad'
import LayoutContainer from '@/layout'
import Login from '@/views/login/index'
import { RouteObject } from './interface'
import i18n from '@/language'
import { getAuthRoutes } from '@/api/user'
import store from '@/store'

const rootLoader = async () => {
  const { data } = await getAuthRoutes()
  store.dispatch
  return data
}
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
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/',
    loader: rootLoader,
    id: 'root',
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
      },
      ...routerArray
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
export const browserRouter = createBrowserRouter(routes)
export default browserRouter
