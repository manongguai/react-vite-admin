import { userMock } from './modules/user'
import Mock from 'mockjs'

function mock() {
  Object.keys(userMock).forEach((key) => {
    Mock.mock(key, userMock[key])
  })
}
if (process.env.NODE_ENV === 'development') {
  mock()
}
