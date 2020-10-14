import HttpRequest from './HttpRequest'
import { getAuthToken } from '@/assets/js/Auth'
export default class UserProvider extends HttpRequest {
  getUser (query) {
    this.setHeader(getAuthToken())
    return this.get(`/users?${query}`)
  }
}
