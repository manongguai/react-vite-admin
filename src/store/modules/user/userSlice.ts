import { getUserInfo } from '@/api/user'
import { UserState } from '@/store/interface'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const initialState: UserState = {
  userInfo: {},
  accessToken: '',
  refreshToken: '',
  authMenus: [], // 所有授权的菜单
  authRouter: [] // 授权的一维路由表
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: SetAction<{
        accessToken: string
        refreshToken: string
      }>
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setLogout: (state) => {
      state.accessToken = ''
      state.refreshToken = ''
      state.userInfo = {}
      state.authMenus = state.authRouter = []
    },
    setAuthMenus: (state, action: SetAction<Menu.MenuOptions[]>) => {
      state.authMenus = action.payload
    },
    setAuthRouter: (state, action: SetAction<string[]>) => {
      state.authRouter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload!
    })
  }
})
// 创建thunk action创建函数
// 包含本身定义的用户逻辑，pending, fulfilled, rejected 4种action
export const setUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const res = await getUserInfo()
  return res.data
})

export const { setTokens, setAuthMenus, setAuthRouter, setLogout } =
  userSlice.actions
export default userSlice.reducer
