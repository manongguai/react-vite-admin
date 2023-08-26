import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { isFunction } from '@/utils/is/index'
import qs from 'qs'

// * 声明一个 Map 用于存储每个请求的标识 和 取消函数
export let pendingMap = new Map<string, AbortController>()

// * 序列化参数
export const getPendingUrl = (
  config: AxiosRequestConfig | InternalAxiosRequestConfig
) =>
  [
    config.method,
    config.url,
    qs.stringify(config.data),
    qs.stringify(config.params)
  ].join('&')

export class AxiosCanceler {
  /**
   * @description: 添加请求
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    // * 在请求开始前，对之前的请求做检查取消操作
    this.removePending(config, true) // 阻止连续请求会造成多组件请求时，报错，酌情处理
    const url = getPendingUrl(config)
    if (!config.signal) {
      const controller = new AbortController()
      config.signal = controller.signal
      if (!pendingMap.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pendingMap.set(url, controller)
      }
    }
  }
  /**
   * @description: 移除请求
   * @param {Object} config
   * @param {boolean} cancelFlag  // 是否同时取消请求
   */
  removePending(config: AxiosRequestConfig, cancelFlag = false) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      if (cancelFlag) {
        const controller = pendingMap.get(url)
        controller && controller.abort()
      }
      pendingMap.delete(url)
    }
  }
  /**
   * @description: 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach((controller) => {
      controller &&
        controller.abort &&
        isFunction(controller.abort) &&
        controller.abort()
    })
    pendingMap.clear()
  }
  /**
   * @description: 重置
   */
  reset(): void {
    pendingMap = new Map<string, AbortController>()
  }
}
