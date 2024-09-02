import { ColProps, Divider, message, Popconfirm, Table, Tooltip } from 'antd'
import { UserData } from './type'
import { DeleteOutlined, EyeOutlined, ToolOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Mode } from '@/components/Form/FormPro'
import { useSetState } from 'react-use'
import { useQuery } from 'react-query'
import { getUserList } from '@/api/user'

export default function UsersPage() {
  const { data, isLoading, refetch } = useQuery('', async () => {
    const res = await getUserList({
      page: 1,
      size: 10
    })
    return res.data
  })
  const [currentData, setCurrentData] = useState<UserData | null>(null)

  const [modal, setModal] = useSetState<{
    visible: boolean
    mode: Mode
    labelCol: ColProps
    initialValues: Record<string, any>
  }>({
    visible: false,
    mode: 'add',
    labelCol: { span: 4 },
    initialValues: {}
  })

  /** 构建表格字段 **/
  const tableColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: number) =>
        v === 1 ? (
          <span style={{ color: 'green' }}>启用</span>
        ) : (
          <span style={{ color: 'red' }}>禁用</span>
        )
    },
    {
      title: '注册时间',
      dataIndex: 'createDate',
      key: 'createDate'
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      key: 'updateDate'
    },
    {
      title: '操作',
      key: 'control',
      width: 120,
      render: (v: number, record: UserData) => {
        const controls = []
        controls.push(
          <span
            onClick={() => onModalShow(record, 'see')}
            key="0"
            className="control-btn green"
          >
            <Tooltip placement="top" title="查看">
              <EyeOutlined />
            </Tooltip>
          </span>
        )

        controls.push(
          <span
            onClick={() => onModalShow(record, 'edit')}
            key="1"
            className="control-btn blue"
          >
            <Tooltip placement="top" title="修改">
              <ToolOutlined />
            </Tooltip>
          </span>
        )
        controls.push(
          <Popconfirm
            key="2"
            title="确定删除吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={() => onDel(record)}
          >
            <span className="control-btn red">
              <Tooltip placement="top" title="删除">
                <DeleteOutlined />
              </Tooltip>
            </span>
          </Popconfirm>
        )
        const result: JSX.Element[] = []
        controls.forEach((item, index) => {
          if (index) {
            result.push(<Divider key={`line${index}`} type="vertical" />)
          }
          result.push(item)
        })
        return result
      }
    }
  ]

  function onModalClose() {
    setCurrentData(null)
    setModal({
      visible: false
    })
  }
  async function onModalSubmit(values: any) {
    const params = {
      ...values
    }
    if (currentData && currentData.id) {
      params.id = currentData.id
    }
    if (modal.mode == 'add') {
      // const res = await createMenu(params)
      message.success('菜单创建成功')
    } else if (modal.mode == 'edit') {
      // const res = await updateMenu(params)
      message.success('菜单更新成功')
    }
    onModalClose()
    refetch()
  }

  async function onModalShow(record: UserData | null, mode: Mode) {
    setCurrentData(record)
    let newModal = {}
    if (record) {
      // const { data: menuPermList } = await getMenuPerm(record?.id as string)
      newModal = {
        visible: true,
        mode,
        initialValues: {
          ...record
        }
      }
    } else {
      newModal = {
        visible: true,
        mode,
        initialValues: { orderNum: 0, type: 1, menuPermList: [] }
      }
    }
    setModal(newModal)
  }
  async function onDel(record: UserData) {
    // const res = await deleteMenu(record.id)
    message.success('菜单删除成功')
    refetch()
  }

  return (
    <div>
      <Table
        columns={tableColumns}
        rowKey="id"
        loading={isLoading}
        dataSource={data?.list || []}
        pagination={{
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`
        }}
      ></Table>
    </div>
  )
}
