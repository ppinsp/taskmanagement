import HttpRequest from './HttpRequest'
import { getAuthToken } from '@/assets/js/Auth'
export default class UserProvider extends HttpRequest {
  getUser (query) {
    this.setHeader(getAuthToken())
    return this.get(`/users?${query}`)
  }

  getAllDepartments (query) {
    this.setHeader(getAuthToken())
    return this.get(`/departments?${query}`)
  }

  getUserById (id) {
    this.setHeader(getAuthToken())
    return this.get(`/users/${id}`)
  }

  getTitle () {
    this.setHeader(getAuthToken())
    return this.get(`/titles`)
  }

  createUser (payload) {
    this.setHeader(getAuthToken())
    return this.post(`/users`, payload)
  }

  updateUser (id, payload) {
    this.setHeader(getAuthToken())
    return this.put(`/users/${id}`, payload)
  }

  deleteUser (id) {
    this.setHeader(getAuthToken())
    return this.delete(`/users?id=${id}`)
  }
}
