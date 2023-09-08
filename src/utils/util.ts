import { languageEnums } from '@/enums/languageEnum'

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
  let browserLang = navigator.language
    ? navigator.language
    : navigator.browserLanguage
  let defaultBrowserLang
  if (
    browserLang.toLowerCase() === 'cn' ||
    browserLang.toLowerCase() === 'zh' ||
    browserLang.toLowerCase() === 'zh-cn'
  ) {
    defaultBrowserLang = languageEnums.ZH
  } else {
    defaultBrowserLang = languageEnums.EN
  }
  return defaultBrowserLang
}

export function onMove(
  callback: (event: MouseEvent) => void,
  removeCallback?: () => void
) {
  function moveEvent(event: MouseEvent) {
    if (event.buttons !== 1) {
      remove()
      return
    }
    callback(event)
  }
  window.addEventListener('mousemove', moveEvent)
  window.addEventListener('contextmenu', remove)
  window.addEventListener('mouseup', remove)
  function remove() {
    console.log('正在触发remove事件')
    window.removeEventListener('mousemove', moveEvent)
    window.removeEventListener('mouseup', remove)
    window.removeEventListener('mousemove', remove)
    removeCallback?.()
  }
  return remove
}
