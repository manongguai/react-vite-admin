import screenfull from 'screenfull'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import IconFont from '@/components/Iconfont'

const Fullscreen = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)

  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) setFullScreen(true)
      else setFullScreen(false)
      return () => screenfull.off('change', () => {})
    })
  }, [])

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏 ❌')
    screenfull.toggle()
  }
  return (
    <div className="full-screen">
      <IconFont
        onClick={handleFullScreen}
        style={{ fontSize: '20px' }}
        type={fullScreen ? 'icon-quxiaoquanping' : 'icon-quanping'}
      ></IconFont>
    </div>
  )
}
export default Fullscreen
