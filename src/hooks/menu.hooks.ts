import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux.hooks'
import { setBreadcrumbs } from '@/store/modules/breadcrumb/breadcrumbSlice'
import { findAllBreadcrumb } from '@/utils/system'
import { setAuthMenus } from '@/store/modules/user/userSlice'
import { getMenus } from '@/api/user'

const useMenu = () => {
  const { accessToken } = useAppSelector((store) => store.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    getMenuData()
  }, [accessToken])

  async function getMenuData() {
    let data: Menu.MenuOptions[] = []
    try {
      const res = await getMenus()
      data = res.data!
    } catch (error) {
      console.log(error)
    }
    const homeRoute = data?.find((t) => t.path === '/home')
    // if (!homeRoute) {
    //   data?.unshift({
    //     path: '/home',
    //     name: '首页',
    //     icon: 'PieChartOutlined',
    //     code: 'home',
    //     type: 1,
    //     parentId: '0',
    //     id: '1'
    //   })
    // }
    dispatch(setBreadcrumbs(findAllBreadcrumb(data)))
    dispatch(setAuthMenus(data))
  }
}

export default useMenu
