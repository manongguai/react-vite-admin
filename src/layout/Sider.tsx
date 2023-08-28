import Sider from 'antd/es/layout/Sider'
import MainMenu from './components/MainMenu'
import SiderTitle from './components/SiderTitle'
interface PropsType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}
const SiderComponent = ({ collapsed, setCollapsed }: PropsType) => {
  return (
    <Sider
      className="layout-sider"
      // collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="sider-box">
        <SiderTitle collapsed={collapsed}></SiderTitle>
        <MainMenu className="layout-sider-menu"></MainMenu>
      </div>
    </Sider>
  )
}

export default SiderComponent
