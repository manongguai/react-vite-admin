import { Dropdown, Menu } from 'antd'
import { setLanguage } from '@/store/modules/global/globalSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'
import IconFont from '@/components/Iconfont'
import { languageEnums } from '@/enums/languageEnum'

const Language = (props: any) => {
  const language = useAppSelector((state) => state.global.language)
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
    <div className="language-icon">
      <Dropdown
        menu={{
          items: items
        }}
        placement="bottom"
        trigger={['click']}
        arrow={true}
      >
        <IconFont style={{ fontSize: '20px' }} type="icon-Frame"></IconFont>
      </Dropdown>
    </div>
  )
}
export default Language
