// import config from '../../../../config';
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
    const expiredToken = isTokenExpired(payload.exp);

    // If the token is expired, remove it.
    // this forces the user to login again.
    if (expiredToken === true) {
      Storage.remove('jwt');
      return null;
    }
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

function isTokenExpired(exp) {
  const date = new Date(0);
  const expirationDate = date.setUTCSeconds(exp);

  return expirationDate < new Date();
}

export const setToken = token => {
  return Storage.set('jwt', token);
};

export const getToken = (asJSON = false) => {
  const token = Storage.get('jwt');
  if (asJSON) {
    return parseJWT(token);
  }
  return token;
};

export const removeToken = () => {
  Storage.remove('jwt');
};
