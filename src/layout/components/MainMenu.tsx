import { useEffect, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  deepLoopFloat,
  findAllBreadcrumb,
  getOpenKeys,
  searchRoute
} from '@/utils/system'
import { getMenus } from '@/api/user'
import { handleRouter } from '@/utils/system'
import { setAuthRouter, setAuthMenus } from '@/store/modules/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import { setBreadcrumbs } from '@/store/modules/breadcrumb/breadcrumbSlice'
type MenuItem = Required<MenuProps>['items'][number]

const MainMenu = (props: any) => {
  const navigateTo = useNavigate()
  const { collapsed, authMenus } = useAppSelector((state) => ({
    collapsed: state.global.collapsed,
    authMenus: state.user.authMenus
  }))
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  function menuClick(menuItem: { key: string }) {
    const route = searchRoute(menuItem.key, authMenus)
    if (route.isLink) return window.open(route.path, '_blank')
    navigateTo(menuItem.key)
  }
  const [openKeys, setOpenKeys] = useState<string[]>([])
  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname])
    collapsed ? null : setOpenKeys(getOpenKeys(pathname))
  }, [pathname, collapsed])

  // 点击展开菜单
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey])
    } else {
      setOpenKeys(keys)
    }
  }
  const getMenuData = async () => {
    const { data } = await getMenus()
    if (!data) return
    setMenuList(deepLoopFloat(data))
    dispatch(setBreadcrumbs(findAllBreadcrumb(data)))
    // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
    const dynamicRouter = handleRouter(data)
    dispatch(setAuthRouter(dynamicRouter))
    // 拥有的路由权限
    dispatch(setAuthMenus(data))
  }
  useEffect(() => {
    getMenuData()
  }, [])
  return (
    <Menu
      {...props}
      theme="dark"
      defaultSelectedKeys={['/home']}
      selectedKeys={selectedKeys}
      mode="inline"
      items={menuList}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={menuClick}
    />
  )
}

export default MainMenu
