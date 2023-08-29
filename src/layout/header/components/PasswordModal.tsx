import { useState, useImperativeHandle, Ref } from 'react'
import { Modal, message } from 'antd'

interface Props {
  innerRef: Ref<{ showModal: (params: any) => void }>
}

const PasswordModal = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))

  const showModal = (params: { name: number }) => {
    console.log(params)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    messageApi.success('修改密码成功 🎉🎉🎉')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      {contextHolder}
      <Modal
        title="修改密码"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <p>Some Password...</p>
        <p>Some Password...</p>
        <p>Some Password...</p>
      </Modal>
    </>
  )
}
export default PasswordModal
