import { Button, Card, Descriptions } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

function detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <Card
      style={{ height: '100%' }}
      title="用户详情"
      extra={<Button onClick={() => navigate(-1)}>返回</Button>}
    >
      <Descriptions>
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default detail
