import { Tabs, message } from 'antd'
import { CloseOutlined, HomeFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { setTabList } from '@/store/modules/tab/tabSlice'
import './index.scss'
import MoreBtn from './MoreBtn'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'

const LayoutTabs = () => {
  const { tabList, themeConfig } = useAppSelector((state) => ({
    tabList: state.tab.tabList,
    themeConfig: state.global.themeConfig
  }))
  const tabActive = useAppSelector((state) => state.tab.tabActive)
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const clickTabs = (path: string) => {
    navigate(path)
  }
  const delTabs = (tabPath?: string) => {
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
  const items = tabList.map((item: Menu.MenuOptions) => {
    return {
      key: item.path,
      label: (
        <span>
          {item.path == HOME_URL ? <HomeFilled /> : ''}
          {item.title}
        </span>
      ),
      closeIcon: item.path == HOME_URL ? false : <CloseOutlined />
    }
  })
  return (
    <>
      {themeConfig.tabs && (
        <div className="layout-tabs">
          <Tabs
            animated
            items={items}
            activeKey={tabActive}
            onChange={clickTabs}
            hideAdd
            type="editable-card"
            onEdit={(path) => {
              delTabs(path as string)
            }}
          ></Tabs>
          <MoreBtn tabList={tabList} delTabs={delTabs}></MoreBtn>
        </div>
      )}
    </>
  )
}

export default LayoutTabs
