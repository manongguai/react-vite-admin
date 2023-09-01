import { GlobalTheme } from '@/store/interface'
import { useAppSelector } from './redux.hooks'
import { CSSProperties, useEffect, useMemo } from 'react'
import { theme as antTheme } from 'antd'
export default function useTheme() {
  const { weakOrGray, theme, primary, componentSize } = useAppSelector(
    (state) => state.global.themeConfig
  )
  useEffect(() => {
    console.log(
      'useTheme----------------------------------------------------------------'
    )
    const html = document.documentElement as HTMLElement
    const body = document.body
    if (!weakOrGray) html.setAttribute('style', '')
    if (weakOrGray === 'weak')
      html.setAttribute('style', 'filter: invert(80%);')
    if (weakOrGray === 'gray')
      html.setAttribute('style', 'filter: grayscale(1);')
    body.setAttribute('style', ' --primary-color:' + primary)
    document
      .querySelector('html')!
      .setAttribute('data-theme', theme == 'dark' ? 'dark' : '')
  }, [theme, weakOrGray, primary])

  // ant主题
  const themeAlgorithm = useMemo(() => {
    return theme == 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm
  }, [theme])

  return {
    themeAlgorithm,
    componentSize,
    primary
  }
}
