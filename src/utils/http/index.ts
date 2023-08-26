import NProgress from '@/config/nprogress'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { AxiosCanceler, pendingMap } from './helper/axiosCancel'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading
} from '@/config/serviceLoading'
import { ResultEnum } from '@/enums/httpEnum'
import { message } from 'antd'
import { ResultData } from './interface'
import Refresher from './refresher'
import store from '@/store'
import { setTokens } from '@/store/modules/user/userSlice'

const defaultConfig = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: '/api',
  // 设置超时时间（10s）
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true
}
const axiosCanceler = new AxiosCanceler()
// 基类，无拦截器
export class HttpService {
  service: AxiosInstance
  constructor(config: AxiosRequestConfig = {}) {
    this.service = axios.create({
      ...defaultConfig,
      ...config
    })
    this.useRequestInterceptors()
    this.useResponseInterceptors()
  }
  useRequestInterceptors() {}
  useResponseInterceptors() {}
  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
  request<T>(request: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.service.request(request)
  }
}
export class CommonService extends HttpService {
  useRequestInterceptors() {
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        NProgress.start()
        // * 将当前请求添加到 pending 中
        config.headers!.notAllowCancel || axiosCanceler.addPending(config)
        // * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
        config.headers!.noLoading || showFullScreenLoading()
        const token: string = store.getState().user.accessToken
        config.headers['token'] = token // token,需要改成store
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }
  useResponseInterceptors() {
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response
        NProgress.done()
        // * 在请求结束后，移除本次请求(关闭loading)
        axiosCanceler.removePending(config)
        tryHideFullScreenLoading()
        // * 登录失效（code == 599）
        if (data.code === ResultEnum.OVERDUE) {
          const token: string = store.getState().user.accessToken
          if (!token) {
            store.dispatch(
              setTokens({
                accessToken: '',
                refreshToken: ''
              })
            )
            window.location.href = '/login'
            message.error('请登录')
            return Promise.resolve()
          }
          const refresher = Refresher.getInstance()
          return refresher.predict(response.config)
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg)
          return Promise.reject(data)
        }
        return Promise.resolve(data)
      },
      (error: AxiosError) => {
        console.log('axiosError:=======>:' + JSON.stringify(error))
        NProgress.done()
        tryHideFullScreenLoading()
        if (error.config) {
          axiosCanceler.removePending(error.config)
        }
        if (error.code != 'ERR_CANCELED') {
          message.error(error.message)
        }
        return Promise.reject(error)
      }
    )
  }
}
export class RefresherService extends HttpService {
  useRequestInterceptors() {
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token: string = store.getState().user.accessToken
        config.headers['token'] = token // token,需要改成store
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }
  useResponseInterceptors() {
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          store.dispatch(
            setTokens({
              accessToken: '',
              refreshToken: ''
            })
          )
          message.error('登录失效，请重新登陆')
          window.location.href = '/login'
          return Promise.resolve()
        }
        return Promise.resolve(data)
      },
      (error: AxiosError) => {
        store.dispatch(
          setTokens({
            accessToken: '',
            refreshToken: ''
          })
        )
        message.error(error.message)
        window.location.href = '/login'
        return Promise.reject(error)
      }
    )
  }
}
const commonService = new CommonService()
export default commonService
