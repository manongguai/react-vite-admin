import React, { useEffect, useRef, useState } from 'react'
import DraggableBox from './components/DraggableBox'
import './dragPage.scss'
import { AttrType } from './types'
const CommonDrag = () => {
  interface DragItem {
    attrs: AttrType
    content: string
  }
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const list: DragItem[] = [
    {
      attrs: {
        w: 100,
        h: 100,
        x: 0,
        y: 0
      },
      content: '测试1'
    },
    {
      attrs: {
        w: 100,
        h: 100,
        x: 60,
        y: 60
      },
      content: '测试2'
    }
  ]
  function onDragStart(index: number) {
    console.log('onDragStart')
    setActiveIndex(index)
  }
  function onDrag(attrs: AttrType) {
    console.log('onDrag')
    console.log(attrs)
  }
  function onDragEnd(attrs: AttrType) {
    console.log('onDragEnd')
    console.log(attrs)
  }
  function onResizeStart() {
    console.log('onResizeStart')
  }
  function onResize() {
    console.log('onResize')
  }
  function onResizeEnd(attrs: AttrType, point: string) {
    console.log('onResizeEnd')
    console.log(attrs)
    console.log(point)
  }
  const dragRefList = useRef<any[]>([])
  function getDragRef(dom: React.MutableRefObject<HTMLDivElement | null>) {
    dragRefList.current.push(dom)
  }
  function handle(e: any) {
    setActiveIndex(-1)
  }
  useEffect(() => {
    // 获取实例
    console.log(dragRefList.current)
  }, [])
  return (
    <div className="page-container">
      <div className="drag-parent" onClick={handle}>
        {list.map((item, index) => {
          return (
            <DraggableBox
              ref={getDragRef}
              onClick={(e) => e.stopPropagation()}
              onDragStart={() => onDragStart(index)}
              onDrag={onDrag}
              onDragEnd={onDragEnd}
              onResizeStart={onResizeStart}
              onResize={onResize}
              onResizeEnd={onResizeEnd}
              key={index}
              active={activeIndex == index}
              classNameDragging="dragging"
              classNameActiveModal="modal"
              attrs={item.attrs}
            >
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.content}
              </div>
            </DraggableBox>
          )
        })}
      </div>
    </div>
  )
}

export default CommonDrag
