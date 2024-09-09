import { Table } from 'antd'
import FormModal from '@/components/Form/FormModal'
import FormSearch from '@/components/Form/FormSearch'
import { PageWrapper } from '@/components/Page/Wrapper'
import TableHeaderRow, { TableHeaderRowPros } from './TableHeaderRow'

interface CommonPageProps {
  tableColumns?: any[]
  dataSource?: any[]
  isLoading?: boolean
  pagination?: any
  onSearch?: (values: any) => void
  searchFormOptions?: any[]
  onResetSearch?: () => void
  modalProps?: Record<string, any>
  modalFormOptions?: any[]
  onModalClose?: () => void
  onModalSubmit?: (values: any) => void
  headerProps?: TableHeaderRowPros
}

export default function CommonPage({
  tableColumns = [],
  dataSource = [],
  isLoading = false,
  pagination = false,
  onSearch,
  searchFormOptions,
  onResetSearch,
  modalProps = {},
  modalFormOptions,
  onModalClose,
  onModalSubmit,
  headerProps
}: CommonPageProps) {
  return (
    <PageWrapper>
      {/* 搜索框 */}
      {searchFormOptions && (
        <FormSearch
          onReset={onResetSearch}
          formOptions={searchFormOptions}
          onSearch={onSearch}
        />
      )}

      {/* 操作按钮 */}
      {headerProps && <TableHeaderRow {...headerProps}></TableHeaderRow>}

      {/* 表格 */}
      <Table
        columns={tableColumns}
        rowKey="id"
        loading={isLoading}
        dataSource={dataSource}
        pagination={pagination}
      />

      {/* 弹窗 */}
      {modalFormOptions && (
        <FormModal
          {...modalProps}
          formOptions={modalFormOptions}
          onClose={onModalClose}
          onSubmit={onModalSubmit}
        />
      )}
    </PageWrapper>
  )
}
