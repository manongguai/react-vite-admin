import { useAppSelector } from '@/hooks/redux.hooks'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile, UploadProps } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import React from 'react'

const action = '/api/oss/upload'

export interface CustomUploadProps extends Omit<UploadProps<any>, 'onChange'> {
  value?: UploadFile[]
  render?: (
    value: UploadFile[],
    onRemove: (file: UploadFile) => void
  ) => JSX.Element | JSX.Element[]
  onChange?: (value: UploadFile[]) => void
}

const CustomUpload = (props: CustomUploadProps) => {
  const { value, onChange, render } = props
  const { accessToken } = useAppSelector((state) => state.user)
  const fileList = value ? (Array.isArray(value) ? value : [value]) : []
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile<any>>
  ) => {
    onChange?.(
      // change的时候加上url
      info.fileList.map((file) => {
        if (file.response && file.response.code == 200) {
          file.url = file.response.data[0].url
        }
        return file
      })
    )
  }

  const onRemove = (file: UploadFile) => {
    const files = (fileList || []).filter((v) => v.url !== file.url)
    if (onChange) {
      onChange(files)
    }
  }

  const uploadProps: UploadProps = {
    ...props,
    name: 'file',
    fileList,
    action: action,
    headers: {
      Authorization: accessToken
    },
    onChange: handleChange,
    onRemove: onRemove
  }
  return (
    <Upload {...uploadProps}>{render && render(value || [], onRemove)}</Upload>
  )
}

export default CustomUpload
