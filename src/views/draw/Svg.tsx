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
          color: '#000',
          size: 5
        }
      })
      return drauu
    })
  }, [])
  return (
    <div className="page-container">
      <SvgTools drauu={drauu}></SvgTools>
      <svg id="svg" style={{ width: '100%', height: '100%' }}></svg>
    </div>
  )
}

export default DrawSvg
