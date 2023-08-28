import IconFont from '@/components/Iconfont'

interface PropsType {
  collapsed: boolean
}
const SliderTitle = ({ collapsed }: PropsType) => {
  return (
    <div className="sider-title">
      <IconFont className="sider-logo" type="icon-logo"></IconFont>
      {!collapsed && <span className="sider-text">React-Admin</span>}
    </div>
  )
}

export default SliderTitle
