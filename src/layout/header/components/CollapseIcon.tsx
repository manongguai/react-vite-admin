import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import { setCollapsed } from '@/store/modules/global/globalSlice'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const CollapseIcon = () => {
  const collapsed = useAppSelector((state) => state.global.collapsed)
  const dispatch = useAppDispatch()
  return (
    <div
      className="collapsed-icon"
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
  )
}
export default CollapseIcon
