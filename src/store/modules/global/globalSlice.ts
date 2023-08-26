import { useTheme } from '@/hooks/theme.hooks'
import { GlobalState, GlobalTheme } from '@/store/interface'
import { createSlice } from '@reduxjs/toolkit'
import { theme } from 'antd'
const initialState: GlobalState = {
  collapsed: false,
  language: 'zh-CN',
  themeConfig: {
    theme: 'light',
    primary: '#1890ff',
    breadcrumb: true,
    tabs: true,
    footer: true,
    themeAlgorithm: theme.defaultAlgorithm
  }
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCollapsed: (state, action: SetAction<boolean>) => {
      state.collapsed = action.payload
    },
    setTheme: (state, action: SetAction<GlobalTheme>) => {
      state.themeConfig.theme = action.payload
      state.themeConfig.themeAlgorithm =
        action.payload == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
    }
  }
})
export const { setCollapsed } = globalSlice.actions
export default globalSlice.reducer
