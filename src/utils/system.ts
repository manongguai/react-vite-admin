// 动态渲染 Icon 图标
import * as Icons from '@ant-design/icons'
import React from 'react'
const customIcons: { [key: string]: any } = Icons
export const addIcon = (name: string) => {
  return React.createElement(customIcons[name])
}

export const getOpenKeys = (path: string) => {
  let newStr: string = ''
  const newArr: string[] = []
  const arr = path.split('/').map((i) => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}
