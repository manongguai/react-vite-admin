import { Spin } from 'antd'
import './index.scss'

const FullLoading = ({ tip = 'Loading' }: { tip?: string }) => {
  return (
    <div id="full-loading">
      <div className="request-loading">
        <Spin tip={tip} size="large">
          <div className="content" />
        </Spin>
      </div>
    </div>
  )
}

export default FullLoading
