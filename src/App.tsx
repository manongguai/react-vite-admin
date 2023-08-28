import BaseRouter from '@/router'
import AuthRouter from '@/router/authRouter'
import { useTheme } from '@/hooks/theme.hooks'
import { ConfigProvider, theme } from 'antd'
import { useAppSelector } from './hooks/redux.hooks'
import { useMemo } from 'react'

function App() {
  const { theme: currentTheme } = useAppSelector(
    (state) => state.global.themeConfig
  )
  const themeAlgorithm = useMemo(() => {
    return currentTheme == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  }, [currentTheme])
  useTheme()
  console.log(123)

  return (
    <div className="app">
      <ConfigProvider
        theme={{
          algorithm: themeAlgorithm
        }}
      >
        <AuthRouter>
          <BaseRouter />
        </AuthRouter>
      </ConfigProvider>
    </div>
  )
}
export default App
