import React from 'react'
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
  FormItemProps,
  InputProps,
  SelectProps,
  RadioGroupProps,
  CheckboxProps,
  DatePickerProps,
  SwitchProps,
  UploadProps,
  CascaderProps,
  Button
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
  | CustomOption

export interface FormProProps {
  formOptions: FormOption[]
  initialValues?: Record<string, any>
  mode?: Mode
  onFinish: (values: any) => void
  form?: ReturnType<typeof Form.useForm>[0] // 添加form参数类型
}

const FormPro: React.FC<FormProProps> = ({
  formOptions,
  initialValues = {},
  mode = 'add',
  onFinish,
  form // 接受外部传入的form实例
}) => {
  const [internalForm] = Form.useForm()
  const formInstance = form || internalForm // 使用外部传入的form或内部生成的form

  const isSeeMode = mode === 'see'

  const renderFormItem = (item: FormOption) => {
    const commonProps = {
      name: item.name,
      label: item.label,
      rules: item.rules || []
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
    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
      {formOptions.map((item) => renderFormItem(item))}
    </Form>
  )
}

export default FormPro
