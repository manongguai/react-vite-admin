import { message, Modal, notification } from 'antd'
const AppProvider = (props: { children: JSX.Element }) => {
  const [messageApi, messageContextHolder] = message.useMessage()
  const [modalApi, modalContextHolder] = Modal.useModal()
  const [notificationApi, notificationContextHolder] =
    notification.useNotification()
  window['$message'] = messageApi
  window['$modal'] = modalApi
  window['$notification'] = notificationApi
  return (
    <>
      {messageContextHolder}
      {modalContextHolder}
      {notificationContextHolder}
      {props.children}
    </>
  )
}

export default AppProvider
