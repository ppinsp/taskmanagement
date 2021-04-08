import HttpRequest from './HttpRequest'
import { getAuthToken } from '@/utils/js/Auth'
export default class ChatProvider extends HttpRequest {
  getChat() {
    this.setHeader(getAuthToken())
    return this.get(`/chat`)
  }

  createChat(payload) {
    this.setHeader(getAuthToken())
    return this.post(`/chat`, payload)
  }
}