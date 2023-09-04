import React, { useEffect, useState } from 'react'
import { Drauu, createDrauu } from 'drauu'
import SvgTools from './components/SvgTools'
const DrawSvg = () => {
  const [drauu, setDrauu] = useState<Drauu | null>(null)
  useEffect(() => {
    setDrauu(() => {
      const drauu = createDrauu({
        el: '#svg',
        brush: {
          mode: 'stylus', // 'line', 'rectangle', 'ellipse'
          color: '#87CEEB',
          size: 5
        }
      })
      console.log(drauu.brush.color)

      return drauu
    })
  }, [])
  return (
    <div className="page-container">
      <SvgTools drauu={drauu}></SvgTools>
      <svg
        id="svg"
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
      ></svg>
    </div>
  )
}

export default DrawSvg
