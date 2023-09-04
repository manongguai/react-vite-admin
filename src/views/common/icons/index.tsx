import { Card, Col, Row, Space } from 'antd'
import { getAntIcon } from '@/utils/system'
import './index.scss'
import Icon, {
  EditOutlined,
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import React from 'react'
import copy from 'copy-to-clipboard'
import IconFont from '@/components/Iconfont'
interface Component {
  key: string
  component: React.ForwardRefExoticComponent<any>
}
const iconFontList: string[] = [
  'icon-zhongyingwen1',
  'icon-github',
  'icon-taiyang',
  'icon-quanping',
  'icon-quxiaoquanping',
  'icon-cc-magic'
]
const componentList: Component[] = [
  {
    key: 'EditOutlined',
    component: EditOutlined
  },
  {
    key: 'HomeOutlined',
    component: HomeOutlined
  },
  {
    key: 'LoadingOutlined',
    component: LoadingOutlined
  },
  {
    key: 'SettingFilled',
    component: SettingFilled
  },
  {
    key: 'SmileOutlined',
    component: SmileOutlined
  },
  {
    key: 'CheckCircleOutlined',
    component: CheckCircleOutlined
  }
]
const iconList: string[] = [
  'StepBackwardOutlined',
  'StepForwardOutlined',
  'FastBackwardOutlined',
  'ShrinkOutlined',
  'DownOutlined',
  'PlusOutlined'
]
const Icons = () => {
  function copyText(key: string) {
    copy(key)
    window.$message.success('复制成功')
  }
  return (
    <>
      <Card title="Ant Icons">
        <Row gutter={[20, 20]}>
          {iconList.map((key) => (
            <Col
              onClick={() => copyText(key)}
              span={4}
              key={key}
              className="demo-icon-box"
            >
              <Space direction="vertical" align="center" size={20}>
                {getAntIcon(key, { className: 'demo-icon' })}
                <span>{key}</span>
              </Space>
            </Col>
          ))}
          {componentList.map((item) => {
            return (
              <Col
                onClick={() => copyText(item.key)}
                key={item.key}
                className="demo-icon-box"
                span={4}
              >
                <Space direction="vertical" align="center" size={20}>
                  {/* 两种写法都可以 */}
                  {/* {React.createElement(item.component, {
                    className: 'demo-icon'
                  })} */}
                  <Icon component={item.component} className="demo-icon"></Icon>
                  <span>{item.key}</span>
                </Space>
              </Col>
            )
          })}
        </Row>
      </Card>
      <Card title="IconFont Icons" style={{ marginTop: '10px' }}>
        <Row gutter={[20, 20]}>
          {iconFontList.map((key) => {
            return (
              <Col
                onClick={() => copyText(key)}
                key={key}
                className="demo-icon-box"
                span={4}
              >
                <Space direction="vertical" align="center" size={20}>
                  <IconFont className="demo-icon" type={key}></IconFont>
                  <span>{key}</span>
                </Space>
              </Col>
            )
          })}
        </Row>
      </Card>
    </>
  )
}

export default Icons
