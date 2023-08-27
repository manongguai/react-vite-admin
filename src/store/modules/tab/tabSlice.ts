import { HOME_URL } from '@/config/config'
import { TabState } from '@/store/interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TabState = {
  tabActive: HOME_URL,
  tabList: []
}
const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTabActive: (state, action: SetAction<string>) => {
      state.tabActive = action.payload
    },
    setTabList: (state, action: SetAction<Menu.MenuOptions[]>) => {
      state.tabList = action.payload
    }
  }
})

export const { setTabActive, setTabList } = tabSlice.actions

export default tabSlice.reducer
