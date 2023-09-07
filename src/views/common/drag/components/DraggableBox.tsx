import React, { useEffect, useState } from 'react'
import styles from './draggable.module.scss'
import { useComponentStyle, usePointStyle } from '../hooks/useStyle'
import { AttrType } from '../types'
import { onMove } from '@/utils/util'
import useMouse from '../hooks/useMouse'

interface DraggableBoxProps {
  children: JSX.Element
  attrs: AttrType
  active?: boolean
  scale?: number // 后续需要验证大于0
  parent?: boolean
}

// 锚点
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']
// 光标朝向
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se']

const DraggableBox = (props: DraggableBoxProps) => {
  const { attrs, onPonitMouseHandle, onBoxMouseHandle, dragBoxRef } = useMouse(
    props.attrs,
    props.scale!,
    props.parent!
  )
  return (
    <div
      ref={dragBoxRef}
      className={styles.draggableBox}
      onMouseDown={onBoxMouseHandle}
      style={useComponentStyle(attrs, props.scale)}
    >
      {pointList.map((point, index) => {
        return (
          <div
            className={styles.draggablePoint + ' ' + styles[point]}
            key={point}
            onMouseDown={(e) => onPonitMouseHandle(e, point)}
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
  active: false,
  parent: true
}

export default DraggableBox
