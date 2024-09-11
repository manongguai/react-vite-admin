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
  TreeSelect,
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
  CascaderProps,
  TreeSelectProps,
  InputNumberProps
} from 'antd'
import { FormItemProps, FormInstance } from 'antd/lib/form'
import CustomUpload, { CustomUploadProps } from './CustomUpload'

export interface FormOptionBase<T = { label: string; value: string | number }> {
  type:
    | 'input'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'datePicker'
    | 'rangePicker'
    | 'switch'
    | 'upload'
    | 'cascader'
    | 'inputNumber'
    | 'treeSelect'
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
    | CustomUploadProps
    | CascaderProps<any>
    | TreeSelectProps<any>
    | InputNumberProps
  hidden?: boolean | ((values: any) => boolean)
  colProps?: ColProps
  options?: T[]
}

export interface InputOption extends FormOptionBase {
  type: 'input'
  componentProps?: InputProps
}

export interface SelectOption<T = { label: string; value: string | number }>
  extends FormOptionBase<T> {
  type: 'select'
  componentProps?: SelectProps<any>
}

export interface RadioOption<T = { label: string; value: string | number }>
  extends FormOptionBase<T> {
  type: 'radio'
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

export interface RangePickerOption extends FormOptionBase {
  type: 'rangePicker'
  componentProps?: DatePickerProps
}

export interface SwitchOption extends FormOptionBase {
  type: 'switch'
  componentProps?: SwitchProps
}

export interface UploadOption extends FormOptionBase {
  type: 'upload'
  componentProps?: CustomUploadProps
}

export interface CascaderOption<T = { label: string; value: string | number }>
  extends FormOptionBase<T> {
  type: 'cascader'
  componentProps?: CascaderProps<any>
}

export interface InputNumberOption extends FormOptionBase {
  type: 'inputNumber'
  componentProps?: InputNumberProps
}

export interface TreeSelectOption<
  T = { title: string; value: string | number; children?: any[] }
> extends FormOptionBase<T> {
  type: 'treeSelect'
  componentProps?: TreeSelectProps<any>
}

export interface CustomOption extends FormOptionBase {
  type: 'custom'
  componentProps?: Record<string, any>
  render: (
    form: FormInstance,
    componentProps: Record<string, any>
  ) => React.ReactElement
}

export type FormOption<T = any> =
  | InputOption
  | SelectOption<T>
  | RadioOption<T>
  | CheckboxOption
  | DatePickerOption
  | RangePickerOption
  | SwitchOption
  | UploadOption
  | CascaderOption<T>
  | InputNumberOption
  | TreeSelectOption<T>
  | CustomOption

export interface FormProProps {
  formOptions: FormOption[]
  initialValues?: Record<string, any>
  disabled?: boolean
  labelCol?: ColProps
  onFinish?: (values: any) => void
  form?: FormInstance
  children?: React.ReactNode
  colDefaultSpan?: number
}

const FormPro: React.FC<FormProProps> = ({
  formOptions,
  initialValues = {},
  disabled = false,
  onFinish,
  labelCol,
  form,
  children,
  colDefaultSpan = 24
}) => {
  const [internalForm] = Form.useForm()
  const formInstance = form || internalForm
  const [formValues, setFormValues] = useState(initialValues)

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

    const colSpan = item.colProps?.span || colDefaultSpan

    return (
      <Col span={colSpan} key={item.name}>
        <Form.Item {...commonProps}>
          {(() => {
            switch (item.type) {
              case 'input':
                return (
                  <Input
                    disabled={disabled}
                    {...(item.componentProps as InputProps)}
                  />
                )
              case 'select':
                return (
                  <Select
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
                    {...(item.componentProps as CheckboxProps)}
                  >
                    {item.label}
                  </Checkbox>
                )
              case 'datePicker':
                return (
                  <DatePicker
                    disabled={disabled}
                    {...(item.componentProps as DatePickerProps)}
                  />
                )
              case 'rangePicker':
                return (
                  // @ts-ignore
                  <DatePicker.RangePicker
                    disabled={disabled}
                    {...(item.componentProps as DatePickerProps)}
                  />
                )
              case 'switch':
                return (
                  <Switch
                    disabled={disabled}
                    {...(item.componentProps as SwitchProps)}
                  />
                )
              case 'upload':
                return (
                  <CustomUpload
                    disabled={disabled}
                    {...(item.componentProps as CustomUploadProps)}
                  ></CustomUpload>
                )
              case 'cascader':
                return (
                  <Cascader
                    disabled={disabled}
                    {...(item.componentProps as CascaderProps<any>)}
                    options={item.options}
                  />
                )
              case 'inputNumber':
                return (
                  <InputNumber
                    disabled={disabled}
                    {...(item.componentProps as InputNumberProps)}
                  />
                )
              case 'treeSelect':
                return (
                  <TreeSelect
                    disabled={disabled}
                    treeData={item.options || []}
                    {...(item.componentProps as TreeSelectProps<any>)}
                  />
                )
              case 'custom':
                return item.render(formInstance, {
                  disabled,
                  ...item.componentProps
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
      <Row gutter={24}>
        {formOptions.map((item) => renderFormItem(item))}
        {children}
      </Row>
    </Form>
  )
}

export default FormPro
