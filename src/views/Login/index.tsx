import React, { useEffect, useState } from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, theme } from 'antd'
import './login.scss'
import initBackground from './init'
import { login } from '@/api/user'
import { setTokens } from '@/store/modules/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Iconfont from '@/components/Iconfont'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { USERNAME_KEY } from '@/config/config'

type FieldType = {
  username?: string
  password?: string
  remember?: boolean
}

const LoginView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  form.setFieldValue('username', localStorage.getItem(USERNAME_KEY || ''))
  form.setFieldValue(
    'remember',
    localStorage.getItem(USERNAME_KEY) ? true : false
  )
  const onFinish = (values: any) => {
    login(values).then((res) => {
      const { accessToken, refreshToken } = res.data!
      if (values.remember) {
        localStorage.setItem(USERNAME_KEY, values.username)
      } else {
        localStorage.removeItem(USERNAME_KEY)
      }
      dispatch(setTokens({ accessToken, refreshToken }))
      navigate('/home', {
        replace: true
      })
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    const stop = initBackground()
    window.onresize = function () {
      initBackground()
    }
    return () => stop()
  }, [])
  return (
    <div className="loginContainer">
      <canvas id="canvas" style={{ display: 'block' }}></canvas>
      <div className="loginBox">
        <div className="loginTitele">
          <Iconfont className="loginLogo" type="icon-logo"></Iconfont>{' '}
          <span className="primary">React-Admin</span>
        </div>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm
          }}
        >
          <Form
            name="basic"
            size="large"
            form={form}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
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
              <Checkbox>记住用户名</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default LoginView
