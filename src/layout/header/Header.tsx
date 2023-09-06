import { Header } from 'antd/es/layout/layout'
import { Col, Row, Space, App } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import AvatarIcon from './components/AvatarIcon'
import Fullscreen from './components/Fullscreen'
import CollapseIcon from './components/CollapseIcon'
import Language from './components/LanguageIcon'
import ThemeIcon from './components/ThemeIcon'
import GithubIcon from './components/GithubIcon'

const HeaderComponent = () => {
  return (
    <Header className="layout-header">
      {/* 面包屑 */}
      <Row justify={'space-between'} align="middle" wrap={false}>
        <Col>
          <Space align="center" size={20}>
            <CollapseIcon></CollapseIcon>
            <BreadcrumbNav></BreadcrumbNav>
          </Space>
        </Col>
        <Col>
          <Space align="center" size={2}>
            <GithubIcon />
            <Language />
            <ThemeIcon></ThemeIcon>
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
