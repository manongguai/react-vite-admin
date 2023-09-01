import React from 'react'
import ReactDOM from 'react-dom/client'
// 样式初始化
import 'normalize.css'
import '@/styles/index.scss'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from '@/store'
import '@/language'
import '@/mock'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
