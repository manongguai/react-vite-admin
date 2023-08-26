import { useAppSelector } from '@/hooks/redux.hooks'
import { Breadcrumb } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
const BreadcrumbNav = () => {
  const { pathname } = useLocation()
  const { breadcrumbs, themeConfig } = useAppSelector((state) => ({
    breadcrumbs: state.breadcrumb.breadcrumbs,
    themeConfig: state.global.themeConfig
  }))
  const [breadcrumbItems, setBreadcrumbItems] = useState([])
  useEffect(() => {
    const breadcrumbList = (breadcrumbs[pathname] || []).map(
      (breadcrumb: string) => {
        return {
          title: breadcrumb
        }
      }
    )
    if (pathname == '/home') {
      breadcrumbList.shift()
    }
    breadcrumbList.unshift({
      title: '首页',
      href: '/home'
    })
    setBreadcrumbItems(breadcrumbList)
  }, [pathname, breadcrumbs])
  return (
    <>
      {themeConfig.breadcrumb && (
        <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      )}
    </>
  )
}
export default BreadcrumbNav
