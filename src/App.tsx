import BaseRouter from '@/router'
import AuthRouter from '@/router/authRouter'
import { useTheme } from '@/hooks/theme.hooks'
import { ConfigProvider, theme } from 'antd'
import { useAppSelector } from './hooks/redux.hooks'
import { useMemo } from 'react'
import AppProvider from './components/AppProvider'

function App() {
  const {
    theme: currentTheme,
    primary,
    componentSize
  } = useAppSelector((state) => state.global.themeConfig)
  const themeAlgorithm = useMemo(() => {
    return currentTheme == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  }, [currentTheme])
  useTheme()
  return (
    <ConfigProvider
      componentSize={componentSize}
      theme={{
        algorithm: themeAlgorithm,
        token: {
          colorPrimary: primary
        }
      }}
    >
      {/* 提供带有上下文的全局消息api */}
      <AppProvider>
        <div className="app">
          <AuthRouter>
            <BaseRouter />
          </AuthRouter>
        </div>
      </AppProvider>
    </ConfigProvider>
  )
}
export default App
