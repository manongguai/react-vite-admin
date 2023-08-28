interface PropsType {
  collapsed: boolean
}
const SliderTitle = ({ collapsed }: PropsType) => {
  return <div className="sider-logo">{collapsed ? 'xx' : 'xx管理系统'}</div>
}

export default SliderTitle
