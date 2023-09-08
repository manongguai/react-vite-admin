import { useEffect, useRef, useState } from 'react'
import { AttrType } from '../types'
import { onMove } from '@/utils/util'

export default function useMouse(
  defaultAttrs: AttrType,
  scale: number,
  parent: boolean
) {
  const [attrs, setAttrs] = useState(defaultAttrs)
  const dragBoxRef = useRef<HTMLDivElement | null>(null)
  let mouseEventRemove = () => {}
  function onPonitMouseHandle(mouseDownEvent: any, point: string) {
    mouseDownEvent.stopPropagation()
    mouseDownEvent.preventDefault()
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
    mouseEventRemove = onMove((moveEvent) => {
      let currX = Math.round((moveEvent.screenX - startX) / scale)
      let currY = Math.round((moveEvent.screenY - startY) / scale)
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
      if (parent) {
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
      setAttrs({ x, y, w, h })
    })
  }
  function onBoxMouseHandle(e: any, distance = 10) {
    e.preventDefault()
    e.stopPropagation()
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
    mouseEventRemove = onMove((moveEvent) => {
      let currX = Math.round(itemAttrX + (moveEvent.screenX - startX) / scale)
      let currY = Math.round(itemAttrY + (moveEvent.screenY - startY) / scale)
      // 要预留的距离
      if (parent) {
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
        currX = currX > parentWidth - distance ? parentWidth - distance : currX
        currY =
          currY > parentHeight - distance ? parentHeight - distance : currY
      }
      setAttrs({ ...attrs, x: currX, y: currY })
    })
  }
  useEffect(() => {
    return mouseEventRemove()
  })
  return {
    attrs,
    onPonitMouseHandle,
    onBoxMouseHandle,
    dragBoxRef
  }
}
