import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import { setCollapsed } from '@/store/modules/global/globalSlice'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const CollapseIcon = () => {
  const { collapsed, themeConfig } = useAppSelector((state) => ({
    collapsed: state.global.collapsed,
    themeConfig: state.global.themeConfig
  }))
  const dispatch = useAppDispatch()
  return (
    <>
      {themeConfig.collapseIcon && (
        <div
          className="collapsed-icon"
          id="driver-collapse"
          onClick={() => {
            dispatch(setCollapsed(!collapsed))
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: '20px' }} id="isCollapse" />
          ) : (
            <MenuFoldOutlined style={{ fontSize: '20px' }} id="isCollapse" />
          )}
        </div>
      )}
    </>
  )
}
export default CollapseIcon
