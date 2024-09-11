import { ColProps, Divider, Popconfirm, Tooltip, Button, Tree } from 'antd'
import {
  EyeOutlined,
  ToolOutlined,
  DeleteOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import { useState, useMemo, Key } from 'react'
import { useSetState } from 'react-use'
import { useQuery } from 'react-query'
import { getUserMenus } from '@/api/user'
import {
  createRole,
  delRole,
  getRoleList,
  getRolePerms,
  QueryRoleList,
  RoleApiResult,
  updateRole
} from '@/api/role'
import CommonPage from '@/components/Page/CommonPage'
import { FormOption } from '@/components/Form/FormPro'
import { buildMenuTreeForPage } from '@/utils/system'
import { FormInstance } from 'antd/lib'

export default function UsersPage() {
  // 搜索参数
  const [searchParams, setSearchParams] = useSetState<QueryRoleList>({
    name: '',
    page: 1,
    size: 10
  })

  // 获取用户列表
  const { data, isLoading, refetch } = useQuery(
    ['roleList', searchParams],
    async () => {
      const res = await getRoleList(searchParams)
      return res.data
    }
  )
  // 获取所有菜单权限
  const { data: menuData } = useQuery('getUserMenus', getUserMenus)
  const [currentMenuIds, setCurrentMenuIds] = useState<string[]>([])
  const treeMenus = useMemo(() => {
    if (menuData) {
      return buildMenuTreeForPage(menuData.data!, false)
    }
    return []
  }, [menuData])

  // 当前操作的数据
  const [currentData, setCurrentData] = useState<RoleApiResult | null>(null)

  // 弹窗状态
  const [modal, setModal] = useSetState<{
    visible: boolean
    mode: 'add' | 'edit' | 'see'
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
      title: '角色名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
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
      render: (v: number, record: RoleApiResult) => {
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

  // 弹窗操作
  const onModalShow = async (
    record: RoleApiResult | null,
    mode: 'add' | 'edit' | 'see'
  ) => {
    setCurrentData(record)
    if (record) {
      const { data: menuIds } = await getRolePerms(record?.id as string)
      setCurrentMenuIds(menuIds || [])
      setModal({
        visible: true,
        mode,
        initialValues: { ...record, menuIds }
      })
    } else {
      setCurrentMenuIds([])
      setModal({
        visible: true,
        mode,
        initialValues: { menuIds: [] }
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
      const res = await createRole(params)
      window.$message.success('创建成功')
    } else if (modal.mode == 'edit') {
      const res = await updateRole(params)
      window.$message.success('更新成功')
    }
    onModalClose()
    refetch()
  }

  // 删除用户操作
  const onDel = async (record: RoleApiResult) => {
    await delRole(record.id)
    window.$message.success('删除成功')
    refetch()
  }

  const onCheck = (
    checkedKeysValue: {
      checked: Key[]
      halfChecked: Key[]
    },
    formInstance: FormInstance
  ) => {
    formInstance.setFieldsValue({ menuIds: checkedKeysValue.checked })
  }

  const modalFormOptions = useMemo<FormOption[]>(() => {
    return [
      {
        type: 'input',
        name: 'name',
        label: '角色名',
        rules: [{ required: true, message: '角色名不能为空' }],
        componentProps: {
          placeholder: '请输入角色名',
          allowClear: true
        }
      },
      {
        type: 'input',
        name: 'remark',
        label: '备注',
        componentProps: {
          placeholder: '请输入备注',
          allowClear: true
        }
      },
      {
        type: 'custom',
        name: 'menuIds',
        label: '权限',
        render: (formInstance, props) => {
          return (
            <div
              style={{
                maxHeight: '300px',
                overflow: 'auto'
              }}
            >
              <Tree
                {...props}
                fieldNames={{
                  key: 'id',
                  title: 'name'
                }}
                onCheck={(checkedKeysValue) => {
                  onCheck(
                    checkedKeysValue as {
                      checked: Key[]
                      halfChecked: Key[]
                    },
                    formInstance
                  )
                }}
                defaultCheckedKeys={currentMenuIds}
                defaultExpandAll
                checkable
                checkStrictly
                treeData={treeMenus}
                defaultExpandParent
              ></Tree>
            </div>
          )
        }
      }
    ]
  }, [treeMenus, currentData, modal, currentMenuIds])

  const searchFormOptions: FormOption[] = [
    {
      type: 'input',
      name: 'name',
      label: '角色名',
      componentProps: {
        placeholder: '请输入角色名',
        allowClear: true
      }
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
