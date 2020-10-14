import HttpRequest from './HttpRequest'

export default class AuthProvider extends HttpRequest {
  login (username, password) {
    return this.post('/auth/login', {
      username,
      password
    })
  }
}
