// 动态渲染 Icon 图标
import * as Icons from '@ant-design/icons'
import { RouteObject } from '@/router/interface'
import React from 'react'
import { Menu, MenuProps } from 'antd'
import store from '@/store'
import { setLogout } from '@/store/modules/user/userSlice'
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
  menuList.forEach((item: Menu.MenuOptions) => {
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

/**
 * @description 双重递归 找出所有 面包屑 生成对象存到 redux 中，就不用每次都去递归查找了
 * @param {String} menuList 当前菜单列表
 * @returns object
 */
export const findAllBreadcrumb = (
  menuList: Menu.MenuOptions[]
): { [key: string]: any } => {
  let handleBreadcrumbList: any = {}
  const loop = (menuItem: Menu.MenuOptions) => {
    // 下面判断代码解释 *** !item?.children?.length   ==>   (item.children && item.children.length > 0)
    if (menuItem?.children?.length)
      menuItem.children.forEach((item) => loop(item))
    else
      handleBreadcrumbList[menuItem.path] = getBreadcrumbList(
        menuItem.path,
        menuList
      )
  }
  menuList.forEach((item) => loop(item))
  return handleBreadcrumbList
}

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * @param {String} path 当前访问地址
 * @param {Array} menuList 菜单列表
 * @returns array
 */
export const getBreadcrumbList = (
  path: string,
  menuList: Menu.MenuOptions[]
) => {
  let tempPath: any[] = []
  try {
    const getNodePath = (node: Menu.MenuOptions) => {
      tempPath.push(node)
      // 找到符合条件的节点，通过throw终止掉递归
      if (node.path === path) {
        throw new Error('GOT IT!')
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i])
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        tempPath.pop()
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        tempPath.pop()
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i])
    }
  } catch (e) {
    return tempPath.map((item) => item.title)
  }
}

export const logout = () => {
  store.dispatch(setLogout())
  window.location.href = '/login'
}
