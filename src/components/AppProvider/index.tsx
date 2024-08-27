import { message, Modal, notification } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const AppProvider = (props: { children: JSX.Element }) => {
  const [messageApi, messageContextHolder] = message.useMessage()
  const [modalApi, modalContextHolder] = Modal.useModal()
  const [notificationApi, notificationContextHolder] =
    notification.useNotification()
  window['$message'] = messageApi
  window['$modal'] = modalApi
  window['$notification'] = notificationApi
  return (
    <QueryClientProvider client={queryClient}>
      {messageContextHolder}
      {modalContextHolder}
      {notificationContextHolder}
      {props.children}
    </QueryClientProvider>
  )
}

export default AppProvider
