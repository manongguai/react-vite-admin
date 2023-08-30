import { useState, useImperativeHandle, Ref } from 'react'
import { Modal, message } from 'antd'
import { useTranslation } from 'react-i18next'
interface Props {
  innerRef: Ref<{ showModal: (params: any) => void }>
}

const PasswordModal = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))
  const { t } = useTranslation()
  const showModal = (params: { name: number }) => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      {contextHolder}
      <Modal
        title={t('user.changePassword')}
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
