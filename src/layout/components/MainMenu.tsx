import React, { useEffect, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { addIcon, getOpenKeys } from '@/utils/system'
import { getMenuList } from '@/api/user'
import { handleRouter } from '@/utils/util'
import {
  setAuthRouter,
  setMenuList as setMenuListAction
} from '@/store/modules/user/userSlice'
import { useAppDispatch } from '@/hooks/redux.hooks'
type MenuItem = Required<MenuProps>['items'][number]
const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
// const [items, setItem] = useState([
//   {
//     key: '/home',
//     label: '首页'
//   }
// ])

const MainMenu = (props: any) => {
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const currentRoute = useLocation()
  const pathname = currentRoute.pathname
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  function menuClick(menuItem: { key: string }) {
    navigateTo(menuItem.key)
  }
  const [openKeys, setOpenKeys] = useState<string[]>([])
  // 刷新页面菜单保持高亮,父菜单自动展开
  useEffect(() => {
    setOpenKeys(getOpenKeys(pathname))
  }, [pathname])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey])
    } else {
      setOpenKeys(keys)
    }
  }
  const getMenuData = async () => {
    const { data } = await getMenuList()
    if (!data) return
    setMenuList(deepLoopFloat(data))
    // 存储处理过后的所有面包屑导航栏到 redux 中
    // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
    const dynamicRouter = handleRouter(data)
    dispatch(setAuthRouter(dynamicRouter))
    dispatch(setMenuListAction(data))
  }
  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (
    menuList: Menu.MenuOptions[],
    newArr: MenuItem[] = []
  ) => {
    menuList.forEach((item: Menu.MenuOptions) => {
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length)
        return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)))
      newArr.push(
        getItem(
          item.title,
          item.path,
          addIcon(item.icon!),
          deepLoopFloat(item.children)
        )
      )
    })
    return newArr
  }
  useEffect(() => {
    getMenuData()
  }, [])
  return (
    <Menu
      {...props}
      theme="dark"
      defaultSelectedKeys={['/home']}
      selectedKeys={[pathname]}
      mode="inline"
      items={menuList}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={menuClick}
    />
  )
}

export default MainMenu
