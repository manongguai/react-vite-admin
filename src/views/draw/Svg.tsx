import React, { useEffect, useState } from 'react'
import { Drauu, createDrauu } from 'drauu'
import SvgTools from './components/SvgTools'
import styles from './svg.module.scss'
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
    <div className={'page-container ' + styles.svgPage}>
      <SvgTools drauu={drauu}></SvgTools>
      <svg className={styles.svgMain} id="svg"></svg>
    </div>
  )
}

export default DrawSvg
