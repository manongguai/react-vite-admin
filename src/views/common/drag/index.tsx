import React from 'react'
import DraggableBox from './components/DraggableBox'
import './dragPage.scss'
import { AttrType } from './types'
const CommonDrag = () => {
  interface DragItem {
    attrs: AttrType
    content: string
  }
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
  function onDragStart() {
    console.log('onDragStart')
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
  return (
    <div className="page-container">
      <div className="drag-parent">
        {list.map((item, index) => {
          return (
            <DraggableBox
              onDragStart={onDragStart}
              onDrag={onDrag}
              onDragEnd={onDragEnd}
              onResizeStart={onResizeStart}
              onResize={onResize}
              onResizeEnd={onResizeEnd}
              key={index}
              active={true}
              classNameDragging="dragging"
              classNameActiveModal="modal"
              attrs={item.attrs}
            >
              <div>{item.content}</div>
            </DraggableBox>
          )
        })}
      </div>
    </div>
  )
}

export default CommonDrag
