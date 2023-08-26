import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// 样式初始化
import 'normalize.css'
import '@/assets/styles/global.scss'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from '@/store'
import '@/mock'
import { PersistGate } from 'redux-persist/integration/react'
import { ConfigProvider } from 'antd'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ConfigProvider
            theme={{
              algorithm: store.getState().global.themeConfig.themeAlgorithm
            }}
          >
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
