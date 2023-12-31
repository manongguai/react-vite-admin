import screenfull from 'screenfull'
import { useEffect, useState } from 'react'
import IconFont from '@/components/Iconfont'
import { message } from 'antd'
import { useAppSelector } from '@/hooks/redux.hooks'

const Fullscreen = () => {
  const themeConfig = useAppSelector((state) => state.global.themeConfig)
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)
  const [messageApi, contextHolder] = message.useMessage()
  function change() {
    setFullScreen(screenfull.isFullscreen)
  }
  useEffect(() => {
    screenfull.isEnabled && screenfull.on('change', change)
    return () => {
      screenfull.isEnabled && screenfull.off('change', change)
    }
  }, [])

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) messageApi.warning('当前您的浏览器不支持全屏 ❌')
    screenfull.toggle()
  }
  return (
    <>
      {contextHolder}
      {themeConfig.fullScreenIcon && (
        <div className="header-icon" id="driver-screen">
          <IconFont
            onClick={handleFullScreen}
            style={{ fontSize: '20px' }}
            type={fullScreen ? 'icon-quxiaoquanping' : 'icon-quanping'}
          ></IconFont>
        </div>
      )}
    </>
  )
}
export default Fullscreen
