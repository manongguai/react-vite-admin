import { Dropdown, Menu } from 'antd'
import { setLanguage } from '@/store/modules/global/globalSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import IconFont from '@/components/Iconfont'
import { languageEnums } from '@/enums/languageEnum'

const LanguageIcon = (props: any) => {
  const { language, themeConfig } = useAppSelector((state) => ({
    language: state.global.language,
    themeConfig: state.global.themeConfig
  }))
  const dispatch = useAppDispatch()
  const items = [
    {
      key: '1',
      label: <span>简体中文</span>,
      onClick: () => dispatch(setLanguage(languageEnums.ZH)),
      disabled: language === languageEnums.ZH
    },
    {
      key: '2',
      label: <span>English</span>,
      onClick: () => dispatch(setLanguage(languageEnums.EN)),
      disabled: language === languageEnums.EN
    }
  ]
  return (
    <>
      {themeConfig.languageIcon && (
        <div className="header-icon" id="driver-zhongyingwen">
          <Dropdown
            menu={{
              items: items
            }}
            placement="bottom"
            trigger={['click']}
            arrow={true}
          >
            <IconFont
              {...props}
              style={{ fontSize: '18px' }}
              type="icon-zhongyingwen1"
            ></IconFont>
          </Dropdown>
        </div>
      )}
    </>
  )
}
export default LanguageIcon
