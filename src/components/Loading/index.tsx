import { Spin } from 'antd'
import './index.scss'

const Loading = ({ tip = 'Loading' }: { tip?: string }) => {
  return (
    <div className="request-loading">
      <Spin tip={tip} size="large">
        <div className="content" />
      </Spin>
    </div>
  )
}

export default Loading
