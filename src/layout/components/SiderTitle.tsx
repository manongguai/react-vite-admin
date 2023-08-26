interface PropsType {
  collapsed: boolean
}
const SliderTitle = ({ collapsed }: PropsType) => {
  return (
    <div className="demo-logo-vertical">{collapsed ? 'xx' : 'xx管理系统'}</div>
  )
}

export default SliderTitle
