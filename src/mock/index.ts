import { userMock } from './modules/user'
import Mock from 'mockjs'

function mock() {
  Object.keys(userMock).forEach((key) => {
    Mock.mock(key, userMock[key])
  })
}
// 生产环境需要更换为正式资源
if (import.meta.env.VITE_MOCK == 'true') {
  mock()
}
