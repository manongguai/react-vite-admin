import { findOssList, getFileList, OssApiResult } from '@/api/oss'
import FilePreviewHolder from '@/components/ConfigurationBtn/FilePreviewHolder'
import { FormOption } from '@/components/Form/FormPro'
import CommonPage from '@/components/Page/CommonPage'
import { useQuery } from 'react-query'
import { useSetState } from 'react-use'

export default function OssPage() {
  // 搜索参数
  const [searchParams, setSearchParams] = useSetState<findOssList>({
    startDay: undefined,
    endDay: undefined,
    page: 1,
    size: 10
  })

  // 获取列表
  const { data, isLoading, refetch } = useQuery(
    ['fileList', searchParams],
    async () => {
      const res = await getFileList(searchParams)
      return res.data
    }
  )

  /** 构建表格字段 **/
  const tableColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '文件',
      dataIndex: 'type',
      key: 'type',
      render: (v: string, record: OssApiResult) => {
        return (
          <FilePreviewHolder width={100} url={record.url}></FilePreviewHolder>
        )
      }
    },
    {
      title: '链接',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size'
    },
    {
      title: '备注',
      dataIndex: 'business',
      key: 'business'
    },
    {
      title: '上传用户',
      dataIndex: 'userAccount',
      key: 'userAccount'
    },
    {
      title: '上传时间',
      dataIndex: 'createDate',
      key: 'createDate'
    }
  ]
  const searchFormOptions: FormOption[] = [
    {
      type: 'input',
      name: '查询日期',
      label: '岗位名称',
      componentProps: {
        placeholder: '请输入岗位名称',
        allowClear: true
      }
    }
  ]

  // 搜索操作
  const onSearch = (values: { name: string }) => {
    setSearchParams({
      ...values,
      page: 1
    })
  }
  // 重置搜索
  const onResetSearch = () => {
    onSearch({
      name: ''
    })
  }

  return (
    <CommonPage
      tableColumns={tableColumns}
      dataSource={data?.list || []}
      isLoading={isLoading}
      pagination={{
        current: searchParams.page,
        pageSize: searchParams.size,
        total: data?.total,
        onChange: (page: number, size: number) => {
          setSearchParams({ page, size })
        }
      }}
      searchFormOptions={searchFormOptions}
      onSearch={onSearch}
      onResetSearch={onResetSearch}
    ></CommonPage>
  )
}
