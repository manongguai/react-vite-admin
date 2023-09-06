import React, { useEffect, useState } from 'react'
import { Brush, Drauu, DrawingMode, createDrauu } from 'drauu'
import SvgTools from './components/SvgTools'
import styles from './svg.module.scss'
const DrawSvg = () => {
  const [drauu, setDrauu] = useState<Drauu | null>(null)
  const [option, setOption] = useState<Brush>({
    mode: 'stylus', // 'line', 'rectangle', 'ellipse'
    color: '#000',
    size: 5,
    dasharray: undefined,
    arrowEnd: false
  })
  useEffect(() => {
    setDrauu(() => {
      const drauu = createDrauu({
        el: '#svg',
        brush: {
          mode: 'stylus', // 'line', 'rectangle', 'ellipse'
          color: '#000',
          size: 5
        }
      })

      return drauu
    })
  }, [])
  useEffect(() => {
    if (drauu) {
      window.addEventListener('keydown', (e) => {
        if (drauu) {
          if (e.code === 'KeyZ' && (e.ctrlKey || e.metaKey)) {
            if (e.shiftKey) onRedo()
            else onUndo()
          } else if (e.code === 'KeyL') {
            onModeChange?.('line', false)
          } else if (e.code === 'KeyD') {
            onModeChange?.('draw', false)
          } else if (e.code === 'KeyS') {
            onModeChange?.('stylus', false)
          } else if (e.code === 'KeyR') {
            onModeChange?.('rectangle', false)
          } else if (e.code === 'KeyE') {
            onModeChange?.('ellipse', false)
          } else if (e.code === 'KeyC') {
            onClear?.()
          } else if (e.code === 'Equal') {
            onSizeChange?.(option.size + 0.5)
          } else if (e.code === 'Minus') {
            onSizeChange?.(option.size - 0.5)
          }
        }
      })
    }
  }, [drauu])

  function onModeChange(mode: DrawingMode, arrowEnd: boolean) {
    drauu!.brush.arrowEnd = arrowEnd
    drauu!.mode = mode
    setOption({
      ...option,
      mode,
      arrowEnd
    })
  }
  function onSizeChange(size: number) {
    drauu!.brush.size = size
    setOption({
      ...option,
      size
    })
  }
  function onColorChange(color: string) {
    drauu!.brush.color = color
    setOption({
      ...option,
      color
    })
  }
  function onDashArrayChange(dasharray: string | undefined) {
    drauu!.brush.dasharray = dasharray
    setOption({
      ...option,
      dasharray
    })
  }
  function onSave() {
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
  function onRedo() {
    drauu?.redo()
  }
  function onUndo() {
    drauu?.undo()
  }
  function onClear() {
    drauu?.clear()
  }
  return (
    <div className={'page-container ' + styles.svgPage}>
      <SvgTools
        onModeChange={onModeChange}
        onSizeChange={onSizeChange}
        onColorChange={onColorChange}
        onDashArrayChange={onDashArrayChange}
        onSave={onSave}
        onRedo={onRedo}
        onUndo={onUndo}
        onClear={onClear}
        option={option}
      ></SvgTools>
      <svg className={styles.svgMain} id="svg"></svg>
      <pre className={styles.svgTips}>
        {`
           f / freehand
           l / line
           r / rectangle
           e / ellipse
           c / clear
           + / increase size
           - / decrease size
      ctrl+z / undo
shift+ctrl+z / redo`}
      </pre>
    </div>
  )
}

export default DrawSvg
