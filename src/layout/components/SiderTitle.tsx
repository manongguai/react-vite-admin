import IconFont from '@/components/Iconfont'
import { HOME_URL } from '@/config/config'
import { useNavigate } from 'react-router-dom'

interface PropsType {
  collapsed: boolean
}
const SliderTitle = ({ collapsed }: PropsType) => {
  const navigate = useNavigate()
  return (
    <div className="sider-title" onClick={() => navigate(HOME_URL)}>
      <IconFont className="sider-logo" type="icon-logo"></IconFont>
      {!collapsed && <span className="sider-text">React-Admin</span>}
    </div>
  )
}

export default SliderTitle
