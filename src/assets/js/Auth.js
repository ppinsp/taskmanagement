import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

const storageKey = 'AccessToken'

const getAuth = () => {
  const auth = Cookies.getJSON(storageKey)
  return auth
}

const getAuthDecode = () => {
  const auth = Cookies.getJSON(storageKey)
  return auth ? jwtDecode(auth) : null
}

const setAuthUser = (token, expire) => {
  Cookies.set(storageKey, token, {
    expires: new Date(expire),
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })
  return getAuth()
}

const clearAuth = () => {
  Cookies.remove(storageKey)
}

const getAuthToken = () => {
  let token = {}
  if (Cookies.getJSON(storageKey)) {
    token = {
      key: 'Authorization',
      value: `Bearer ${Cookies.getJSON(storageKey)}`
    }
  }
  return token
}

export default {
  setAuthUser,
  getAuth,
  getAuthToken,
  clearAuth,
  getAuthDecode
}

export {
  setAuthUser,
  getAuth,
  getAuthToken,
  clearAuth,
  getAuthDecode
}