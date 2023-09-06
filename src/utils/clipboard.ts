/*
 * @Author: kirk jgbzql@163.com
 * @Date: 2023-09-06 15:25:25
 * @LastEditors: kirk jgbzql@163.com
 * @LastEditTime: 2023-09-06 15:36:00
 */
import copy from 'copy-to-clipboard'

export default function clipboard(text: string) {
  copy(text)
  window.$message.success('已复制到剪贴板')
}
