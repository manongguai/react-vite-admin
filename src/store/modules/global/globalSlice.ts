import { GlobalState } from '@/store/interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: GlobalState = {
  collapsed: false,
  language: 'zh-CN',
  themeConfig: {
    theme: 'default',
    primary: '#1890ff',
    breadcrumb: true,
    tabs: true,
    footer: true
  }
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCollapsed: (state, action: SetAction<boolean>) => {
      state.collapsed = action.payload
    }
  }
})
export const { setCollapsed } = globalSlice.actions
export default globalSlice.reducer
