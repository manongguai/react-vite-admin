import { Tabs } from 'antd'
import { CloseOutlined, HomeFilled } from '@ant-design/icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import './index.scss'
import MoreBtn from './MoreBtn'
import { useAppSelector } from '@/hooks/redux.hooks'
import { useTabs } from '@/hooks/tabs.hooks'

const LayoutTabs = () => {
  const { tabList, themeConfig } = useAppSelector((state) => ({
    tabList: state.tab.tabList,
    themeConfig: state.global.themeConfig
  }))
  const tabActive = useAppSelector((state) => state.tab.tabActive)
  const navigate = useNavigate()

  const clickTabs = (path: string) => {
    navigate(path)
  }
  const { delTab, closeMultipleTab } = useTabs()

  const items = useMemo(() => {
    return tabList.map((item: Menu.MenuOptions) => {
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
  }, [tabList])
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
              delTab(path as string)
            }}
          ></Tabs>
          <MoreBtn
            delTabs={delTab}
            closeMultipleTab={closeMultipleTab}
          ></MoreBtn>
        </div>
      )}
    </>
  )
}

export default LayoutTabs
