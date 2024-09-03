import {
  ColProps,
  Divider,
  message,
  Popconfirm,
  Table,
  Tooltip,
  Flex,
  Avatar,
  Button
} from 'antd'
import { UserData } from './type'
import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { useMemo, useState } from 'react'
import { FormOption, Mode } from '@/components/Form/FormPro'
import { useSetState } from 'react-use'
import { useQuery } from 'react-query'
import {
  createUser,
  deleteUser,
  getUserList,
  getUserRoles,
  resetPassword,
  updateUser,
  UserParams
} from '@/api/user'
import { PageWrapper } from '@/components/Page'
import FormSearch from '@/components/Form/FormSearch'
import FormModal from '@/components/Form/FormModal'
import { getAllRoles } from '@/api/role'
import styled from 'styled-components'

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSetState<UserParams>({
    status: undefined,
    username: '',
    page: 1,
    size: 10
  })

  const { data, isLoading, refetch } = useQuery(
    ['userList', searchParams],
    async () => {
      const res = await getUserList(searchParams)
      return res.data
    }
  )
  const { data: roleData } = useQuery('getAllRoles', getAllRoles)
  const [currentData, setCurrentData] = useState<UserData | null>(null)
  const rolesOptions = useMemo(() => {
    if (roleData) {
      return roleData.data!.map((role) => {
        return {
          label: role.name,
          value: role.id
        }
      })
    }
    return []
  }, [roleData])
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
      key: 'username',
      render: (v: string, record: UserData) => {
        return (
          <Flex align="center" gap={5}>
            <Avatar src={record.avatar}></Avatar> {v}
          </Flex>
        )
      }
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
      width: 160,
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
        controls.push(
          <Popconfirm
            key="3"
            title="确定重置密码吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={() => onResetPassword(record)}
          >
            <span className="control-btn red">
              <Tooltip placement="top" title="重置密码">
                <RedoOutlined />
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
      const res = await createUser(params)
      message.success('创建成功')
    } else if (modal.mode == 'edit') {
      const res = await updateUser(params)
      message.success('更新成功')
    }
    onModalClose()
    refetch()
  }
  async function onModalShow(record: UserData | null, mode: Mode) {
    setCurrentData(record)
    let newModal = {}
    if (record) {
      const { data: roleIds } = await getUserRoles(record?.id as string)
      newModal = {
        visible: true,
        mode,
        initialValues: {
          ...record,
          roleIds
        }
      }
    } else {
      newModal = {
        visible: true,
        mode,
        initialValues: { roleIds: [] }
      }
    }
    setModal(newModal)
  }
  async function onDel(record: UserData) {
    const res = await deleteUser(record.id)
    message.success('删除成功')
    refetch()
  }

  async function onResetPassword(record: UserData) {
    await resetPassword(record.id)
    message.success('重置密码成功')
    refetch()
  }
  const searchFormOptions: FormOption[] = [
    {
      type: 'input',
      name: 'username',
      label: '用户名',
      componentProps: {
        placeholder: '请输入用户名',
        allowClear: true
      }
    },
    {
      type: 'select',
      name: 'status',
      label: '状态',
      componentProps: {
        placeholder: '请选择状态',
        allowClear: true,
        showSearch: true
      },
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]

  const modalFormOptions = useMemo<FormOption[]>(() => {
    return [
      {
        type: 'input',
        name: 'username',
        label: '用户名',
        rules: [{ required: true, message: '用户名不能为空' }],
        componentProps: {
          disabled: modal.mode != 'add',
          placeholder: '请输入用户名',
          allowClear: true
        }
      },
      {
        type: 'input',
        name: 'phone',
        label: '手机号',
        rules: [{ required: true, message: '手机号不能为空' }],
        componentProps: {
          placeholder: '请输入手机号',
          allowClear: true
        }
      },
      {
        type: 'input',
        name: 'email',
        label: '邮箱',
        rules: [{ required: true, message: '邮箱不能为空' }],
        componentProps: {
          placeholder: '请输入邮箱',
          allowClear: true
        }
      },
      {
        type: 'select',
        name: 'roleIds',
        label: '角色',
        options: rolesOptions,
        hidden: () => {
          return currentData?.type === 0
        },
        componentProps: {
          placeholder: '请选择角色',
          mode: 'multiple'
        }
      }
    ]
  }, [rolesOptions, currentData, modal])

  function onSearch(values: { username: string; status: number | undefined }) {
    setSearchParams({
      ...values,
      page: 1
    })
  }
  function onPageChange(page: number, size: number) {
    setSearchParams({
      page,
      size
    })
  }

  return (
    <PageWrapper>
      <FormSearch
        onReset={() =>
          onSearch({
            username: '',
            status: undefined
          })
        }
        formOptions={searchFormOptions}
        onSearch={onSearch}
      />
      <Flex
        justify="end"
        style={{
          marginBottom: '16px'
        }}
      >
        <Button
          onClick={() => onModalShow(null, 'add')}
          icon={<PlusCircleOutlined />}
          type="primary"
        >
          新增
        </Button>
      </Flex>
      <Table
        columns={tableColumns}
        rowKey="id"
        loading={isLoading}
        dataSource={data?.list || []}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          total: data?.total || 0,
          current: 1,
          showTotal: () => `共 ${data?.total} 条数据`,
          onChange: onPageChange
        }}
      ></Table>
      <FormModal
        {...modal}
        formOptions={modalFormOptions}
        onClose={onModalClose}
        onSubmit={onModalSubmit}
      ></FormModal>
    </PageWrapper>
  )
}
