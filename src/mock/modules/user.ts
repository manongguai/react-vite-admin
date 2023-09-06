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
        icon: 'PieChartOutlined'
      },
      {
        path: '/common',
        title: '常用组件',
        children: [
          {
            path: '/common/icons',
            title: '图标使用'
          },
          {
            path: '/common/tour',
            title: '漫游式引导'
          },
          {
            path: '/common/drag',
            title: '拖拽组件'
          }
        ]
      },
      {
        path: '/draw',
        title: '图画',
        children: [
          {
            path: '/draw/svg',
            title: 'svg画图'
          },
          {
            path: '/draw/canvas',
            title: 'canvas画图'
          }
        ]
      },
      {
        path: '/user',
        title: '用户管理',
        icon: 'PieChartOutlined',
        children: [
          {
            path: '/user/list',
            title: '用户列表'
          }
        ]
      },
      {
        path: '/iframe',
        title: '内嵌页面',
        children: [
          {
            path: '/iframe/bing',
            title: '必应'
          }
        ]
      },
      {
        path: '/link',
        title: '外部链接',
        icon: 'PieChartOutlined',
        children: [
          {
            path: 'http://www.baidu.com',
            title: '百度一下',
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
  },
  '/api/authRoutes': {
    data: [
      'home',
      'userList',
      'userDetail',
      'bing',
      'commonTour',
      'commonIcons',
      'commonDrag',
      'test',
      'drawSvg',
      'drawCanvas'
    ],
    msg: 'success',
    code: 200
  }
}
