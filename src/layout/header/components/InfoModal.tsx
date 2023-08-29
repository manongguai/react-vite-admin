import { useState, useImperativeHandle, Ref } from 'react'
import { Modal, message } from 'antd'

interface Props {
  innerRef: Ref<{ showModal: (params: any) => void } | undefined>
}

const InfoModal = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))

  const showModal = (params: { name: number }) => {
    console.log(params)
    setModalVisible(true)
  }

  const handleOk = () => {
    setModalVisible(false)
    messageApi.success('修改用户信息成功 🎉🎉🎉')
  }

  const handleCancel = () => {
    setModalVisible(false)
  }
  return (
    <>
      {contextHolder}
      <Modal
        title="个人信息"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <p>User Info...</p>
        <p>User Info...</p>
        <p>User Info...</p>
      </Modal>
    </>
  )
}
export default InfoModal
