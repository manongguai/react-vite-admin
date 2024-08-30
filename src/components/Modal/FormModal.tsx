import React, { useEffect } from 'react'
import { Modal, Button, Form, ColProps } from 'antd'
import FormPro, { FormOption } from '../Form/FormPro'

interface FormModalProps {
  visible?: boolean
  onClose?: () => void
  onSubmit?: (values: any) => void
  formOptions?: FormOption[]
  labelCol?: ColProps
  initialValues?: Record<string, any>
  mode?: 'add' | 'edit' | 'see'
}

const FormModal: React.FC<FormModalProps> = ({
  visible = false,
  onClose,
  onSubmit,
  formOptions = [],
  initialValues = {},
  labelCol,
  mode = 'add'
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible) {
      if (Object.keys(initialValues).length > 0) {
        // 如果 initialValues 非空，则重置并设置表单值
        setTimeout(() => {
          form.resetFields()
          form.setFieldsValue(initialValues)
        })
      } else {
        // 如果 initialValues 为空，则只重置表单
        setTimeout(() => {
          form.resetFields()
        })
      }
    }
  }, [visible, initialValues, form])

  const isSeeMode = mode === 'see'

  return (
    <Modal
      open={visible}
      title={mode === 'add' ? '新增' : mode === 'edit' ? '编辑' : '查看'}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        !isSeeMode && (
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              document
                .querySelector('form')
                ?.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true })
                )
            }
          >
            提交
          </Button>
        )
      ]}
    >
      <FormPro
        form={form} // 传递form实例
        formOptions={formOptions}
        labelCol={labelCol}
        initialValues={initialValues}
        mode={mode}
        onFinish={(...args) => {
          onSubmit?.(...args)
        }}
      />
    </Modal>
  )
}

export default FormModal
