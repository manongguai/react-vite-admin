import { Form, Modal } from 'antd'
import { useState } from 'react'

function FormModal({
  show,
  type,
  data,
  title,
  children,
  onCancel,
  onOk,
  confirmLoading
}: ModalProps) {
  const [form] = Form.useForm()
  return (
    <Modal
      title={`${{ add: '新增', edit: '修改', see: '查看' }[type]}`}
      open={show}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
    >
      <Form disabled={type == 'see'} form={form} initialValues={data}>
        {children}
      </Form>
    </Modal>
  )
}

export type OperateType = 'add' | 'see' | 'edit'
export interface ModalProps {
  show: boolean
  type: OperateType
  data: Record<string, any>
  title: string
  children: React.ReactNode
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void
  confirmLoading?: boolean
}

export default FormModal
