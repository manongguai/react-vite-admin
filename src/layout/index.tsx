import React from 'react'
import { Layout, theme } from 'antd'
import './layout.scss'
import { Outlet } from 'react-router-dom'
import Sider from './Sider'
import Header from './Header'
import Footer from './Footer'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import { setCollapsed } from '@/store/modules/global/globalSlice'
const { Content } = Layout
const LayoutContainer: React.FC = () => {
  const collapsed = useAppSelector((state) => state.global.collapsed)
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
            margin: '16px 16px 0',
            background: colorBgContainer,
            padding: '12px',
            overflow: 'auto'
          }}
        >
          {/* 可视区 */}
          <Outlet></Outlet>
        </Content>
        {/* 底部 */}
        <Footer></Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutContainer
