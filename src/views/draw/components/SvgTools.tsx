import { Button, Col, ColorPicker, Divider, Row, Slider } from 'antd'
import styles from './svgTools.module.scss'
import IconFont from '@/components/Iconfont'
import { Drauu, DrawingMode } from 'drauu'
import { useMemo, useState } from 'react'

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
  drauu: Drauu | null
}
const SvgTools = (props: Iprops) => {
  const drauu = useMemo(() => {
    return props.drauu
  }, [props.drauu])
  const [currentMode, setCurrentMode] = useState<string>(
    props?.drauu?.mode || 'stylus'
  )
  const [currentDash, setCurrentDash] = useState<string | undefined>(
    props?.drauu?.brush?.dasharray
  )
  function undo() {
    drauu?.undo()
  }
  function redo() {
    drauu?.redo()
  }
  function clear() {
    drauu?.clear()
  }
  function drawingModeChange(drawModeAndIcon: DrawModeAndIcon) {
    drauu!.brush.arrowEnd = drawModeAndIcon.arrowEnd
    drauu!.mode = drawModeAndIcon.mode
    setCurrentMode(drawModeAndIcon.key)
  }
  function dasharrayChange(dashArray: Dasharray) {
    drauu!.brush.dasharray = dashArray.value
    setCurrentDash(dashArray.value)
  }
  function colorChange(color: string) {
    drauu!.brush.color = color
  }
  function save() {
    drauu!.el!.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    const data = drauu!.el!.outerHTML || ''
    const blob = new Blob([data], { type: 'image/svg+xml' })
    const elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = 'drauu.svg'
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
  return (
    <div className={styles.svgTools}>
      <Row align="middle" gutter={4}>
        {drawingModes.map((drawingMode) => {
          return (
            <Col key={drawingMode.key}>
              <Button
                className={
                  currentMode == drawingMode.key ? styles.activeItem : ''
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
        <Col>
          <ColorPicker
            size="small"
            onChangeComplete={(color) => colorChange(color.toHexString())}
            value={drauu?.brush.color ? drauu?.brush.color : '#000'}
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
        <Col style={{ width: '150px' }}>
          <Divider plain type="vertical" />
        </Col>
        <Col>
          <Slider defaultValue={30} />
        </Col>
        <Col>
          <Divider plain type="vertical" />
        </Col>
        {dasharrayList.map((dasharray) => {
          return (
            <Col key={dasharray.key}>
              <Button
                className={
                  currentDash == dasharray.value ? styles.activeItem : ''
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
          <Button
            onClick={() => undo()}
            type="text"
            icon={<IconFont type="icon-houtui" />}
          ></Button>
        </Col>
        <Col>
          <Button
            type="text"
            onClick={redo}
            icon={<IconFont type="icon-jiantouqianjin1" />}
          ></Button>
        </Col>
        <Col>
          <Button
            onClick={clear}
            type="text"
            icon={<IconFont type="icon-qingchu" />}
          ></Button>
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
