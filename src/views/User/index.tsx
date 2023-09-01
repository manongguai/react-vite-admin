import React, { useState } from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Space,
  Table,
  Tag
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}
const sourceData: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
const UserIndex: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null)
  const [data, setData] = useState<DataType[]>(sourceData)
  const navigate = useNavigate()
  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: '年龄',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
      key: 'age'
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <a onClick={() => del(index)}>删除</a>
          <a onClick={() => detailPage(record.key)}>详情</a>
        </Space>
      )
    }
  ]
  function del(index: number) {
    sourceData.splice(index, 1)
    setData(sourceData.slice(0))
  }
  function detailPage(key: string) {
    navigate('/user/detail/' + key)
  }
  const onFinish = (values: any) => {
    const list = sourceData.filter((item) =>
      item.name.includes(values.username)
    )
    setData(list)
  }
  function reset() {
    setData(sourceData)
    formRef.current?.resetFields()
  }
  interface FieldType {
    username: string
  }
  return (
    <div>
      <div className="searchForm">
        <Form
          initialValues={{
            username: ''
          }}
          onFinish={onFinish}
          ref={formRef}
          layout="inline"
          name="search"
        >
          <Row gutter={[10, 10]}>
            <Col>
              <Form.Item<FieldType> label="用户名" name="username">
                <Input allowClear placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col>
              <Button
                htmlType="submit"
                icon={<SearchOutlined />}
                type="primary"
              >
                搜索
              </Button>
            </Col>
            <Col>
              <Button htmlType="button" icon={<UndoOutlined />} onClick={reset}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  )
}

export default UserIndex
