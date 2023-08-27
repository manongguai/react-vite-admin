import { Tabs, message } from 'antd'
import { HomeFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { setTabList } from '@/store/modules/tab/tabSlice'
import './index.scss'
import { routes } from '@/router'
import { searchRoute } from '@/utils/system'
import MoreBtn from './MoreBtn'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'

const LayoutTabs = () => {
  const { tabList, themeConfig } = useAppSelector((state) => ({
    tabList: state.tab.tabList,
    themeConfig: state.global.themeConfig
  }))
  const dispatch = useAppDispatch()
  const { TabPane } = Tabs
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [activeValue, setActiveValue] = useState<string>(pathname)

  useEffect(() => {
    addTabs()
  }, [pathname])

  // click tabs
  const clickTabs = (path: string) => {
    navigate(path)
  }
  const addTabs = () => {
    const route = searchRoute(pathname, routes)
    let newtabList = JSON.parse(JSON.stringify(tabList))
    if (tabList.every((item: any) => item.path !== route.path)) {
      newtabList.push({ title: route.meta!.title, path: route.path })
    }
    dispatch(setTabList(newtabList))
    setActiveValue(pathname)
  }
  const delTabs = (tabPath?: string) => {
    if (tabPath === HOME_URL) return
    if (pathname === tabPath) {
      tabList.forEach((item: Menu.MenuOptions, index: number) => {
        if (item.path !== pathname) return
        const nextTab = tabList[index + 1] || tabList[index - 1]
        if (!nextTab) return
        navigate(nextTab.path)
      })
    }
    message.success('你删除了Tabs标签 😆😆😆')
    dispatch(
      setTabList(
        tabList.filter((item: Menu.MenuOptions) => item.path !== tabPath)
      )
    )
  }
  return (
    <>
      {themeConfig.tabs && (
        <div className="tabs">
          <Tabs
            animated
            activeKey={activeValue}
            onChange={clickTabs}
            hideAdd
            type="editable-card"
            onEdit={(path) => {
              delTabs(path as string)
            }}
          >
            {tabList.map((item: Menu.MenuOptions) => {
              return (
                <TabPane
                  key={item.path}
                  tab={
                    <span>
                      {item.path == HOME_URL ? <HomeFilled /> : ''}
                      {item.title}
                    </span>
                  }
                  closable={item.path !== HOME_URL}
                ></TabPane>
              )
            })}
          </Tabs>
          <MoreBtn tabList={tabList} delTabs={delTabs}></MoreBtn>
        </div>
      )}
    </>
  )
}

export default LayoutTabs
