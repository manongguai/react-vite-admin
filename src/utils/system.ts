// 动态渲染 Icon 图标
import * as Icons from '@ant-design/icons'
import { RouteObject } from '@/router/interface'
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

/**
 * @description: 过滤菜单
 * @return {*}
 */
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

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(
  routerList: Menu.MenuOptions[],
  newArr: string[] = []
) {
  routerList.forEach((item: Menu.MenuOptions) => {
    typeof item === 'object' && item.path && newArr.push(item.path)
    item.children && item.children.length && handleRouter(item.children, newArr)
  })
  return newArr
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (
  path: string,
  routes: RouteObject[] = []
): RouteObject => {
  let result: RouteObject = {}
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}
