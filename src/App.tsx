import BaseRouter from '@/router'
import AuthRouter from '@/router/authRouter'
import useTheme from '@/hooks/theme.hooks'
import { ConfigProvider } from 'antd'
import { useAppSelector } from './hooks/redux.hooks'
import AppProvider from './components/AppProvider'
import useLanguage from './hooks/language.hooks'

function App() {
  const { themeAlgorithm, componentSize, primary } = useTheme()
  const { locale } = useLanguage()
  return (
    <ConfigProvider
      locale={locale}
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
