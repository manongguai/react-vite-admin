import { GlobalTheme } from '@/store/interface'
import { useAppSelector } from './redux.hooks'
import { useEffect } from 'react'

export function useTheme() {
  const theme = useAppSelector((state) => state.global.themeConfig.theme)
  useEffect(() => {
    console.log(111)
  }, [theme])
}
