import { useEffect, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { deepLoopFloat, findAllBreadcrumb, getOpenKeys } from '@/utils/system'
import { getMenus } from '@/api/user'
import { setAuthRouter, setAuthMenus } from '@/store/modules/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import { setBreadcrumbs } from '@/store/modules/breadcrumb/breadcrumbSlice'
import { isLink } from '@/utils/is'
type MenuItem = Required<MenuProps>['items'][number]

const MainMenu = (props: any) => {
  const navigateTo = useNavigate()
  const { collapsed } = useAppSelector((state) => ({
    collapsed: state.global.collapsed
  }))
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  function menuClick(menuItem: { key: string }) {
    if (isLink(menuItem.key)) return window.open(menuItem.key, '_blank')
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
