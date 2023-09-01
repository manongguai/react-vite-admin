import { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Space,
  theme
} from 'antd'
import './login.scss'
import initBackground from './initBackground'
import { login } from '@/api/user'
import { setTokens } from '@/store/modules/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Iconfont from '@/components/Iconfont'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { USERNAME_KEY } from '@/config/config'
import { useTranslation } from 'react-i18next'
import { message } from 'antd'
import ThemeIcon from '@/layout/header/components/ThemeIcon'
import { useAppSelector } from '@/hooks/redux.hooks'
type FieldType = {
  username?: string
  password?: string
  remember?: boolean
}

const LoginView = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const theme = useAppSelector((state) => state.global.themeConfig.theme)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [initialForm] = useState({
    password: '',
    username: localStorage.getItem(USERNAME_KEY) || '',
    remember: localStorage.getItem(USERNAME_KEY) ? true : false
  })
  const onFinish = (values: any) => {
    login(values).then((res) => {
      const { accessToken, refreshToken } = res.data!
      if (values.remember) {
        localStorage.setItem(USERNAME_KEY, values.username)
      } else {
        localStorage.removeItem(USERNAME_KEY)
      }
      dispatch(setTokens({ accessToken, refreshToken }))
      messageApi.success(t('notification.loginSuccess'))
      navigate('/home', {
        replace: true
      })
    })
  }
  const onFinishFailed = (errorInfo: any) => {}
  useEffect(() => {
    const stop = initBackground(theme)
    window.onresize = function () {
      initBackground(theme)
    }
    return () => stop()
  }, [theme])
  return (
    <>
      {contextHolder}
      <div className="loginContainer">
        <canvas
          onContextMenu={(e) => e.preventDefault()}
          id="canvas"
          style={{ display: 'block' }}
        ></canvas>
        <div className="loginBox">
          <Space className="login-icons">
            <ThemeIcon />
          </Space>
          <div className="loginTitele">
            <Iconfont className="loginLogo" type="icon-logo"></Iconfont>
            <span className="primary">React-Admin</span>
          </div>
          <Form
            name="basic"
            size="large"
            form={form}
            style={{ maxWidth: 600 }}
            initialValues={initialForm}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                allowClear
                styles={{ input: { paddingLeft: '12px' } }}
                prefix={<UserOutlined />}
                placeholder="用户名：admin/tourist"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                allowClear
                styles={{ input: { paddingLeft: '12px' } }}
                prefix={<LockOutlined />}
                placeholder="密码：123456"
              />
            </Form.Item>
            <Form.Item<FieldType> name="remember" valuePropName="checked">
              <Checkbox>{t('login.remember')}</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                {t('login.confirm')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default LoginView
