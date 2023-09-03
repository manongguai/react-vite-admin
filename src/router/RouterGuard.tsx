import { Navigate, useRouteLoaderData } from 'react-router-dom'
import { AxiosCanceler } from '@/utils/http/helper/axiosCancel'
import { MetaProps } from './interface'
import { useTabs } from '@/hooks/tabs.hooks'
import { useEffect } from 'react'
import { useAppSelector } from '@/hooks/redux.hooks'
const axiosCanceler = new AxiosCanceler()

interface IProps {
  children: JSX.Element
  meta?: MetaProps
}
/**
 * @description 路由守卫组件
 * */
const RouterGuard = (props: IProps) => {
  const loaderData = useRouteLoaderData('root') as string[]
  console.log(loaderData)

  useEffect(() => {
    // 添加tab
    props?.meta?.title && addTab(props.meta.title)
  }, [props])
  const { addTab } = useTabs()
  // * 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending()
  const { accessToken } = useAppSelector((state) => state.user)
  const { meta } = props
  if (!meta?.requiredAuth) return props.children
  if (!accessToken) return <Navigate to="/login" replace />
  const staticRouter = ['/', 'home', '404', '403']
  const routerList = loaderData.concat(staticRouter)
  if (!routerList.includes(meta.code)) return <Navigate to="/403" />
  return <>{props.children}</>
}

export default RouterGuard
