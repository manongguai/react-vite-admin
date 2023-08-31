import { Navigate, useRouteLoaderData } from 'react-router-dom'
import { AxiosCanceler } from '@/utils/http/helper/axiosCancel'
import { MetaProps } from './interface'
import { useAppSelector } from '@/hooks/redux.hooks'
import { setAuthRouter } from '@/store/modules/user/userSlice'
import { useTabs } from '@/hooks/tabs.hooks'
const axiosCanceler = new AxiosCanceler()

interface IProps {
  children: JSX.Element
  meta?: MetaProps
}
/**
 * @description 路由守卫组件
 * */
const RouterGuard = (props: IProps) => {
  axiosCanceler.removeAllPending()
  const { accessToken } = useAppSelector((state) => state.user)
  const loaderData = useRouteLoaderData('root') as string[]
  // * 在跳转路由之前，清除所有的请求
  const { meta } = props
  useTabs(meta?.title || '')
  if (!meta?.requiredAuth) return props.children
  if (!accessToken) return <Navigate to="/login" replace />
  const staticRouter = ['/', 'home', '404', '403']
  const routerList = loaderData.concat(staticRouter)
  if (!routerList.includes(meta.code)) return <Navigate to="/403" />
  return <>{props.children}</>
}

export default RouterGuard
