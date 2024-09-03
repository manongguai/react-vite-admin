import React, { useMemo, useState } from 'react'
import {
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  Switch,
  Upload,
  Cascader,
  InputNumber,
  Button,
  Row,
  Col,
  ColProps,
  InputProps,
  SelectProps,
  RadioGroupProps,
  CheckboxProps,
  DatePickerProps,
  SwitchProps,
  UploadProps,
  InputNumberProps,
  CascaderProps
} from 'antd'
import { FormItemProps, FormInstance } from 'antd/lib/form'

export type Mode = 'add' | 'edit' | 'see'

export interface FormOptionBase {
  type:
    | 'input'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'datePicker'
    | 'switch'
    | 'upload'
    | 'cascader'
    | 'inputNumber'
    | 'custom'
  name: string
  label: string
  rules?: FormItemProps['rules']
  componentProps?:
    | InputProps
    | SelectProps
    | RadioGroupProps
    | CheckboxProps
    | DatePickerProps
    | SwitchProps
    | UploadProps
    | CascaderProps<any>
    | InputNumberProps
  hidden?: boolean | ((values: any) => boolean)
  colProps?: ColProps // 每个表单项的布局
}

export interface InputOption extends FormOptionBase {
  type: 'input'
  componentProps?: InputProps
}

export interface SelectOption extends FormOptionBase {
  type: 'select'
  options?: { label: string; value: string | number }[]
  componentProps?: SelectProps<any>
}

export interface RadioOption extends FormOptionBase {
  type: 'radio'
  options?: { label: string; value: string | number }[]
  componentProps?: RadioGroupProps
}

export interface CheckboxOption extends FormOptionBase {
  type: 'checkbox'
  componentProps?: CheckboxProps
}

export interface DatePickerOption extends FormOptionBase {
  type: 'datePicker'
  componentProps?: DatePickerProps
}

export interface SwitchOption extends FormOptionBase {
  type: 'switch'
  componentProps?: SwitchProps
}

export interface UploadOption extends FormOptionBase {
  type: 'upload'
  componentProps?: UploadProps
}

export interface CascaderOption extends FormOptionBase {
  type: 'cascader'
  options?: { label: string; value: string | number }[]
  componentProps?: CascaderProps<any>
}

export interface InputNumberOption extends FormOptionBase {
  type: 'inputNumber'
  componentProps?: InputNumberProps
}

export interface CustomOption extends FormOptionBase {
  type: 'custom'
  component: React.ReactElement
}

export type FormOption =
  | InputOption
  | SelectOption
  | RadioOption
  | CheckboxOption
  | DatePickerOption
  | SwitchOption
  | UploadOption
  | CascaderOption
  | InputNumberOption
  | CustomOption

export interface FormProProps {
  formOptions: FormOption[]
  initialValues?: Record<string, any>
  mode?: Mode
  labelCol?: ColProps
  column?: number // 每行展示的表单项数目
  onFinish?: (values: any) => void
  form?: FormInstance
}

const FormPro: React.FC<FormProProps> = ({
  formOptions,
  initialValues = {},
  mode = 'add',
  onFinish,
  labelCol,
  column = 1, // 默认一行展示3个表单项
  form
}) => {
  const [internalForm] = Form.useForm()
  const formInstance = form || internalForm
  const [formValues, setFormValues] = useState(initialValues)
  const isSeeMode = mode === 'see'

  const renderFormItem = (item: FormOption) => {
    const commonProps = {
      name: item.name,
      label: item.label,
      rules: item.rules || []
    }

    const shouldHide = useMemo(() => {
      if (typeof item.hidden === 'function') {
        return item.hidden(formValues)
      }
      return item.hidden || false
    }, [item.hidden, formValues])

    if (shouldHide) {
      return null
    }

    const colSpan = item.colProps?.span || 24 / column

    return (
      <Col span={colSpan} key={item.name}>
        <Form.Item {...commonProps}>
          {(() => {
            switch (item.type) {
              case 'input':
                return (
                  <Input
                    disabled={isSeeMode}
                    {...(item.componentProps as InputProps)}
                  />
                )
              case 'select':
                return (
                  <Select
                    disabled={isSeeMode}
                    {...(item.componentProps as SelectProps<any>)}
                  >
                    {(item.options || []).map((opt) => (
                      <Select.Option key={opt.value} value={opt.value}>
                        {opt.label}
                      </Select.Option>
                    ))}
                  </Select>
                )
              case 'radio':
                return (
                  <Radio.Group
                    disabled={isSeeMode}
                    {...(item.componentProps as RadioGroupProps)}
                  >
                    {(item.options || []).map((opt) => (
                      <Radio key={opt.value} value={opt.value}>
                        {opt.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                )
              case 'checkbox':
                return (
                  <Checkbox
                    disabled={isSeeMode}
                    {...(item.componentProps as CheckboxProps)}
                  >
                    {item.label}
                  </Checkbox>
                )
              case 'datePicker':
                return (
                  <DatePicker
                    disabled={isSeeMode}
                    {...(item.componentProps as DatePickerProps)}
                  />
                )
              case 'switch':
                return (
                  <Switch
                    disabled={isSeeMode}
                    {...(item.componentProps as SwitchProps)}
                  />
                )
              case 'upload':
                return (
                  <Upload
                    disabled={isSeeMode}
                    {...(item.componentProps as UploadProps)}
                  >
                    <Button>点击上传</Button>
                  </Upload>
                )
              case 'cascader':
                return (
                  <Cascader
                    disabled={isSeeMode}
                    {...(item.componentProps as CascaderProps<any>)}
                    options={item.options}
                  />
                )
              case 'inputNumber':
                return (
                  <InputNumber
                    disabled={isSeeMode}
                    {...(item.componentProps as InputNumberProps)}
                  />
                )
              case 'custom':
                return React.cloneElement(item.component, {
                  disabled: isSeeMode
                })
              default:
                return null
            }
          })()}
        </Form.Item>
      </Col>
    )
  }

  return (
    <Form
      labelCol={labelCol}
      form={formInstance}
      onFinish={onFinish}
      initialValues={initialValues}
      onValuesChange={(changedValues) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          ...changedValues
        }))
      }}
    >
      <Row gutter={24}>{formOptions.map((item) => renderFormItem(item))}</Row>
    </Form>
  )
}

export default FormPro
