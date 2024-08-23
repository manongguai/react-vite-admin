import { useEffect, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  deepLoopFloat,
  findAllBreadcrumb,
  getOpenKeys,
  buildMenuTree
} from '@/utils/system'
import { getMenus } from '@/api/user'
import { setAuthMenus } from '@/store/modules/user/userSlice'
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
    let data: Menu.MenuOptions[] = []
    try {
      const res = await getMenus()
      data = res.data!
    } catch (error) {
      console.log(error)
    }

    const homeRoute = data?.find((t) => t.path === '/home')
    if (!homeRoute) {
      data?.unshift({
        path: '/home',
        name: '首页',
        icon: 'PieChartOutlined',
        code: 'home',
        type: 1,
        parentId: '0',
        id: '1'
      })
    }
    const menuTree: Menu.MenuTreeOptions[] = buildMenuTree(data)
    setMenuList(deepLoopFloat(menuTree))
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
