import type { Locale } from 'antd/es/locale'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import { useEffect, useState } from 'react'
import i18n from 'i18next'
import { useAppDispatch, useAppSelector } from './redux.hooks'
import { getBrowserLang } from '@/utils/util'
import { setLanguage } from '@/store/modules/global/globalSlice'
import { languageEnums } from '@/enums/languageEnum'
// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// dayjs.locale('en')

function useLanguage() {
  const language = useAppSelector((state) => state.global.language)
  const dispatch = useAppDispatch()
  const [locale, setLocal] = useState<Locale>(zhCN)
  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == languageEnums.ZH) return setLocal(zhCN)
    if (language && language == languageEnums.EN) return setLocal(enUS)
    if (getBrowserLang() == languageEnums.ZH) return setLocal(zhCN)
    if (getBrowserLang() == languageEnums.EN) return setLocal(enUS)
  }
  useEffect(() => {
    // 全局使用国际化
    dispatch(setLanguage(language || getBrowserLang()))
    i18n.changeLanguage(language || getBrowserLang())
    setAntdLanguage()
  }, [language])

  return {
    locale
  }
}

export default useLanguage
