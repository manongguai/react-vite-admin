import { Button, Dropdown, Menu, MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { useAppDispatch } from '@/hooks/redux.hooks'
import { setTabList } from '@/store/modules/tab/tabSlice'
import { useTranslation } from 'react-i18next'
const MoreBtn = (props: any) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const closeMultipleTab = (tabPath?: string) => {
    const handleTabsList = props.tabList.filter((item: Menu.MenuOptions) => {
      return item.path === tabPath || item.path === HOME_URL
    })
    dispatch(setTabList(handleTabsList))
    tabPath ?? navigate(HOME_URL)
  }
  const menu: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{t('tabs.closeCurrent')}</span>,
      onClick: () => props.delTabs(pathname)
    },
    {
      key: '2',
      label: <span>{t('tabs.closeOther')}</span>,
      onClick: () => closeMultipleTab(pathname)
    },
    {
      key: '3',
      label: <span>{t('tabs.closeAll')}</span>,
      onClick: () => closeMultipleTab()
    }
  ]
  return (
    <Dropdown
      menu={{
        items: menu
      }}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
      trigger={['click']}
    >
      <Button className="more-button" type="primary" size="small">
        {t('tabs.more')}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
export default MoreBtn
