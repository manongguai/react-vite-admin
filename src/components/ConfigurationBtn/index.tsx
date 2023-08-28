import { FloatButton, Popover } from 'antd'
import ConfigurationForm from './ConfigurationForm'
import IconFont from '../Iconfont'
import { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
const ConfigurationBtn = () => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  return (
    <Popover
      open={open}
      content={ConfigurationForm}
      trigger="click"
      placement="leftBottom"
      onOpenChange={handleOpenChange}
    >
      <FloatButton
        badge={{
          dot: true
        }}
        style={{ border: '1px solid var(--border-color)' }}
        icon={open ? <CloseOutlined /> : <IconFont type="icon-cc-magic" />}
      ></FloatButton>
    </Popover>
  )
}

export default ConfigurationBtn
