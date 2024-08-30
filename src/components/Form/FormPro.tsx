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
  FormItemProps,
  InputProps,
  SelectProps,
  RadioGroupProps,
  CheckboxProps,
  DatePickerProps,
  SwitchProps,
  UploadProps,
  CascaderProps,
  InputNumberProps,
  Button,
  ColProps
} from 'antd'

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
  onFinish: (values: any) => void
  form?: ReturnType<typeof Form.useForm>[0]
}

const FormPro: React.FC<FormProProps> = ({
  formOptions,
  initialValues = {},
  mode = 'add',
  onFinish,
  labelCol,
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

    // 显隐逻辑
    const shouldHide = useMemo(() => {
      if (typeof item.hidden === 'function') {
        return item.hidden(formValues)
      }
      return item.hidden || false
    }, [item.hidden, formValues])

    if (shouldHide) {
      return null
    }

    switch (item.type) {
      case 'input':
        return (
          <Form.Item {...commonProps} key={item.name}>
            <Input
              disabled={isSeeMode}
              {...(item.componentProps as InputProps)}
            />
          </Form.Item>
        )
      case 'select':
        return (
          <Form.Item {...commonProps} key={item.name}>
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
          </Form.Item>
        )
      case 'radio':
        return (
          <Form.Item {...commonProps} key={item.name}>
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
          </Form.Item>
        )
      case 'checkbox':
        return (
          <Form.Item {...commonProps} key={item.name} valuePropName="checked">
            <Checkbox
              disabled={isSeeMode}
              {...(item.componentProps as CheckboxProps)}
            >
              {item.label}
            </Checkbox>
          </Form.Item>
        )
      case 'datePicker':
        return (
          <Form.Item {...commonProps} key={item.name}>
            <DatePicker
              disabled={isSeeMode}
              {...(item.componentProps as DatePickerProps)}
            />
          </Form.Item>
        )
      case 'switch':
        return (
          <Form.Item {...commonProps} key={item.name} valuePropName="checked">
            <Switch
              disabled={isSeeMode}
              {...(item.componentProps as SwitchProps)}
            />
          </Form.Item>
        )
      case 'upload':
        return (
          <Form.Item {...commonProps} key={item.name} valuePropName="fileList">
            <Upload
              disabled={isSeeMode}
              {...(item.componentProps as UploadProps)}
            >
              <Button>点击上传</Button>
            </Upload>
          </Form.Item>
        )
      case 'cascader':
        return (
          <Form.Item {...commonProps} key={item.name}>
            <Cascader
              disabled={isSeeMode}
              {...(item.componentProps as CascaderProps<any>)}
              options={item.options}
            />
          </Form.Item>
        )
      case 'inputNumber':
        return (
          <Form.Item {...commonProps} key={item.name}>
            <InputNumber
              disabled={isSeeMode}
              {...(item.componentProps as InputNumberProps)}
            />
          </Form.Item>
        )
      case 'custom':
        return (
          <Form.Item {...commonProps} key={item.name}>
            {React.cloneElement(item.component, { disabled: isSeeMode })}
          </Form.Item>
        )
      default:
        return null
    }
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
      {formOptions.map((item) => renderFormItem(item))}
    </Form>
  )
}

export default FormPro
