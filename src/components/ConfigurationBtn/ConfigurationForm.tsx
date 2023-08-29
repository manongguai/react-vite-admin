import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import {
  Col,
  Row,
  Card,
  Switch,
  Space,
  ColorPicker,
  Radio,
  ConfigProvider
} from 'antd'
import {
  setWeakOrGray,
  setTheme,
  setBreadcrumbVisible,
  setTabsVisible,
  setFooterVisible,
  setPrimary,
  setLanguageVisible,
  setCollapsedVisible,
  setComponentSize
} from '@/store/modules/global/globalSlice'
const ConfigurationForm = () => {
  const {
    weakOrGray,
    theme,
    tabs,
    footer,
    breadcrumb,
    languageIcon,
    collapseIcon,
    primary,
    componentSize
  } = useAppSelector((state) => state.global.themeConfig)
  const dispatch = useAppDispatch()
  const plainOptions = ['small', 'middle', 'large']
  return (
    <ConfigProvider componentSize="middle">
      <Space direction="vertical">
        <Card size="small" title="主题配置" style={{ width: 300 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <span>Primary Color</span>
              </Col>
              <Col>
                <ColorPicker
                  showText
                  value={primary}
                  onChangeComplete={(color) => {
                    dispatch(setPrimary(color.toHexString()))
                  }}
                />
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col>
                <span>组件尺寸</span>
              </Col>
              <Col>
                {' '}
                <Radio.Group
                  optionType="button"
                  options={plainOptions}
                  onChange={(e) => dispatch(setComponentSize(e.target.value))}
                  value={componentSize}
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <span>暗黑模式</span>
              </Col>
              <Col>
                <Switch
                  checked={theme === 'dark'}
                  onChange={(e) => {
                    dispatch(setTheme(e ? 'dark' : 'light'))
                  }}
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <span>灰色模式</span>
              </Col>
              <Col>
                <Switch
                  checked={weakOrGray === 'gray'}
                  onChange={(e) => {
                    dispatch(setWeakOrGray(e ? 'gray' : null))
                  }}
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <span>色弱模式</span>
              </Col>
              <Col>
                <Switch
                  checked={weakOrGray === 'weak'}
                  onChange={(e) => {
                    dispatch(setWeakOrGray(e ? 'weak' : null))
                  }}
                />
              </Col>
            </Row>
          </Space>
        </Card>
        <Card size="small" title="布局配置" style={{ width: 300 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="space-between">
              <Col>
                <span>折叠面板按钮</span>
              </Col>
              <Col>
                <Switch
                  checked={collapseIcon}
                  onChange={(e) => {
                    dispatch(setCollapsedVisible(e))
                  }}
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <span>语言切换按钮</span>
              </Col>
              <Col>
                <Switch
                  checked={languageIcon}
                  onChange={(e) => {
                    dispatch(setLanguageVisible(e))
                  }}
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <span>面包屑导航</span>
              </Col>
              <Col>
                <Switch
                  checked={breadcrumb}
                  onChange={(e) => {
                    dispatch(setBreadcrumbVisible(e))
                  }}
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <span>标签栏</span>
              </Col>
              <Col>
                <Switch
                  checked={tabs}
                  onChange={(e) => {
                    dispatch(setTabsVisible(e))
                  }}
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <span>页脚</span>
              </Col>
              <Col>
                <Switch
                  checked={footer}
                  onChange={(e) => {
                    dispatch(setFooterVisible(e))
                  }}
                />
              </Col>
            </Row>
          </Space>
        </Card>
      </Space>
    </ConfigProvider>
  )
}

export default ConfigurationForm
