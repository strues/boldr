import { TOKEN_KEY } from '../config';
import storage from './storage';

export const parseJWT = (token) => {
  if (!token) return null
  let base64Url = token
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  let parts = base64.split('.')
  if (parts.length != 3) return null

  try {
    let [headerRaw, payloadRaw, signatureRaw] = parts

    let header = JSON.parse(atob(headerRaw))
    let payload = JSON.parse(atob(payloadRaw))
    let signature = atob(signatureRaw)
    return {
      header,
      payload,
      signature
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

export const setToken = (token) => {
    return storage.set(TOKEN_KEY, token)
}
export const getToken = (asJSON = false) => {
    let token = storage.get(TOKEN_KEY)
    if (asJSON) return parseJWT(token)
    return token
}

export const removeToken = () => {
    storage.remove(TOKEN_KEY)
}

export const getAuthHeader = () => {
    let token;
    if (isAuthenticated()) {
        let token = getToken();
        return {['Authorization']: token }
    }
    return {}
}

export const isAuthenticated = () => {
    const token = parseJWT(getToken())
    if (!token) return false

    let exp = token.payload.exp
    if (!exp) return true

    let isExpTimestamp = typeof exp === 'number'
    if (!isExpTimestamp) return false
    return Math.round(new Date().getTime() / 1000) < exp
}
