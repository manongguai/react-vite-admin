import useTheme from '@/hooks/theme.hooks'
import { ConfigProvider } from 'antd'
import AppProvider from './components/AppProvider'
import useLanguage from './hooks/language.hooks'
import { RouterProvider } from 'react-router-dom'
import browserRouter from '@/router'

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
          <RouterProvider router={browserRouter} />
        </div>
      </AppProvider>
    </ConfigProvider>
  )
}
export default App
