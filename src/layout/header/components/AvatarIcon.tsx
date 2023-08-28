import { useRef } from 'react'
import { Avatar, Modal, Menu, Dropdown, message, Space, MenuProps } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import PasswordModal from './PasswordModal'
import InfoModal from './InfoModal'
import avatar from '@/assets/images/avatar.jpeg'
import { logout } from '@/utils/system'

const AvatarIcon = () => {
  const navigate = useNavigate()
  interface ModalProps {
    showModal: (params: { name: number }) => void
  }
  const passRef = useRef<ModalProps>(null)
  const infoRef = useRef<ModalProps>(null)

  // 退出登录
  const handleLogout = () => {
    Modal.confirm({
      title: '温馨提示 🧡',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        logout()
        message.success('退出登录成功！')
      }
    })
  }
  // Dropdown Menu
  const menu: MenuProps['items'] = [
    {
      key: '1',
      label: <span className="dropdown-item">首页</span>,
      onClick: () => navigate(HOME_URL)
    },
    {
      key: '2',
      label: <span className="dropdown-item">个人信息</span>,
      onClick: () => infoRef.current!.showModal({ name: 11 })
    },
    {
      key: '3',
      label: <span className="dropdown-item">修改密码</span>,
      onClick: () => passRef.current!.showModal({ name: 11 })
    },
    {
      type: 'divider'
    },
    {
      key: '4',
      label: <span className="dropdown-item">退出登录</span>,
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
