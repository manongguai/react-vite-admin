import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import './login.scss'
import initBackground from './init'
import { login } from '@/api/user'
import { setTokens } from '@/store/modules/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const LoginView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    login(values).then((res) => {
      const { accessToken, refreshToken } = res.data!
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
    initBackground()
    window.onresize = function () {
      initBackground()
    }
  }, [])
  return (
    <div className="loginContainer">
      <canvas id="canvas" style={{ display: 'block' }}></canvas>
      <div className="loginBox">
        <h2>
          <span className="primary">Admin</span> 后台管理系统
        </h2>
        <Form
          name="basic"
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
            <Input placeholder="用户名：admin/tourist" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="密码：123456" />
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
      </div>
    </div>
  )
}

export default LoginView
