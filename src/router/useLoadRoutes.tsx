import { useAppSelector } from '@/hooks/redux.hooks'
import { useState, useEffect, lazy, ComponentType } from 'react'
import { RouteObject } from './interface'
import { buildMenuTree } from '@/utils/system'
import lazyLoad from './lazyLoad'

// * 导入所有router
const viewModules = import.meta.glob('../views/**/*.tsx', {
  eager: true
}) as Record<
  string,
  {
    default: ComponentType<{}>
  }
>

export default function useLoadRoutes() {
  const { authMenus } = useAppSelector((store) => store.user)
  const [routes, setRoutes] = useState([] as RouteObject[])

  useEffect(() => {
    const dynamicRoutes = createDynamicRoutes(authMenus)
    setRoutes(dynamicRoutes)
  }, [authMenus])

  return {
    dynamicRoutes: routes
  }
}

export function createDynamicRoutes(menus: Menu.MenuOptions[]): RouteObject[] {
  const routeMenus = menus.filter((menu) => menu.type === 1 && menu.path)
  const menuTree: Menu.MenuTreeOptions[] = buildMenuTree(routeMenus)
  function getDynamicRoutes(menus: Menu.MenuTreeOptions[]): RouteObject[] {
    const dynamicRoutes: RouteObject[] = []
    menus.forEach((item) => {
      const route = buildDynamicRoute(item)
      if (item.children && item.children.length > 0) {
        route.children = getDynamicRoutes(item.children)
      }
      dynamicRoutes.push(route)
    })
    return dynamicRoutes
  }
  return getDynamicRoutes(menuTree)
}

function buildDynamicRoute(menu: Menu.MenuTreeOptions): RouteObject {
  if (menu?.children && menu.children.length) {
    return {
      path: menu.path
    }
  }
  const element = viewModules[`../views${menu.path}/index.tsx`]
  if (!element) {
    throw new Error(`找不到 ${menu.path} 对应的路由文件`)
  }
  return {
    path: menu.path,
    element: lazyLoad(
      lazy(() => Promise.resolve(element)),
      {
        title: menu.name,
        requiredAuth: true,
        code: menu.code
      }
    )
  }
}
