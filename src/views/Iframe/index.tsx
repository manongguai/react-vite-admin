import { routes } from '@/router'
import { searchRoute } from '@/utils/system'
import { useLocation } from 'react-router-dom'
import './index.scss'
const Iframe = () => {
  const { pathname } = useLocation()
  const route = searchRoute(pathname, routes)
  if (!route.meta?.iframeSrc) {
    throw new Error('请配置该路由的iframeSrc')
  }
  const iframeSrc = route.meta?.iframeSrc

  return <iframe src={iframeSrc} className="card full-iframe"></iframe>
}

export default Iframe
