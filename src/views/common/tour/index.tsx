import { Button, Card, Divider, Space, Tour, TourProps } from 'antd'
import { useRef, useState } from 'react'
import { driver } from 'driver.js' // import driver.js
import 'driver.js/dist/driver.css'
import { EllipsisOutlined } from '@ant-design/icons'
import driverSteps from './steps'
const TourPage = () => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const [open, setOpen] = useState<boolean>(false)
  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current
    }
  ]
  function startTour() {
    setOpen(true)
  }

  const driverObj = driver({
    showProgress: true,
    steps: driverSteps,
    allowClose: true,
    animate: true, // 在更改突出显示的元素时是否设置动画，
    doneBtnText: '结束', // 最后一个按钮上的文本
    nextBtnText: '下一步', // 此步骤的下一步按钮文本
    prevBtnText: '上一步' // 此步骤的上一个按钮文本
  })
  function startDriver() {
    driverObj.drive()
  }
  return (
    <>
      <Card title="漫游式引导">
        <Space>
          <Button onClick={() => startTour()} type="primary">
            点我开启组件内引导
          </Button>
          <Button
            id="driver-button"
            onClick={() => startDriver()}
            type="primary"
          >
            点我开启全局引导
          </Button>
        </Space>

        <Divider />
        <Space>
          <Button ref={ref1}> Upload</Button>
          <Button ref={ref2} type="primary">
            Save
          </Button>
          <Button ref={ref3} icon={<EllipsisOutlined />} />
        </Space>
      </Card>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  )
}

export default TourPage
