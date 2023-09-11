import React, { useImperativeHandle } from 'react'
import './draggable.scss'
import { useComponentStyle, usePointStyle } from '../hooks/useStyle'
import { AttrType, DragMode } from '../types'
import useMouse from '../hooks/useMouse'

export interface DraggableBoxProps {
  mode?: DragMode // 手动模式还是自动模式，手动模式是需要自己给attrs赋值
  children: React.ReactNode
  attrs: AttrType
  active?: boolean
  scale?: number // 后续需要验证大于0
  parent?: boolean
  zIndex?: number
  resizable?: boolean
  draggable?: boolean
  className?: string
  classNameDragging?: string
  classNameResizing?: string
  classNameActiveModal?: string
  // return false 终止操作
  onDragStart?: (e: React.MouseEvent) => void | boolean
  onDrag?: (attrs: AttrType) => void
  onDragEnd?: (attrs: AttrType) => void
  onResizeStart?: (e: React.MouseEvent, point: string) => void | boolean
  onResize?: (attrs: AttrType, point: string) => void
  onResizeEnd?: (attrs: AttrType, point: string) => void
  onClick?: (e: React.MouseEvent) => void
}

// 锚点
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']
// 光标朝向
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se']

const DraggableBox = (props: DraggableBoxProps, ref: any) => {
  const {
    attrs,
    onPointMouseHandle,
    onBoxMouseHandle,
    dragBoxRef,
    isDragging,
    isResizing
  } = useMouse(props)
  useImperativeHandle(ref, () => dragBoxRef.current)
  return (
    <div
      onClick={(e) => props.onClick?.(e)}
      ref={dragBoxRef}
      className={
        'draggableBox' +
        ' ' +
        props.className +
        ' ' +
        (isDragging ? props.classNameDragging : '') +
        ' ' +
        (isResizing ? props.classNameResizing : '')
      }
      onMouseDown={onBoxMouseHandle}
      style={useComponentStyle(attrs, props.zIndex!)}
    >
      {props.resizable &&
        pointList.map((point, index) => {
          return (
            <div
              className={'draggablePoint' + ' ' + point}
              key={point}
              onMouseDown={(e) => onPointMouseHandle(e, point)}
              style={usePointStyle(point, index, attrs, cursorResize)}
            ></div>
          )
        })}
      {props.active && (
        <div
          className={'draggableActiveModal' + ' ' + props.classNameActiveModal}
        ></div>
      )}
      {props.children}
    </div>
  )
}
const RefDraggableBox = React.forwardRef(DraggableBox)

RefDraggableBox.defaultProps = {
  scale: 1,
  active: false,
  parent: true,
  resizable: true,
  draggable: true,
  zIndex: 20,
  mode: 'auto'
}
export default RefDraggableBox
