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
        icon: 'AppstoreAddOutlined',
        children: [
          {
            path: '/common/icons',
            title: '图标使用',
            icon: 'AppstoreOutlined'
          },
          {
            path: '/common/tour',
            title: '漫游式引导',
            icon: 'AppstoreOutlined'
          },
          {
            path: '/common/drag',
            title: '拖拽组件',
            icon: 'AppstoreOutlined'
          }
        ]
      },
      {
        path: '/draw',
        title: '图画',
        icon: 'CalendarOutlined',
        children: [
          {
            path: '/draw/svg',
            title: 'svg画图',
            icon: 'AppstoreOutlined'
          },
          {
            path: '/draw/canvas',
            title: 'canvas画图',
            icon: 'AppstoreOutlined'
          }
        ]
      },
      {
        path: '/three',
        title: 'threeJs',
        icon: 'CalendarOutlined',
        children: [
          {
            path: '/three/car',
            title: '3D Car',
            icon: 'AppstoreOutlined'
          }
        ]
      },
      {
        path: '/user',
        title: '用户管理',
        icon: 'UserOutlined',
        children: [
          {
            path: '/user/list',
            title: '用户列表',
            icon: 'AppstoreOutlined'
          }
        ]
      },
      {
        path: '/iframe',
        title: '内嵌页面',
        icon: 'MenuOutlined',
        children: [
          {
            path: '/iframe/bing',
            title: '必应',
            icon: 'AppstoreOutlined'
          }
        ]
      },
      {
        path: '/link',
        title: '外部链接',
        icon: 'LinkOutlined',
        children: [
          {
            path: 'https://github.com/manongguai/react-vite-admin',
            title: 'GitHub',
            icon: 'AppstoreOutlined'
          },
          {
            path: 'https://gitee.com/kirk958617/react-vite-admin',
            title: 'Gitee',
            icon: 'AppstoreOutlined'
          },
          {
            path: 'https://kirk.wang/',
            title: '作者博客',
            icon: 'AppstoreOutlined'
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
      'drawCanvas',
      'threeCar'
    ],
    msg: 'success',
    code: 200
  }
}
