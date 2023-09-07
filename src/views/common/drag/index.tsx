import React from 'react'
import DraggableBox from './components/DraggableBox'
import './dragPage.scss'
const CommonDrag = () => {
  return (
    <div className="page-container">
      <div className="drag-parent">
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
