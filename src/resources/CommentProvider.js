import HttpRequest from './HttpRequest'
import { getAuthToken } from '@/utils/js/Auth'
export default class CommentProvider extends HttpRequest {
  createComment(payload) {
    this.setHeader(getAuthToken())
    return this.post(`/comment`, payload)
  }

  getComment(requirement_id) {
    this.setHeader(getAuthToken())
    return this.get(`/comment/${requirement_id}`)
  }
}