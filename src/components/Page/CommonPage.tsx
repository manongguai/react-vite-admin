import {
  Table,
  Button,
  Flex,
  Divider,
  Tooltip,
  Popconfirm,
  Avatar,
  Switch
} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import FormModal from '@/components/Form/FormModal'
import FormSearch from '@/components/Form/FormSearch'
import { PageWrapper } from '@/components/Page/Wrapper'

interface CommonPageProps {
  tableColumns: any[]
  dataSource: any[]
  isLoading: boolean
  pagination: any
  onSearch: (values: any) => void
  searchFormOptions: any[]
  onResetSearch: () => void
  onAdd: () => void
  modalProps: any
  modalFormOptions: any[]
  onModalClose: () => void
  onModalSubmit: (values: any) => void
}

export default function CommonPage({
  tableColumns,
  dataSource,
  isLoading,
  pagination,
  onSearch,
  searchFormOptions,
  onResetSearch,
  onAdd,
  modalProps,
  modalFormOptions,
  onModalClose,
  onModalSubmit
}: CommonPageProps) {
  return (
    <PageWrapper>
      {/* 搜索框 */}
      <FormSearch
        onReset={onResetSearch}
        formOptions={searchFormOptions}
        onSearch={onSearch}
      />

      {/* 操作按钮 */}
      <Flex justify="end" style={{ marginBottom: '16px' }}>
        <Button onClick={onAdd} icon={<PlusCircleOutlined />} type="primary">
          新增
        </Button>
      </Flex>

      {/* 表格 */}
      <Table
        columns={tableColumns}
        rowKey="id"
        loading={isLoading}
        dataSource={dataSource}
        pagination={pagination}
      />

      {/* 弹窗 */}
      <FormModal
        {...modalProps}
        formOptions={modalFormOptions}
        onClose={onModalClose}
        onSubmit={onModalSubmit}
      />
    </PageWrapper>
  )
}
