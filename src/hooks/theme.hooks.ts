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
    const body = document.documentElement as HTMLElement
    if (!weakOrGray) body.setAttribute('style', '')
    if (weakOrGray === 'weak')
      body.setAttribute(
        'style',
        'filter: invert(80%);--primary-color:' + primary
      )
    if (weakOrGray === 'gray')
      body.setAttribute(
        'style',
        'filter: grayscale(1);--primary-color:' + primary
      )
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
