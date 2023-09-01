import { useAppSelector } from '@/hooks/redux.hooks'
import { Breadcrumb } from 'antd'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const BreadcrumbNav = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { breadcrumbs, themeConfig } = useAppSelector((state) => ({
    breadcrumbs: state.breadcrumb.breadcrumbs,
    themeConfig: state.global.themeConfig
  }))
  const breadcrumbItems = useMemo(() => {
    const home = [
      {
        title: t('home.title'),
        href: '/home'
      }
    ]
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
    return home.concat(breadcrumbList)
  }, [pathname, breadcrumbs, t])

  return (
    <>
      {themeConfig.breadcrumb && (
        <div id="driver-breadcrumb">
          <Breadcrumb items={breadcrumbItems}></Breadcrumb>
        </div>
      )}
    </>
  )
}
export default BreadcrumbNav
