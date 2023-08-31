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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
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
          <a onClick={() => del(index)}>Delete</a>
          <a onClick={() => detailPage(record.key)}>Detail</a>
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
      <Card bodyStyle={{ padding: '20px 15px' }} className="searchForm">
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
              <Form.Item<FieldType> label="Username" name="username">
                <Input allowClear placeholder="Please enter a username" />
              </Form.Item>
            </Col>
            <Col>
              <Button htmlType="submit" type="primary">
                search
              </Button>
            </Col>
            <Col>
              <Button htmlType="button" onClick={reset}>
                reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default UserIndex
