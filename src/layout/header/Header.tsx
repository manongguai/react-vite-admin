import { Header } from 'antd/es/layout/layout'
import { theme } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'

const HeaderComponent = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Header className="header-box" style={{ background: colorBgContainer }}>
      {/* 面包屑 */}
      <BreadcrumbNav></BreadcrumbNav>
    </Header>
  )
}

export default HeaderComponent
