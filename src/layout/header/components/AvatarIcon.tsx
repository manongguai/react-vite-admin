import { useRef } from 'react'
import { Avatar, Dropdown, Space, MenuProps, App } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import PasswordModal from './PasswordModal'
import InfoModal from './InfoModal'
import avatar from '@/assets/images/avatar.jpeg'
import { logout } from '@/utils/system'
import { useTranslation } from 'react-i18next'
const AvatarIcon = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { modal, message } = App.useApp()
  interface ModalProps {
    showModal: (params: { name: number }) => void
  }
  const passRef = useRef<ModalProps>(null)
  const infoRef = useRef<ModalProps>(null)

  // 退出登录
  const handleLogout = () => {
    modal.confirm({
      title: `${t('notification.title')} 🧡`,
      icon: <ExclamationCircleOutlined />,
      content: t('user.logoutTitle'),
      okText: t('notification.confirm'),
      cancelText: t('notification.cancel'),
      onOk: () => {
        logout()
        message.success(t('user.logoutSuccess'))
      }
    })
  }
  // Dropdown Menu
  const menu: MenuProps['items'] = [
    {
      key: '1',
      label: <span className="dropdown-item">{t('home.title')}</span>,
      onClick: () => navigate(HOME_URL)
    },
    {
      key: '2',
      label: <span className="dropdown-item">{t('user.personalData')}</span>,
      onClick: () => infoRef.current!.showModal({ name: 11 })
    },
    {
      key: '3',
      label: <span className="dropdown-item">{t('user.changePassword')}</span>,
      onClick: () => passRef.current!.showModal({ name: 11 })
    },
    {
      type: 'divider'
    },
    {
      key: '4',
      label: <span className="dropdown-item">{t('user.logout')}</span>,
      onClick: handleLogout
    }
  ]
  return (
    <>
      <Dropdown
        menu={{
          items: menu
        }}
        placement="bottom"
        arrow
        trigger={['click']}
      >
        <Space>
          <div>Kirk</div>
          <Avatar size="large" src={avatar} />
        </Space>
      </Dropdown>
      <InfoModal innerRef={infoRef}></InfoModal>
      <PasswordModal innerRef={passRef}></PasswordModal>
    </>
  )
}

export default AvatarIcon
