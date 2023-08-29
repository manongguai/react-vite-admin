import { Header } from 'antd/es/layout/layout'
import { Col, Row, Space, App } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import AvatarIcon from './components/AvatarIcon'
import Fullscreen from './components/Fullscreen'
import CollapseIcon from './components/CollapseIcon'
import Language from './components/Language'

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
            <Language />
            <Fullscreen />
            {/* App组件是为了让message获取上下文 */}
            <App>
              <AvatarIcon />
            </App>
          </Space>
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderComponent
