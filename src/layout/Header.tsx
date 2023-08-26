import Breadcrumb from './components/Breadcrumb'
import { Header } from 'antd/es/layout/layout'
import { theme } from 'antd'

const HeaderComponent = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Header style={{ paddingLeft: '16px', background: colorBgContainer }}>
      {/* 面包屑 */}
      <Breadcrumb></Breadcrumb>
    </Header>
  )
}

export default HeaderComponent
