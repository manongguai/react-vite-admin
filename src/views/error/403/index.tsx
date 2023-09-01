import React from 'react'
import { Button, Row, Col } from 'antd'
import errImg from '@/assets/images/404.png'
import '../index.scss'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { useTranslation } from 'react-i18next'
import { useTabs } from '@/hooks/tabs.hooks'
const NotFound = () => {
  const navigate = useNavigate()
  const { delTab } = useTabs()
  const goHome = () => {
    delTab()
    navigate(HOME_URL)
  }
  const { t } = useTranslation()
  return (
    <Row className="not-found">
      <Col span={12}>
        <img src={errImg} alt="403" />
      </Col>
      <Col span={12} className="right">
        <h1>403</h1>
        <h2>{t('error.notAuth')}</h2>
        <div>
          <Button type="primary" onClick={goHome}>
            {t('home.backHome')}
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default NotFound
