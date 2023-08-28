import { Header } from 'antd/es/layout/layout'
import { Col, Row, Space } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import AvatarIcon from './components/AvatarIcon'
import Fullscreen from './components/Fullscreen'
import CollapseIcon from './components/CollapseIcon'

const HeaderComponent = () => {
  return (
    <Header className="layout-header">
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
