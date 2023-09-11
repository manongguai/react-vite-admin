import React, { useEffect, useRef, useState } from 'react'
import DraggableBox from './components/DraggableBox'
import './dragPage.scss'
import { AttrType, DragMode } from './types'
import { Form, Select, Switch } from 'antd'
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
  interface FieldType {
    draggable: boolean
    resizable: boolean
    mode: DragMode
    parent: boolean
  }
  const [form, setForm] = useState<FieldType>({
    draggable: true,
    resizable: true,
    mode: 'auto',
    parent: true
  })
  function formChange(changedValues: Partial<FieldType>, allValues: FieldType) {
    console.log(changedValues)
    setForm(allValues)
  }
  useEffect(() => {
    // 获取实例
    // console.log(dragRefList.current)
  }, [])
  return (
    <div className="darg-page">
      <div className="drag-option">
        <Form layout="inline" onValuesChange={formChange} initialValues={form}>
          <Form.Item<FieldType>
            name="mode"
            label="mode,手动模式需要自定义attrs"
          >
            <Select
              options={[
                { value: 'manual', label: 'manual' },
                { value: 'auto', label: 'auto' }
              ]}
            ></Select>
          </Form.Item>
          <Form.Item<FieldType> name="draggable" label="draggable">
            <Switch checked={form.draggable} />
          </Form.Item>
          <Form.Item<FieldType> label="resizable" name="resizable">
            <Switch checked={form.resizable} />
          </Form.Item>
          <Form.Item<FieldType> label="parent" name="parent">
            <Switch checked={form.parent} />
          </Form.Item>
        </Form>
      </div>
      <div className="drag-parent" onClick={handle}>
        {list.map((item, index) => {
          return (
            <DraggableBox
              mode={form.mode}
              ref={getDragRef}
              onClick={(e) => e.stopPropagation()}
              onDragStart={() => onDragStart(index)}
              onDrag={onDrag}
              draggable={form.draggable}
              resizable={form.resizable}
              onDragEnd={onDragEnd}
              onResizeStart={onResizeStart}
              onResize={onResize}
              onResizeEnd={onResizeEnd}
              key={index}
              parent={form.parent}
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
