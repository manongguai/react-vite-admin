import React from 'react'
import { Button, Col, Form, Row } from 'antd'
import FormPro, { FormOption, FormProProps } from './FormPro'

export interface FormSearchProps extends Omit<FormProProps, 'onFinish'> {
  onSearch: (values: any) => void
  onReset?: () => void
  searchColSpan?: number
}

const FormSearch: React.FC<FormSearchProps> = ({
  formOptions,
  initialValues = {},
  mode = 'add',
  labelCol,
  onSearch,
  onReset,
  searchColSpan = 6,
  form
}) => {
  const [internalForm] = Form.useForm()
  const formInstance = form || internalForm

  const handleReset = () => {
    formInstance.resetFields()
    if (onReset) {
      onReset()
    }
  }

  return (
    <FormPro
      formOptions={formOptions}
      initialValues={initialValues}
      mode={mode}
      labelCol={labelCol}
      form={formInstance}
      onFinish={onSearch}
      colDefaultSpan={6}
    >
      <Col span={searchColSpan}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button onClick={handleReset} style={{ marginLeft: 8 }}>
            重置
          </Button>
        </Form.Item>
      </Col>
    </FormPro>
  )
}

export default FormSearch
