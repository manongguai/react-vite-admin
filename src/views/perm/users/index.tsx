import {
  ColProps,
  message,
  Switch,
  Avatar,
  Divider,
  Popconfirm,
  Flex,
  Tooltip,
  Button
} from 'antd'
import {
  EyeOutlined,
  ToolOutlined,
  DeleteOutlined,
  RedoOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import { useState, useMemo } from 'react'
import { useSetState } from 'react-use'
import { useQuery } from 'react-query'
import {
  changeStatus,
  createUser,
  deleteUser,
  getUserList,
  getUserRoles,
  resetPassword,
  updateUser,
  UserParams
} from '@/api/user'
import { getAllRoles } from '@/api/role'
import { UserData } from './type'
import CommonPage from '@/components/Page/CommonPage'
import { FormOption } from '@/components/Form/FormPro'
import { Mode } from '@/components/Form/FormModal'

export default function UsersPage() {
  // 搜索参数
  const [searchParams, setSearchParams] = useSetState<UserParams>({
    status: undefined,
    username: '',
    page: 1,
    size: 10
  })

  // 获取用户列表
  const { data, isLoading, refetch } = useQuery(
    ['userList', searchParams],
    async () => {
      const res = await getUserList(searchParams)
      return res.data
    }
  )

  // 获取所有角色
  const { data: roleData } = useQuery('getAllRoles', getAllRoles)
  const rolesOptions = useMemo(() => {
    if (roleData) {
      return roleData.data!.map((role) => ({
        label: role.name,
        value: role.id
      }))
    }
    return []
  }, [roleData])

  // 当前操作的数据
  const [currentData, setCurrentData] = useState<UserData | null>(null)

  // 弹窗状态
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
      render: (v: string, record: UserData) => (
        <Flex align="center" gap={5}>
          <Avatar src={record.avatar}></Avatar> {v}
        </Flex>
      )
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
      render: (v: number, record: UserData) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          onChange={(checked) => onEnableChange(checked, record.id)}
          checked={Boolean(v)}
        />
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
        const controls = [
          <span
            key="view"
            onClick={() => onModalShow(record, 'see')}
            className="control-btn green"
          >
            <Tooltip placement="top" title="查看">
              <EyeOutlined />
            </Tooltip>
          </span>,
          <span
            key="edit"
            onClick={() => onModalShow(record, 'edit')}
            className="control-btn blue"
          >
            <Tooltip placement="top" title="修改">
              <ToolOutlined />
            </Tooltip>
          </span>,
          <Popconfirm
            key="delete"
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
          </Popconfirm>,
          <Popconfirm
            key="reset"
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
        ]

        return controls.reduce((prev: JSX.Element[], curr, index) => {
          if (index)
            prev.push(<Divider key={`divider${index}`} type="vertical" />)
          prev.push(curr)
          return prev
        }, [])
      }
    }
  ]

  // 搜索操作
  const onSearch = (values: {
    username: string
    status: number | undefined
  }) => {
    setSearchParams({
      ...values,
      page: 1
    })
  }

  // 重置搜索
  const onResetSearch = () => {
    onSearch({
      username: '',
      status: undefined
    })
  }

  // 弹窗操作
  const onModalShow = async (
    record: UserData | null,
    mode: 'add' | 'edit' | 'see'
  ) => {
    setCurrentData(record)
    if (record) {
      const { data: roleIds } = await getUserRoles(record?.id as string)
      setModal({
        visible: true,
        mode,
        initialValues: { ...record, roleIds }
      })
    } else {
      setModal({
        visible: true,
        mode,
        initialValues: { roleIds: [] }
      })
    }
  }

  // 弹窗关闭
  const onModalClose = () => {
    setCurrentData(null)
    setModal({ visible: false })
  }

  // 弹窗提交
  const onModalSubmit = async (values: any) => {
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

  // 启用/禁用操作
  const onEnableChange = async (checked: boolean, id: string) => {
    await changeStatus({ id, status: Number(checked) })
    message.success(checked ? '已启用' : '已禁用')
    refetch()
  }

  // 删除用户操作
  const onDel = async (record: UserData) => {
    await deleteUser(record.id)
    message.success('删除成功')
    refetch()
  }

  // 重置密码
  const onResetPassword = async (record: UserData) => {
    await resetPassword(record.id)
    message.success('密码已重置')
  }

  const modalFormOptions = useMemo<FormOption[]>(() => {
    return [
      {
        type: 'input',
        name: 'username',
        label: '用户名',
        rules: [{ required: true, message: '用户名不能为空' }],
        componentProps: {
          disabled: true,
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

  const headerProps = {
    elements: [
      {
        render: () => {
          return (
            <Button
              onClick={() => onModalShow(null, 'add')}
              icon={<PlusCircleOutlined />}
              type="primary"
            >
              新增
            </Button>
          )
        }
      }
    ]
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
      modalProps={modal}
      modalFormOptions={modalFormOptions}
      onModalClose={onModalClose}
      onModalSubmit={onModalSubmit}
      headerProps={headerProps}
    />
  )
}
