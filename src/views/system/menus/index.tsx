import { getAllMenus } from '@/api/system'
import IconFont from '@/components/Iconfont'
import { buildMenuTree } from '@/utils/system'
import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { Popconfirm, Table, Tooltip, Tree, Divider, Button } from 'antd'
import { DataNode, EventDataNode } from 'antd/es/tree'
import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { TableRecordData } from './index.type'
import FormModal from '@/components/Modal/FormModal'
import { useSetState } from 'react-use'
import type { FormOption, Mode } from '@/components/Form/FormPro'

const MenusPage = () => {
  const { data: sourceData, isLoading } = useQuery([], getAllMenus)
  const [treeSelected, setTreeSelected] = useState<Menu.MenuTreeOptions | null>(
    null
  )
  const treeMenus = useMemo(() => {
    if (sourceData) {
      return buildMenuTree(sourceData.data!)
    }
    return []
  }, [sourceData])

  const [modal, setModal] = useSetState<{
    visible: boolean
    mode: Mode
    formOptions: FormOption[]
    initialValues: Record<string, any>
  }>({
    visible: false,
    mode: 'add',
    formOptions: [
      {
        type: 'input',
        name: 'name',
        label: '名称',
        rules: [{ required: true, message: '名称不能为空' }],
        componentProps: {
          placeholder: '请输入名称'
        }
      }
    ],
    initialValues: {}
  })

  const onTreeSelect = (
    keys: React.Key[],
    info: {
      event: 'select'
      selected: boolean
      node: EventDataNode<Menu.MenuTreeOptions>
      selectedNodes: Menu.MenuTreeOptions[]
      nativeEvent: MouseEvent
    }
  ) => {
    let treeSelect: Menu.MenuTreeOptions | null = null
    if (info.selected) {
      // 选中
      treeSelect = {
        path: info.node.path,
        name: info.node.name,
        code: info.node.path,
        parentId: info.node.parentId,
        id: info.node.id,
        type: info.node.type,
        children: info.node.children
      }
    }
    setTreeSelected(treeSelect)
  }
  /** 构建表格数据 **/
  const tableData = useMemo(() => {
    if (!sourceData) return []
    return sourceData!
      .data!.filter((item) => {
        return treeSelected
          ? item.parentId === treeSelected.id
          : item.parentId === '0'
      })
      .map((item, index) => {
        return {
          ...item,
          key: index,
          control: item.id,
          serial: index + 1
        }
      })
  }, [sourceData, treeSelected])

  /** 构建表格字段 **/
  const tableColumns = [
    {
      title: '序号',
      dataIndex: 'serial',
      key: 'serial'
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      render: (v: string | null) => {
        return v ? `/${v.replace(/^\//, '')}` : ''
      }
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      render: (v: string | null) => {
        return v ? <IconFont type={v} /> : ''
      }
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      key: 'orderNum'
    },
    {
      title: '操作',
      key: 'control',
      width: 120,
      render: (v: number, record: TableRecordData) => {
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
          >
            <span onClick={() => onDel(record)} className="control-btn red">
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
    console.log('close modal')
    setModal({
      visible: false
    })
  }
  function onModalSubmit() {
    console.log('submit modal')
  }

  function onModalShow(record: TableRecordData | null, mode: Mode) {
    setModal({
      visible: true,
      mode,
      initialValues: record ? { ...record } : {}
    })
  }
  function onDel(record: TableRecordData) {}
  return (
    <MenuPageWrapper>
      <LeftWrapper>
        <div className="tree_title">目录结构</div>
        <div className="tree_wrapper">
          <Tree
            onSelect={onTreeSelect}
            fieldNames={{
              key: 'id',
              title: 'name'
            }}
            treeData={treeMenus}
          ></Tree>
        </div>
      </LeftWrapper>
      <RightWrapper>
        <TableHeaderRow>
          <Button
            onClick={() => onModalShow(null, 'add')}
            icon={<PlusCircleOutlined />}
            type="primary"
          >
            {' '}
            {`添加${treeSelected ? treeSelected.name : '根级'}子菜单`}
          </Button>
        </TableHeaderRow>
        <TableWrapper>
          <Table
            columns={tableColumns}
            loading={isLoading}
            dataSource={tableData}
            pagination={{
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条数据`
            }}
          ></Table>
        </TableWrapper>
      </RightWrapper>
      <FormModal
        {...modal}
        onClose={onModalClose}
        onSubmit={onModalSubmit}
      ></FormModal>
    </MenuPageWrapper>
  )
}

export default MenusPage

const MenuPageWrapper = styled.div`
  display: flex;
  height: 100%;
  background-color: var(--bg-color);
`

const LeftWrapper = styled.div`
  width: 300px;
  min-width: 300px;
  height: 100%;
  border: solid 1px var(--border-color);
  display: flex;
  flex-direction: column;
  & .tree_title {
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 10px;
    border-bottom: 1px solid var(--border-color);
  }

  & .tree_wrapper {
    padding: 10px 5px;
    flex: 1;
    overflow: auto;
  }
`
const RightWrapper = styled.div`
  flex: 1;
  margin-left: 16px;
  padding: 8px;
  border: solid 1px var(--border-color);
  display: flex;
  flex-direction: column;
`
const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;
`
const TableHeaderRow = styled.div`
  padding: 8px;
`
