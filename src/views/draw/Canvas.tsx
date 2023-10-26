import { Button, Row, Col, ColorPicker } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './canvas.module.scss'
import { onMove } from '@/utils/util'

const DrawCanvas = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  let [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDraw, setIsDraw] = useState(false)
  const [scaleX, setScaleX] = useState(1)
  const [scaleY, setScaleY] = useState(1)
  const [activeButton, setActiveButton] = useState('thin')
  const [color, setColor] = useState('#000')
  let mouseEventRemove = () => {}
  function mouseDownHandle(e: React.MouseEvent) {
    if (ctx) {
      setIsDraw(true)
      ctx!.beginPath()
      let x = (e.pageX - canvas.current!.offsetLeft) / scaleX
      let y = (e.pageY - canvas.current!.offsetTop) / scaleY
      ctx!.moveTo(x, y)
      mouseEventRemove = onMove(
        (e) => {
          let x = (e.pageX - canvas.current!.offsetLeft) / scaleX
          let y = (e.pageY - canvas.current!.offsetTop) / scaleY
          ctx!.lineTo(x, y)
          ctx!.stroke()
        },
        () => {
          setIsDraw(false)
          ctx!.closePath()
        }
      )
    }
  }
  // 自适应缩放比
  function onresize() {
    let width = canvas.current!.offsetWidth
    let height = canvas.current!.offsetHeight
    setScaleX(width / 800)
    setScaleY(height / 600)
  }
  function init() {
    setCtx(() => {
      let ctx = canvas.current?.getContext('2d') as CanvasRenderingContext2D
      ctx!.lineJoin = 'round'
      ctx!.lineCap = 'round'
      ctx!.strokeStyle = color
      return ctx
    })
  }

  function onBlod() {
    ctx!.globalCompositeOperation = 'source-over'
    ctx!.lineWidth = 20
    setActiveButton('bold')
  }
  function onThin() {
    ctx!.globalCompositeOperation = 'source-over'
    ctx!.lineWidth = 1
    setActiveButton('thin')
  }
  function onEraser() {
    ctx!.globalCompositeOperation = 'destination-out'
    ctx!.lineWidth = 30
    setActiveButton('eraser')
  }
  function onColorChange(color: string) {
    setColor(color)
    ctx!.strokeStyle = color
  }
  function onSave() {
    setWhiteBackground()
    let dataUrl = canvas.current!.toDataURL()
    const elem = window.document.createElement('a')
    elem.href = dataUrl
    elem.download = '签名.png'
    elem.click()
  }
  function onClear() {
    ctx!.clearRect(0, 0, canvas.current!.width, canvas.current!.height)
  }
  function setWhiteBackground() {
    // 获取图片数据
    let imgData = ctx!.getImageData(
      0,
      0,
      canvas.current!.width,
      canvas.current!.height
    )
    for (let i = 0; i < imgData.data.length; i += 4) {
      // 当该像素是透明的,则设置成白色
      if (imgData.data[i + 3] == 0) {
        imgData.data[i] = 255
        imgData.data[i + 1] = 255
        imgData.data[i + 2] = 255
        imgData.data[i + 3] = 255
      }
    }
    ctx!.putImageData(imgData, 0, 0)
  }
  useEffect(() => {
    if (!canvas.current?.getContext) {
      console.log('当前浏览器不支持canvas,请下载最新的浏览器')
    }
    onresize()
    window.addEventListener('resize', onresize)
    init()
    return () => {
      mouseEventRemove()
      window.removeEventListener('resize', onresize)
    }
  }, [])
  return (
    <div className={'page-container ' + styles.canvasPage}>
      <div className={styles.canvasTools}>
        <Row align="middle" gutter={4}>
          <Col>
            <Button
              onClick={onBlod}
              className={
                activeButton == 'bold' ? styles.activeBtn : styles.defaultBtn
              }
            >
              粗线条
            </Button>
          </Col>
          <Col>
            <Button
              onClick={onThin}
              className={
                activeButton == 'thin' ? styles.activeBtn : styles.defaultBtn
              }
            >
              细线条
            </Button>
          </Col>
          <Col>
            <ColorPicker
              // open={colorPickerOpen}
              onChange={(color) => onColorChange(color.toHexString())}
              value={color}
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
          <Col>
            <Button
              onClick={onEraser}
              className={
                activeButton == 'eraser' ? styles.activeBtn : styles.defaultBtn
              }
            >
              橡皮擦
            </Button>
          </Col>
          <Col>
            <Button onClick={onClear}>清除画布</Button>
          </Col>
          <Col>
            <Button onClick={onSave}>保存签名</Button>
          </Col>
        </Row>
      </div>
      <canvas
        ref={canvas}
        width={800}
        height={600}
        onMouseDown={mouseDownHandle}
        className={styles.canvasMain}
      >
        当前浏览器不支持canvas,请下载最新的浏览器
        <a href="https://www.google.cn/chrome/index.html">立即下载</a>
      </canvas>
      <hr />
    </div>
  )
}

export default DrawCanvas
