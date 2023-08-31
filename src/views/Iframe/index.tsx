import { useLoaderData } from 'react-router-dom'
import './index.scss'
const Iframe = () => {
  const loaderData = useLoaderData() as {
    iframeSrc?: string
  }

  if (!loaderData.iframeSrc) {
    throw new Error('请配置该路由的iframeSrc')
  }
  return (
    <iframe src={loaderData.iframeSrc} className="card full-iframe"></iframe>
  )
}

export default Iframe
