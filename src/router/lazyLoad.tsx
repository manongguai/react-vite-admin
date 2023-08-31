import React, { Suspense, useRef, useState } from 'react'
import { Spin } from 'antd'
import RouterGuard from './RouterGuard'
import { MetaProps } from './interface'
/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const lazyLoad = (
  Comp: React.LazyExoticComponent<React.ComponentType>,
  meta?: MetaProps
): React.ReactNode => {
  return (
    <RouterGuard meta={meta}>
      <Suspense fallback={<Spin className="router-spin"></Spin>}>
        <Comp />
      </Suspense>
    </RouterGuard>
  )
}
export default lazyLoad
