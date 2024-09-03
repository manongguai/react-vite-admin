import { NavigateFunction, useNavigate } from 'react-router-dom'

// 导出一个导航函数
export let navigate: NavigateFunction | null

export const NavigationSetter = () => {
  navigate = useNavigate()
  return null
}
