import { BreadcrumbState } from '@/store/interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: BreadcrumbState = {
  breadcrumbs: {}
}
const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: initialState,
  reducers: {
    setBreadcrumbs: (state, action: SetAction<Record<string, any>>) => {
      state.breadcrumbs = action.payload
    }
  }
})
export const { setBreadcrumbs } = breadcrumbSlice.actions
export default breadcrumbSlice.reducer
