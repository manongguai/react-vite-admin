import { userMock } from './modules/user'
import Mock from 'mockjs'

function mock() {
  Object.keys(userMock).forEach((key) => {
    Mock.mock(key, userMock[key])
  })
}
mock()
