import 'axios'

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    notAllowCancel?: boolean
    noLoading?: boolean
  }
}
