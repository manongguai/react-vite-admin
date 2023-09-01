import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux.hooks'
import { setTabActive, setTabList } from '@/store/modules/tab/tabSlice'
import { HOME_URL } from '@/config/config'

export function useTabs() {
  const tabList = useAppSelector((state) => state.tab.tabList)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const delTab = (tabPath?: string) => {
    tabPath = tabPath || pathname
    if (tabPath === HOME_URL) return
    if (pathname === tabPath) {
      const index = tabList.findIndex((item) => item.path == pathname)
      const nextTab = tabList[index + 1] || tabList[index - 1]
      if (!nextTab) return
      navigate(nextTab.path)
    }
    dispatch(
      setTabList(
        tabList.filter((item: Menu.MenuOptions) => item.path !== tabPath)
      )
    )
  }
  const closeMultipleTab = (tabPath?: string) => {
    const handleTabsList = tabList.filter((item: Menu.MenuOptions) => {
      return item.path === tabPath || item.path === HOME_URL
    })
    dispatch(setTabList(handleTabsList))
    tabPath ?? navigate(HOME_URL)
  }
  const addTab = (title: string) => {
    let newTabList = JSON.parse(JSON.stringify(tabList))
    if (tabList.every((item: Menu.MenuOptions) => item.path !== pathname)) {
      newTabList.push({
        title: title,
        path: pathname
      })
    }
    dispatch(setTabList(newTabList))
    dispatch(setTabActive(pathname))
  }
  return {
    addTab,
    delTab,
    closeMultipleTab
  }
}
