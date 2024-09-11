import {
  createDept,
  deleteDept,
  DeptApiResult,
  getDeptList,
  updateDept
} from '@/api/dept'
import CommonPage from '@/components/Page/CommonPage'
import { useQuery } from 'react-query'
import { useSetState } from 'react-use'
import { Button, ColProps, Divider, Popconfirm, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { listToTree } from '@/utils/perm'
import { Mode } from '@/components/Form/FormModal'
import { useMemo, useState } from 'react'
import { FormOption } from '@/components/Form/FormPro'

export default function DeptsPage() {
  // 获取列表
  const { data, isLoading, refetch } = useQuery(['deptList'], async () => {
    const res = await getDeptList()
    return listToTree(res.data!, { root: '0', pidKey: 'parentId' })
  })
  // 当前操作的数据
  const [currentData, setCurrentData] = useState<DeptApiResult | null>(null)
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

  const modalFormOptions = useMemo<FormOption[]>(() => {
    return [
      {
        type: 'input',
        name: 'name',
        label: '部门名称',
        rules: [{ required: true, message: '部门名称不能为空' }],
        componentProps: {
          placeholder: '请输入部门名称',
          allowClear: true
        }
      },
      {
        type: 'treeSelect',
        name: 'parentId',
        label: '上级部门',
        rules: [{ required: true, message: '请选择上级部门' }],
        componentProps: {
          placeholder: '请选择上级部门',
          allowClear: true,
          disabled: modal.mode != 'add',
          fieldNames: {
            label: 'name',
            value: 'id'
          }
        },
        options: [
          {
            name: '无',
            id: '0',
            children: data
          }
        ]
      },
      // {
      //   type: 'select',
      //   name: 'leader',
      //   label: '负责人',
      //   rules: [{ required: true, message: '请选择负责人' }],
      //   componentProps: {
      //     placeholder: '请选择负责人',
      //     allowClear: true
      //   }
      // },
      {
        type: 'input',
        name: 'leader',
        label: '负责人',
        rules: [{ required: true, message: '请选择负责人' }],
        componentProps: {
          placeholder: '暂时手输，未绑定用户系统',
          allowClear: true
        }
      },
      {
        type: 'input',
        name: 'remark',
        label: '备注',
        rules: [{ required: true, message: '请输入备注' }],
        componentProps: {
          placeholder: '请输入备注',
          allowClear: true
        }
      },
      {
        type: 'inputNumber',
        name: 'orderNum',
        label: '排序',
        rules: [{ required: true, message: '排序不能为空' }],
        componentProps: {
          placeholder: '请输入排序'
        }
      }
    ]
  }, [currentData, modal])
  const tableColumns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      key: 'leader'
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      key: 'orderNum'
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate'
    },
    {
      title: '操作',
      key: 'control',
      width: 160,
      render: (v: number, record: DeptApiResult) => {
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

  // 弹窗操作
  const onModalShow = async (
    record: DeptApiResult | null,
    mode: 'add' | 'edit' | 'see'
  ) => {
    setCurrentData(record)
    if (record) {
      setModal({
        visible: true,
        mode,
        initialValues: { ...record }
      })
    } else {
      setModal({
        visible: true,
        mode,
        initialValues: { orderNum: 0 }
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
      const res = await createDept(params)
      window.$message.success('创建成功')
    } else if (modal.mode == 'edit') {
      const res = await updateDept(params)
      window.$message.success('更新成功')
    }
    onModalClose()
    refetch()
  }

  // 删除用户操作
  const onDel = async (record: DeptApiResult) => {
    await deleteDept(record.id)
    window.$message.success('删除成功')
    refetch()
  }

  const headerProps = {
    align: 'start',
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
      modalFormOptions={modalFormOptions}
      dataSource={data}
      tableColumns={tableColumns}
      onModalClose={onModalClose}
      onModalSubmit={onModalSubmit}
      isLoading={isLoading}
      modalProps={modal}
      headerProps={headerProps}
    ></CommonPage>
  )
}
