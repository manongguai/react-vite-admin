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

export const menus = Mock.mock('/api/menus', {
  data: [
    {
      path: '/home',
      title: '首页',
      icon: 'PieChartOutlined',
      isMenu: true
    },
    {
      path: '/user',
      title: '用户管理',
      icon: 'PieChartOutlined',
      isMenu: true,
      children: [
        {
          path: '/user/detail',
          title: '用户详情'
        },
        {
          path: '/user/list',
          title: '用户列表',
          isMenu: true
        }
      ]
    },
    {
      path: '/iframe',
      title: '内嵌页面',
      isMenu: true,
      children: [
        {
          path: '/iframe/bing',
          title: '必应',
          isMenu: true
        }
      ]
    },
    {
      path: '/link',
      title: '外部链接',
      icon: 'PieChartOutlined',
      isMenu: true,
      children: [
        {
          path: 'http://www.baidu.com',
          title: '百度一下',
          isMenu: true,
          isLink: true
        }
      ]
    }
  ],
  msg: 'success',
  code: 200
})
