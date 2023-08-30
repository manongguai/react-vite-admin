import { ReqLoginForm } from '@/api/user'
import { templateOrFn } from 'mockjs'

export const userMock: Record<string, templateOrFn> = {
  '/api/login': (options: any) => {
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
  },
  '/api/refreshToken': {
    data: {
      accessToken: 'token2',
      refreshToken: 'refreshToken2'
    },
    msg: 'success',
    code: 200
  },
  '/api/menus': {
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
            path: '/user/detail/:id',
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
  },
  '/api/userInfo': {
    data: {
      username: 'Kirk',
      phone: '18888888888'
    },
    msg: 'success',
    code: 200
  }
}
