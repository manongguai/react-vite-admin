import { useTheme } from '@/hooks/theme.hooks'
import {
  GlobalLanguage,
  GlobalState,
  GlobalTheme,
  WeakOrGray
} from '@/store/interface'
import { createSlice } from '@reduxjs/toolkit'
import { theme } from 'antd'
const initialState: GlobalState = {
  collapsed: false,
  language: 'zh-CN',
  // 是否展示
  themeConfig: {
    languageIcon: true,
    collapseIcon: true,
    theme: 'light',
    primary: '#1890ff',
    breadcrumb: true,
    tabs: true,
    footer: true,
    weakOrGray: null,
    themeAlgorithm: theme.defaultAlgorithm
  }
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // 配置
    setCollapsed: (state, action: SetAction<boolean>) => {
      state.collapsed = action.payload
    },
    setTheme: (state, action: SetAction<GlobalTheme>) => {
      state.themeConfig.theme = action.payload
      state.themeConfig.themeAlgorithm =
        action.payload == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
    },
    setWeakOrGray: (state, action: SetAction<WeakOrGray>) => {
      state.themeConfig.weakOrGray = action.payload
    },
    setPrimary: (state, action: SetAction<string>) => {
      state.themeConfig.primary = action.payload
    },
    setLanguage: (state, action: SetAction<GlobalLanguage>) => {
      state.language = action.payload
    },
    // 布局
    setFooterVisible: (state, action: SetAction<boolean>) => {
      state.themeConfig.footer = action.payload
    },
    setLanguageVisible: (state, action: SetAction<boolean>) => {
      state.themeConfig.languageIcon = action.payload
    },
    setCollapsedVisible: (state, action: SetAction<boolean>) => {
      state.themeConfig.collapseIcon = action.payload
    },
    setBreadcrumbVisible: (state, action: SetAction<boolean>) => {
      state.themeConfig.breadcrumb = action.payload
    },
    setTabsVisible: (state, action: SetAction<boolean>) => {
      state.themeConfig.tabs = action.payload
    }
  }
})
export const {
  setCollapsed,
  setWeakOrGray,
  setTheme,
  setBreadcrumbVisible,
  setTabsVisible,
  setPrimary,
  setLanguage,
  setFooterVisible,
  setLanguageVisible,
  setCollapsedVisible
} = globalSlice.actions
export default globalSlice.reducer
