import config from '../../../../config';
import Storage from './storage';

export const parseJWT = token => {
  if (!token) {
    return null;
  }
  const base64Url = token;
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  const parts = base64.split('.');
  if (parts.length !== 3) {
    return null;
  }

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

export const setToken = token => {
  return Storage.set(config('token.key'), token);
};
export const getToken = (asJSON = false) => {
  const token = Storage.get(config('token.key'));
  if (asJSON) {
    return parseJWT(token);
  }
  return token;
};

export const removeToken = () => {
  Storage.remove(config('token.key'));
};
