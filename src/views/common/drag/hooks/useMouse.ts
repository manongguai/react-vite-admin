import { useEffect, useRef, useState } from 'react'
import { AttrType } from '../types'
import { onMove } from '@/utils/util'
import { DraggableBoxProps } from '../components/DraggableBox'

export default function useMouse(props: DraggableBoxProps) {
  const {
    attrs: defaultAttrs,
    scale,
    draggable,
    resizable,
    onDragStart,
    onDrag,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd
  } = props

  const [attrs, setAttrs] = useState(defaultAttrs)
  const [isDragging, setIsDrag] = useState(false)
  const [isResizing, setIsResize] = useState(false)
  const dragBoxRef = useRef<HTMLDivElement | null>(null)
  let mouseEventRemove = () => {}
  function onPointMouseHandle(mouseDownEvent: React.MouseEvent, point: string) {
    mouseDownEvent.stopPropagation()
    mouseDownEvent.preventDefault()
    if (!resizable) return
    const resizeStartReturn = onResizeStart?.(mouseDownEvent, point)
    if (resizeStartReturn === false) return
    // 记录初始位置和大小
    const itemAttrX = attrs.x
    const itemAttrY = attrs.y
    const itemAttrW = attrs.w
    const itemAttrH = attrs.h
    // 记录点击初始位置
    const startX = mouseDownEvent.screenX
    const startY = mouseDownEvent.screenY
    const parentWidth = (dragBoxRef.current!.parentNode! as HTMLElement)
      .offsetWidth
    const parentHeight = (dragBoxRef.current!.parentNode! as HTMLElement)
      .offsetHeight
    let newAttrs = JSON.parse(JSON.stringify(attrs))
    mouseEventRemove = onMove(
      (moveEvent) => {
        setIsResize(true)
        let currX = Math.round((moveEvent.screenX - startX) / scale!)
        let currY = Math.round((moveEvent.screenY - startY) / scale!)
        const isTop = /t/.test(point)
        const isBottom = /b/.test(point)
        const isLeft = /l/.test(point)
        const isRight = /r/.test(point)
        const newHeight = itemAttrH + (isTop ? -currY : isBottom ? currY : 0)
        const newWidth = itemAttrW + (isLeft ? -currX : isRight ? currX : 0)
        let h = Math.abs(newHeight)
        let w = Math.abs(newWidth)
        let x =
          newWidth > 0
            ? itemAttrX + (isLeft ? currX : 0)
            : itemAttrX + (isLeft ? itemAttrW : newWidth)
        let y =
          newHeight > 0
            ? itemAttrY + (isTop ? currY : 0)
            : itemAttrY + (isTop ? itemAttrH : newHeight)
        if (props.parent) {
          if (x < 0) {
            w = w + x
            x = 0
          }
          if (y < 0) {
            h = h + y
            y = 0
          }
          if (x + w > parentWidth) {
            w = parentWidth - x
          }
          if (y + h > parentHeight) {
            h = parentHeight - y
          }
        }
        onResize?.({ x, y, w, h }, point)
        newAttrs = { x, y, w, h }
        if (props.mode == 'auto') {
          setAttrs(newAttrs)
        }
      },
      () => {
        onResizeEnd?.(newAttrs, point)
        setIsResize(false)
      }
    )
  }
  function onBoxMouseHandle(e: React.MouseEvent, distance = 0) {
    e.preventDefault()
    e.stopPropagation()
    if (!draggable) return
    const dragStartReturn = onDragStart?.(e)
    if (dragStartReturn === false) return
    // 记录初始位置和大小
    const itemAttrX = attrs.x
    const itemAttrY = attrs.y
    const itemAttrW = attrs.w
    const itemAttrH = attrs.h
    // 记录点击初始位置
    const startX = e.screenX
    const startY = e.screenY
    const parentWidth = (dragBoxRef.current!.parentNode! as HTMLElement)
      .offsetWidth
    const parentHeight = (dragBoxRef.current!.parentNode! as HTMLElement)
      .offsetHeight
    let newAttrs = JSON.parse(JSON.stringify(attrs))
    mouseEventRemove = onMove(
      (moveEvent) => {
        setIsDrag(true)
        let currX = Math.round(
          itemAttrX + (moveEvent.screenX - startX) / scale!
        )
        let currY = Math.round(
          itemAttrY + (moveEvent.screenY - startY) / scale!
        )
        // 要预留的距离
        if (props.parent) {
          // 基于左上角位置检测
          currX = currX < 0 ? 0 : currX
          currY = currY < 0 ? 0 : currY
          // 基于右下角位置检测
          currX =
            currX > parentWidth - itemAttrW ? parentWidth - itemAttrW : currX
          currY =
            currY > parentHeight - itemAttrH ? parentHeight - itemAttrH : currY
        } else {
          // 基于左上角位置检测
          currX = currX < -itemAttrW + distance ? -itemAttrW + distance : currX
          currY = currY < -itemAttrH + distance ? -itemAttrH + distance : currY
          // 基于右下角位置检测
          currX =
            currX > parentWidth - distance ? parentWidth - distance : currX
          currY =
            currY > parentHeight - distance ? parentHeight - distance : currY
        }
        onDrag?.({ ...attrs, x: currX, y: currY })
        newAttrs = { ...newAttrs, x: currX, y: currY }
        if (props.mode === 'auto') {
          setAttrs(newAttrs)
        }
      },
      () => {
        onDragEnd?.(newAttrs)
        setIsDrag(false)
      }
    )
  }
  useEffect(() => {
    if (props.mode === 'manual') {
      setAttrs(props.attrs)
    }
  }, [props.attrs, props.mode])
  useEffect(() => {
    return mouseEventRemove()
  }, [])
  return {
    attrs,
    onPointMouseHandle,
    onBoxMouseHandle,
    dragBoxRef,
    isDragging,
    isResizing
  }
}
