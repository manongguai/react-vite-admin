import { GlobalTheme } from '@/store/interface'
import dark from './dark'
import light from './light'
let stop: any = null
export default function initBackground(theme: GlobalTheme) {
  if (stop) {
    stop()
  }
  stop = theme == 'dark' ? dark() : light()
  return stop
}
