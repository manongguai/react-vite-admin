import React from 'react'
import { Button, Col, Form, Row } from 'antd'
import FormPro, { FormOption, FormProProps } from './FormPro'

export interface FormSearchProps extends Omit<FormProProps, 'onFinish'> {
  onSearch: (values: any) => void
  onReset?: () => void
}

const FormSearch: React.FC<FormSearchProps> = ({
  formOptions,
  initialValues = {},
  mode = 'add',
  labelCol,
  column = 3,
  onSearch,
  onReset,
  form
}) => {
  const [internalForm] = Form.useForm()
  const formInstance = form || internalForm

  const handleSearch = () => {
    formInstance
      .validateFields()
      .then((values) => {
        onSearch(values)
      })
      .catch((errorInfo) => {
        console.error('Validate Failed:', errorInfo)
      })
  }

  const handleReset = () => {
    formInstance.resetFields()
    if (onReset) {
      onReset()
    }
  }

  return (
    <>
      <FormPro
        formOptions={formOptions}
        initialValues={initialValues}
        mode={mode}
        labelCol={labelCol}
        form={formInstance}
        column={column}
      />
      <Row gutter={24}>
        <Col span={24 / column} offset={((column - 1) * 24) / column}>
          <Form.Item>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
            <Button onClick={handleReset} style={{ marginLeft: 8 }}>
              重置
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default FormSearch
