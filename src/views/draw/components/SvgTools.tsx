import { Button, Col, ColorPicker, Divider, Row, Slider } from 'antd'
import styles from './svgTools.module.scss'
import IconFont from '@/components/Iconfont'
import { Brush, Drauu, DrawingMode } from 'drauu'
import { useEffect, useMemo, useState } from 'react'

interface DrawModeAndIcon {
  key: string
  icon: string
  arrowEnd: boolean
  mode: DrawingMode
}
const drawingModes: DrawModeAndIcon[] = [
  {
    mode: 'stylus',
    icon: 'icon-pen',
    arrowEnd: false,
    key: 'stylus'
  },
  {
    mode: 'draw',
    icon: 'icon-pen1',
    arrowEnd: false,
    key: 'draw'
  },
  {
    mode: 'line',
    icon: 'icon-line',
    arrowEnd: false,
    key: 'line'
  },
  {
    mode: 'line',
    icon: 'icon-upper-right-arrow',
    arrowEnd: true,
    key: 'lineArrow'
  },
  {
    mode: 'rectangle',
    icon: 'icon-yk_fangkuai',
    arrowEnd: false,
    key: 'rectangle'
  },
  {
    mode: 'ellipse',
    icon: 'icon-yuanxingweixuanzhong',
    arrowEnd: false,
    key: 'ellipse'
  },
  {
    mode: 'eraseLine',
    icon: 'icon-eraser',
    arrowEnd: false,
    key: 'eraseLine'
  }
]
interface Dasharray {
  key: string
  icon: string
  value: string | undefined
}
const dasharrayList: Dasharray[] = [
  {
    value: undefined,
    key: 'solid',
    icon: 'icon-line-2'
  },
  {
    value: '4',
    key: 'dashed',
    icon: 'icon-line-dashed'
  },
  {
    value: '1 7',
    key: 'dotted',
    icon: 'icon-line-dotted'
  }
]

interface Iprops {
  className?: string
  option: Brush
  onModeChange?: (mode: DrawingMode, arrowEnd: boolean) => void
  onSizeChange?: (size: number) => void
  onDashArrayChange?: (dashArray: string | undefined) => void
  onColorChange?: (color: string) => void
  onSave?: () => void
  onUndo?: () => void
  onRedo?: () => void
  onClear?: () => void
}
const SvgTools = (props: Iprops) => {
  const option = useMemo(() => {
    return props.option
  }, [props.option])

  function undo() {
    props.onUndo?.()
  }
  function redo() {
    props.onRedo?.()
  }
  function clear() {
    props.onClear?.()
  }
  function drawingModeChange(drawModeAndIcon: DrawModeAndIcon) {
    // drauu!.brush.arrowEnd = drawModeAndIcon.arrowEnd
    // drauu!.mode = drawModeAndIcon.mode
    props.onModeChange?.(drawModeAndIcon.mode, drawModeAndIcon.arrowEnd)
  }
  function dasharrayChange(dashArray: Dasharray) {
    props.onDashArrayChange?.(dashArray.value)
  }
  function colorChange(color: string) {
    props.onColorChange?.(color)
  }
  function sizeChange(value: number) {
    props.onSizeChange?.(value)
  }
  function save() {
    props.onSave?.()
  }
  return (
    <div className={styles.svgTools}>
      <Row align="middle" gutter={4}>
        <Col>
          <Button
            title="undo"
            onClick={() => undo()}
            type="text"
            icon={<IconFont type="icon-houtui" />}
          ></Button>
        </Col>
        <Col>
          <Button
            title="redo"
            type="text"
            onClick={redo}
            icon={<IconFont type="icon-jiantouqianjin1" />}
          ></Button>
        </Col>
        <Col>
          <Button
            onClick={clear}
            title="clear"
            type="text"
            icon={<IconFont type="icon-qingchu" />}
          ></Button>
        </Col>
        <Col>
          <Divider plain type="vertical" />
        </Col>
        {drawingModes.map((drawingMode) => {
          return (
            <Col key={drawingMode.key}>
              <Button
                title={drawingMode.key}
                className={
                  option.mode == drawingMode.mode &&
                  option.arrowEnd == drawingMode.arrowEnd
                    ? styles.activeItem
                    : ''
                }
                onClick={() => drawingModeChange(drawingMode)}
                type="text"
                icon={
                  <IconFont
                    style={{ fontSize: '14px' }}
                    type={drawingMode.icon}
                  />
                }
              ></Button>
            </Col>
          )
        })}
        <Col>
          <Divider plain type="vertical" />
        </Col>
        <Col style={{ width: '100px' }}>
          <Slider
            onChange={sizeChange}
            min={1}
            max={40}
            defaultValue={option.size}
          />
        </Col>
        <Col>
          <Divider plain type="vertical" />
        </Col>
        {dasharrayList.map((dasharray) => {
          return (
            <Col key={dasharray.key}>
              <Button
                title={dasharray.key}
                className={
                  option.dasharray == dasharray.value ? styles.activeItem : ''
                }
                onClick={() => dasharrayChange(dasharray)}
                type="text"
                icon={
                  <IconFont
                    style={{ fontSize: '14px' }}
                    type={dasharray.icon}
                  />
                }
              ></Button>
            </Col>
          )
        })}

        <Col>
          <Divider plain type="vertical" />
        </Col>
        <Col>
          <ColorPicker
            // open={colorPickerOpen}
            onChange={(color) => colorChange(color.toHexString())}
            value={option.color}
            presets={[
              {
                label: '快速选择',
                colors: [
                  '#000000',
                  '#F5222D',
                  '#FA8C16',
                  '#FADB14',
                  '#8BBB11',
                  '#52C41A',
                  '#13A8A8',
                  '#1677FF',
                  '#2F54EB',
                  '#722ED1'
                ]
              }
            ]}
            showText
          />
        </Col>
      </Row>
      <Button
        className={styles.saveBtn}
        title="保存图片"
        onClick={save}
        type="text"
        icon={<IconFont type="icon-save" />}
      ></Button>
    </div>
  )
}

export default SvgTools
