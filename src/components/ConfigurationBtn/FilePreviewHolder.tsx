import { getFileType } from '@/utils/file'
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileUnknownOutlined,
  FileWordOutlined,
  FolderOutlined
} from '@ant-design/icons'
import { Image } from 'antd'
import styled from 'styled-components'

export interface FilePreviewProps {
  url: string // 图片或者其他类型url
  type?: string
  width?: number // 图片宽度
  height?: number
}
const FilePreviewHolder = ({ url, type, width, height }: FilePreviewProps) => {
  const fileType = type || getFileType(url)
  return (
    <HolderWrapper width={width} height={height}>
      <HolderContent type={fileType} url={url}></HolderContent>
    </HolderWrapper>
  )
}

export default FilePreviewHolder

function HolderContent({ type, url }: FilePreviewProps) {
  const fileType = type || getFileType(url)
  if (fileType === 'image') {
    return <Image src={url} alt="" style={{ width: '100%' }} />
  }
  if (fileType === 'txt') {
    return (
      <FolderOutlined
        style={{
          color: 'gray'
        }}
      />
    )
  }
  if (fileType === 'excel') {
    return (
      <FileExcelOutlined
        style={{
          color: 'green'
        }}
      />
    )
  }
  if (fileType === 'word') {
    return (
      <FileWordOutlined
        style={{
          color: 'blue'
        }}
      />
    )
  }
  if (fileType === 'pdf') {
    return (
      <FilePdfOutlined
        style={{
          color: 'red'
        }}
      />
    )
  }
  if (fileType === 'ppt') {
    return (
      <FilePptOutlined
        style={{
          color: 'red'
        }}
      />
    )
  }
  if (fileType === 'meida') {
    return (
      <FolderOutlined
        style={{
          color: 'black'
        }}
      />
    )
  }
  if (fileType === 'other') {
    return (
      <FileUnknownOutlined
        style={{
          color: 'black'
        }}
      />
    )
  }
}

const HolderWrapper = styled.div<{
  width?: number
  height?: number
}>`
  width: ${(props) => {
    return props.width ? props.width + 'px' : 'auto'
  }};
  height: ${(props) => {
    return props.height ? props.height + 'px' : 'auto'
  }};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  span {
    font-size: ${(props) => {
      return props.width ? props.width / 2 + 'px' : 'auto'
    }};
  }
`
