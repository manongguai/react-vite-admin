import React from 'react'
import { Layout } from 'antd'
import './layout.scss'
import { Outlet } from 'react-router-dom'
import Sider from './Sider'
import Header from './header/Header'
import Footer from './Footer'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import { setCollapsed } from '@/store/modules/global/globalSlice'
import LayoutTabs from './tabs'
import ConfigurationBtn from '@/components/ConfigurationBtn'
import { Spin } from 'antd'

const { Content } = Layout
const LayoutContainer: React.FC = () => {
  const { collapsed, themeConfig } = useAppSelector((state) => ({
    collapsed: state.global.collapsed,
    themeConfig: state.global.themeConfig
  }))
  const dispatch = useAppDispatch()

  return (
    <Layout className="layout-container">
      {/* 左边侧边栏 */}
      <Sider
        collapsed={collapsed}
        setCollapsed={(collapsed) => dispatch(setCollapsed(collapsed))}
      ></Sider>
      {/* 有边内容 */}
      <Layout className="container-box">
        {/* 头部 */}
        <Header></Header>
        <LayoutTabs></LayoutTabs>
        <Content className="layout-content">
          <div className="layout-content-main">
            {/* 可视区 */}
            <Outlet></Outlet>
          </div>
        </Content>
        {/* 底部 */}
        {themeConfig.footer && <Footer></Footer>}
      </Layout>
      <ConfigurationBtn></ConfigurationBtn>
    </Layout>
  )
}

export default LayoutContainer
