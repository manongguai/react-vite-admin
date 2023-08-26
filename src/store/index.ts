import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import user from './modules/user/userSlice'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
}
export const rootReducer = combineReducers({
  user
})
const myPersistReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: myPersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export const persistor = persistStore(store)
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
