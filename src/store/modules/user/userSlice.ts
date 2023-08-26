import { getUserInfo } from '@/api/user'
import { UserState } from '@/store/interface'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'

const initialState: UserState = {
  userInfo: {},
  accessToken: '',
  refreshToken: '',
  menuList: [],
  authRouter: []
}
export const userSlice = createSlice({
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
    setMenuList: (state, action: SetAction<Menu.MenuOptions[]>) => {
      state.menuList = action.payload
    },
    setAuthRouter: (state, action: SetAction<string[]>) => {
      state.authRouter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUserInfo.pending, (state) => {
      console.log(state)
    })
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

export const { setTokens, setMenuList, setAuthRouter } = userSlice.actions
export default userSlice.reducer
