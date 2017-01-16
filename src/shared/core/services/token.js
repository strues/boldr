import { TOKEN_KEY } from '../constants';
import Storage from './storage';

export const parseJWT = (token) => {
  if (!token) return null;
  const base64Url = token;
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  const parts = base64.split('.');
  if (parts.length !== 3) return null;

  try {
    const [headerRaw, payloadRaw, signatureRaw] = parts;

    const header = JSON.parse(atob(headerRaw));
    const payload = JSON.parse(atob(payloadRaw));
    const signature = atob(signatureRaw);
    return {
      header,
      payload,
      signature,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setToken = (token) => {
  return Storage.set(TOKEN_KEY, token);
};
export const getToken = (asJSON = false) => {
  const token = Storage.get(TOKEN_KEY);
  if (asJSON) return parseJWT(token);
  return token;
};

export const removeToken = () => {
  Storage.remove(TOKEN_KEY);
};

export const getAuthHeader = () => {
  let token;
  if (isAuthenticated()) {
    const token = getToken();
    return { ['Authorization']: `Bearer ${token}` };
  }
  return {};
};

export const isAuthenticated = () => {
  const token = parseJWT(getToken());
  if (!token) return false;

  const exp = token.payload.exp;
  if (!exp) return true;

  const isExpTimestamp = typeof exp === 'number';
  if (!isExpTimestamp) return false;
  return Math.round(new Date().getTime() / 1000) < exp;
};
