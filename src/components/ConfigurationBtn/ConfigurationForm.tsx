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
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const plainOptions = ['small', 'middle', 'large']
  return (
    <ConfigProvider componentSize="middle">
      <Space direction="vertical">
        <Card
          size="small"
          title={t('config.themeConfig')}
          style={{ width: 300 }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <span>{t('config.primaryColor')}</span>
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
                <span>{t('config.componentSize')}</span>
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
                <span>{t('config.darkMode')}</span>
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
                <span>{t('config.grayMode')}</span>
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
                <span>{t('config.weakMode')}</span>
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
        <Card
          size="small"
          title={t('config.layoutConfig')}
          style={{ width: 300 }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="space-between">
              <Col>
                <span>{t('config.collapsedIcon')}</span>
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
                <span>{t('config.languageIcon')}</span>
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
                <span>{t('config.breadcrumbNav')}</span>
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
                <span>{t('config.tabs')}</span>
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
                <span>{t('config.footer')}</span>
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
