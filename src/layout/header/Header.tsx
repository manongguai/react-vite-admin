import { Header } from 'antd/es/layout/layout'
import { Col, Row, Space, theme } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import AvatarIcon from './components/AvatarIcon'
import Fullscreen from './components/Fullscreen'
import CollapseIcon from './components/CollapseIcon'

const HeaderComponent = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Header className="header-box" style={{ background: colorBgContainer }}>
      {/* 面包屑 */}
      <Row justify={'space-between'} align="middle">
        <Col>
          <Space align="center" size={20}>
            <CollapseIcon></CollapseIcon>
            <BreadcrumbNav></BreadcrumbNav>
          </Space>
        </Col>
        <Col>
          <Space align="center" size={20}>
            <Fullscreen />
            <AvatarIcon></AvatarIcon>
          </Space>
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderComponent
