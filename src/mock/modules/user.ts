import { ReqLoginForm } from '@/api/user'
import Mock from 'mockjs'
import { message } from 'antd'

export const login = Mock.mock('/api/login', (options: any) => {
  const body = JSON.parse(options.body)
  if (
    (body.username == 'admin' || body.username == 'tourist') &&
    body.password == '123456'
  ) {
    return {
      data: {
        accessToken: body.username == 'admin' ? 'token1' : 'token2',
        refreshToken: 'refreshToken1'
      },
      msg: 'success',
      code: 200
    }
  } else {
    return {
      data: {
        message: '用户名或密码错误'
      },
      msg: '用户名或密码错误',
      code: 500
    }
  }
})

export const refreshToken = Mock.mock('/api/refreshToken', {
  data: {
    accessToken: 'token2',
    refreshToken: 'refreshToken2'
  },
  msg: 'success',
  code: 200
})

export const menuList = Mock.mock('/api/menuList', {
  data: [
    {
      path: '/home',
      title: 'home',
      icon: 'PieChartOutlined'
    }
  ],
  msg: 'success',
  code: 200
})
