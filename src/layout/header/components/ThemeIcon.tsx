import IconFont from '@/components/Iconfont'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import { setTheme } from '@/store/modules/global/globalSlice'
const ThemeIcon = () => {
  const { theme, themeIcon } = useAppSelector(
    (state) => state.global.themeConfig
  )
  const dispatch = useAppDispatch()
  function themeChange() {
    dispatch(setTheme(theme == 'dark' ? 'light' : 'dark'))
  }
  return (
    <>
      {themeIcon && (
        <div className="header-icon driver-theme">
          <IconFont
            onClick={themeChange}
            style={{ fontSize: '20px' }}
            type={theme == 'dark' ? 'icon-yueliang' : 'icon-taiyang'}
          ></IconFont>
        </div>
      )}
    </>
  )
}
export default ThemeIcon
