import React, { useEffect, useState } from 'react'
import styles from './draggable.module.scss'
import { useComponentStyle, usePointStyle } from '../hooks/useStyle'
import { AttrType } from '../types'
import { onMove } from '@/utils/util'

interface DraggableBoxProps {
  children: JSX.Element
  attrs: AttrType
  active?: boolean
  scale?: number // 后续需要验证大于0
}

// 锚点
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']
// 光标朝向
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se']

const DraggableBox = (props: DraggableBoxProps) => {
  let remove = () => {}
  const [attrs, setAttrs] = useState(props.attrs)
  function onMouseDown(
    mouseDownEvent: any,
    point: string,
    attrs: AttrType,
    scale: number
  ) {
    mouseDownEvent.stopPropagation()
    mouseDownEvent.preventDefault()
    const itemAttrX = attrs.x
    const itemAttrY = attrs.y
    const itemAttrW = attrs.w
    const itemAttrH = attrs.h
    // 记录点击初始位置
    const startX = mouseDownEvent.screenX
    const startY = mouseDownEvent.screenY
    remove = onMove((moveEvent) => {
      let currX = Math.round((moveEvent.screenX - startX) / scale)
      let currY = Math.round((moveEvent.screenY - startY) / scale)
      const isTop = /t/.test(point)
      const isBottom = /b/.test(point)
      const isLeft = /l/.test(point)
      const isRight = /r/.test(point)
      const newHeight = itemAttrH + (isTop ? -currY : isBottom ? currY : 0)
      const newWidth = itemAttrW + (isLeft ? -currX : isRight ? currX : 0)
      attrs.h = newHeight > 0 ? newHeight : 0
      attrs.w = newWidth > 0 ? newWidth : 0
      attrs.x = itemAttrX + (isLeft ? currX : 0)
      attrs.y = itemAttrY + (isTop ? currY : 0)
      setAttrs({ ...attrs })
    })
  }
  useEffect(() => {
    return () => remove()
  }, [])
  return (
    <div
      className={styles.draggableBox}
      style={useComponentStyle(attrs, props.scale)}
    >
      {pointList.map((point, index) => {
        return (
          <div
            className={styles.draggablePoint + ' ' + styles[point]}
            key={point}
            onMouseDown={(e) => onMouseDown(e, point, attrs, props.scale!)}
            style={usePointStyle(point, index, attrs, cursorResize)}
          ></div>
        )
      })}
      {props.active && <div className={styles.draggableActiveModal}></div>}
      {props.children}
    </div>
  )
}
DraggableBox.defaultProps = {
  scale: 1,
  active: false
}

export default DraggableBox
