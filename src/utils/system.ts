// 动态渲染 Icon 图标
import * as Icons from '@ant-design/icons'
import React from 'react'
import { Menu, MenuProps } from 'antd'
type MenuItem = Required<MenuProps>['items'][number]
const customIcons: { [key: string]: any } = Icons
export const addIcon = (name: string) => {
  if (!name) return null
  return React.createElement(customIcons[name])
}

export const getOpenKeys = (path: string) => {
  let newStr: string = ''
  const newArr: string[] = []
  const arr = path.split('/').map((i) => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}
export const getItem = (
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
// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
export const deepLoopFloat = (
  menuList: Menu.MenuOptions[],
  newArr: MenuItem[] = []
) => {
  const list = filterMenu(JSON.parse(JSON.stringify(menuList)))
  list.forEach((item: Menu.MenuOptions) => {
    if (item.isMenu) {
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
    }
  })
  return newArr
}

const filterMenu = (
  menuList: Menu.MenuOptions[],
  newArr: Menu.MenuOptions[] = []
) => {
  newArr = menuList.filter((menu) => menu.isMenu)
  newArr.forEach((menu) => {
    if (menu?.children?.length) {
      menu.children = filterMenu(menu.children)
    }
  })
  return newArr
}
