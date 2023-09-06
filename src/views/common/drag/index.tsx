import React from 'react'
import DraggableBox from './components/DraggableBox'
const CommonDrag = () => {
  return (
    <div className="page-container">
      <div style={{ position: 'relative' }}>
        <DraggableBox
          attrs={{
            w: 200,
            h: 200,
            x: 30,
            y: 20
          }}
        >
          <div>你好</div>
        </DraggableBox>
      </div>
    </div>
  )
}

export default CommonDrag
