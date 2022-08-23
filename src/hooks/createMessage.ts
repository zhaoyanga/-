import { h, render } from 'vue'
import Message from '../components/Message.vue'
export type Messagetype = 'success' | 'error' | 'default'

const createMessage = (
  message: string,
  type: Messagetype,
  timeout?: number // 设置为可选，如果没有就一直提示
) => {
  // h函数，第一个接受dom节点或者组件，第二个参数接受props
  const messageVnode = h(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  /*
    把Vnode节点挂载到指定的dom节点上，使用render函数，
    第一个参数为Vnode，第二个参数为dom节点
   */
  render(messageVnode, mountNode)
  // 提示可能会一直存在，所以提供手动清除的事件
  const destory = () => {
    // 卸载Vnode，第一个参数为null，第二个参数为dom节点
    render(null, mountNode)
    document.body.removeChild(mountNode)
  }
  if (timeout) {
    setTimeout(() => {
      destory()
    }, timeout)
  }
  return {
    destory
  }
}

export default createMessage
