import { Breadcrumb } from 'antd'
import React from 'react'

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb
      items={[
        {
          href: '/',
          title: '首页'
        },
        {
          href: '/home',
          title: 'home'
        }
      ]}
      style={{ lineHeight: '64px' }}
    ></Breadcrumb>
  )
}

export default BreadcrumbComponent
