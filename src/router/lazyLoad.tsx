import React, { Suspense, useRef, useState } from 'react'
import { Spin } from 'antd'
/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const lazyLoad = (
  Comp: React.LazyExoticComponent<React.ComponentType>
): React.ReactNode => {
  return (
    <Suspense fallback={<Spin className="router-spin"></Spin>}>
      <Comp />
    </Suspense>
  )
}
export default lazyLoad
