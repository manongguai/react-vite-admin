import { AxiosRequestConfig } from 'axios'
import { CommonService, RefresherService } from './index'
import Queue from 'queue'
import { ResLogin } from '@/api/user'
class Refresher {
  private static instance: Refresher
  queue: Queue
  commonService: CommonService // 用于重发的service
  refreshService: RefresherService
  constructor() {
    this.commonService = new CommonService()
    this.refreshService = new RefresherService()
    this.queue = new Queue({
      autostart: true, // 自动执行队列
      concurrency: 1 // 无并发，这样就实现了并发锁，一个refresh周期（jwt有效期）内只会发送一次refreh token
    })
    // queue监听只注册一次
    // (this.queue as any).on("success", this.successHandle);
    // (this.queue as any).on("error", this.errorHandle);
    this.queue.addEventListener('success', this.successHandle)
    this.queue.addEventListener('error', this.errorHandle)
  }
  static getInstance() {
    if (!Refresher.instance) {
      return new Refresher()
    }
    return Refresher.instance
  }
  /**
   * task 成功
   * @param taskRes
   * @param task
   */
  successHandle(e: any) {
    console.log('task success >>>>>>')
    e.detail.job.resolve(e.detail.result)
  }
  /**
   * task 失败
   * @param error
   * @param task
   */
  errorHandle(e: any) {
    console.error('task error >>>>>>', e.detail.error)
    e.detail.job.reject(e.detail.error)
  }
  /**
   * 所有收到1029响应的标准约定报文，都需要走此逻辑触发refresh token以及重发
   * @param request
   * @returns
   */
  predict(request: AxiosRequestConfig): Promise<any> {
    const task = async (): Promise<any> => {
      const token = localStorage.getItem('token') || ''
      const headerJwt = request.headers?.token || ''
      if (token && headerJwt === token) {
        await this.refreshToken()
      }
      // 1、refreshToken成功后，缓存中的jwt将会更新，
      // 2、若缓存中的jwt已被刷新，代表refresh已被其他通讯捕获并已发送成功，当前通讯才返回1029，此时直接使用新的jwt重发
      // 3、缓存中jwt被清空，代表refreshtoken已失效，所有接口直接重发，(1033特殊码对应的请求依旧返回2000，其余应该是返回1008)
      const config = JSON.parse(JSON.stringify(request))
      // 删除 之前加的signal和拦截器
      delete config.signal
      delete config.transformRequest
      delete config.transformResponse
      return this.commonService.request(config)
    }
    task.key = Symbol()
    task.resolve = (value: any) => {}
    task.reject = (value: any) => {}
    return new Promise((resolve, reject) => {
      task.resolve = resolve
      task.reject = reject
      this.queue.push(task)
    })
  }
  /**
   * refresh token 通讯
   * @returns
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken') || ''
    return this.refreshService
      .request<ResLogin>({
        url: '/refreshToken',
        method: 'POST',
        data: {
          refresh_jwt: refreshToken // refresh token所需参数，自行处理
        }
      })
      .then(({ data }) => {
        localStorage.setItem('token', data!.accessToken)
        localStorage.setItem('refreshToken', data!.refreshToken)
        return Promise.resolve()
      })
  }
}

export default Refresher
