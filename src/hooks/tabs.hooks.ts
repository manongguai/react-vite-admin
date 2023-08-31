import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux.hooks'
import { setTabActive, setTabList } from '@/store/modules/tab/tabSlice'

export function useTabs(title: string) {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { tabList } = useAppSelector((state) => ({
    tabList: state.tab.tabList
  }))
  useEffect(() => {
    if (title) {
      addTabs()
    }
  }, [pathname])

  const addTabs = () => {
    let newtabList = JSON.parse(JSON.stringify(tabList))
    if (tabList.every((item: any) => item.path !== pathname)) {
      newtabList.push({
        title: title,
        path: pathname
      })
    }
    dispatch(setTabList(newtabList))
    dispatch(setTabActive(pathname))
  }
}
