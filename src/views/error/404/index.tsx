import React from 'react'
import { Button, Row, Col } from 'antd'
import errImg from '@/assets/images/404.png'
import '../index.scss'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { useTranslation } from 'react-i18next'
const NotFound = () => {
  const navigate = useNavigate()
  const goHome = () => navigate(HOME_URL)
  const { t } = useTranslation()
  return (
    <Row className="not-found">
      <Col span={12}>
        <img src={errImg} alt="404" />
      </Col>
      <Col span={12} className="right">
        <h1>404</h1>
        <h2>{t('error.notFound')}</h2>
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
