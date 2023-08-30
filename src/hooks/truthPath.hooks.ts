import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function useTruthPath() {
  const params = useParams()
  const { pathname } = useLocation()
  const truthPath = useMemo(() => {
    let keys = Object.keys(params)
    if (!keys.length) {
      return pathname
    }
    let arr = pathname.split('/')
    arr = arr.slice(0, arr.length - keys.length)
    return arr.join('/')
  }, [pathname, params])
  return {
    truthPath
  }
}
