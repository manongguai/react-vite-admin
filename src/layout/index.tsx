import React from 'react'
import { Layout, theme } from 'antd'
import './layout.scss'
import { Outlet } from 'react-router-dom'
import Sider from './Sider'
import Header from './header/Header'
import Footer from './Footer'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import { setCollapsed } from '@/store/modules/global/globalSlice'
const { Content } = Layout
const LayoutContainer: React.FC = () => {
  const { collapsed, themeConfig } = useAppSelector((state) => ({
    collapsed: state.global.collapsed,
    themeConfig: state.global.themeConfig
  }))
  const dispatch = useAppDispatch()
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Layout>
      {/* 左边侧边栏 */}
      <Sider
        collapsed={collapsed}
        setCollapsed={(collapsed) => dispatch(setCollapsed(collapsed))}
      ></Sider>
      {/* 有边内容 */}
      <Layout className="container-box">
        {/* 头部 */}
        <Header></Header>
        <Content
          style={{
            margin: '12px 12px',
            background: colorBgContainer,
            padding: '12px',
            overflow: 'auto'
          }}
        >
          {/* 可视区 */}
          <Outlet></Outlet>
        </Content>
        {/* 底部 */}
        {themeConfig.footer && <Footer></Footer>}
      </Layout>
    </Layout>
  )
}

export default LayoutContainer
