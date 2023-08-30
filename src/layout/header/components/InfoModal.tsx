import { useState, useImperativeHandle, Ref } from 'react'
import { Modal, message } from 'antd'
import { UserInfo } from '@/store/interface'
import { useTranslation } from 'react-i18next'
interface Props {
  innerRef: Ref<{ showModal: (params: any) => void } | undefined>
  userInfo: UserInfo
}

const InfoModal = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))
  const { t } = useTranslation()
  const showModal = (params: { name: number }) => {
    setModalVisible(true)
  }

  const handleOk = () => {
    setModalVisible(false)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }
  return (
    <>
      <Modal
        title={t('user.personalData')}
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <p>UserName: {props.userInfo.username}</p>
        <p>Phone: {props.userInfo.phone}</p>
      </Modal>
    </>
  )
}
export default InfoModal
