import { Button, Dropdown, MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const MoreBtn = (props: any) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const menu: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{t('tabs.closeCurrent')}</span>,
      onClick: () => props.delTabs(pathname)
    },
    {
      key: '2',
      label: <span>{t('tabs.closeOther')}</span>,
      onClick: () => props.closeMultipleTab(pathname)
    },
    {
      key: '3',
      label: <span>{t('tabs.closeAll')}</span>,
      onClick: () => props.closeMultipleTab()
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
