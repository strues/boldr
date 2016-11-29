import fetch from 'isomorphic-fetch';
import request from 'superagent';
// Import API endpoints
import {
  API_POSTS,
  API_AUTH,
  API_SETTINGS,
  API_PAGES,
  API_BLOCKS,
  API_NAVIGATION,
  API_TAGS,
  API_LINKS,
  API_ATTACHMENTS,
  API_ACTIVITY,
  API_TOKEN,
  API_USERS,
} from '../config';
import { getToken } from './token';

const AUTH_TOKEN = getToken();
/**
 * Converts the response from a fetch into useable JSON data.
 * @method processResponse
 * @param  {Buffer}        response the response buffer to be processed.
 * @return {Object}                 JSON response from the request.
 */
export function processResponse(response) {
  return response.json().then(json => {
    if (response.status >= 400) {
      throw new Error(json.data.message);
    }
    return json;
  });
}

export const credentials = 'same-origin';

export const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
  * POST API ROUTES
  * -------------------------
  * @exports doFetchPosts
  * @exports doGetPosts
  * @exports doCreatePost
  * @exports doSelectPost
  * @exports doDeletePost
  *****************************************************************/
export function doFetchPosts() {
  return request.get(`${API_POSTS}?include=[author,tags]`);
}

export function doGetPosts() {
  return fetch(`${API_POSTS}?include=[author,tags]`)
  .then(response => processResponse(response));
}

export function doCreatePost(data) {
  return request
    .post(`${API_POSTS}`)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`)
    .send({
      title: data.title,
      content: data.content,
      feature_image: data.feature_image,
      tags: data.tags,
      status: data.status,
      excerpt: data.excerpt,
    });
}

export function doSelectPost(postId) {
  return request
    .get(`${API_POSTS}/id/${postId}`);
}

export function doDeletePost(postId) {
  return request
    .delete(`${API_POSTS}/pid/${postId}`)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`);
}

export function doUpdatePost(postData) {
  return request
      .put(`${API_POSTS}/pid/${postData.id}`)
      .set('Authorization', `Bearer ${AUTH_TOKEN}`)
      .send({
        // title: articleData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        feature_image: postData.feature_image,
        // tag: postData.tag,
        status: postData.status,
      });
}
/**
  * AUTH API ROUTES
  * -------------------------
  * @exports doSignup
  * @exports doLogin
  * @exports doForgotPassword
  * @exports doResetPassword
  * @exports doAuthCheck
  *****************************************************************/
export const doSignup = (data) => request.post(`${API_AUTH}/signup`).send(data);

export const doLogin = (loginData) => request.post(`${API_AUTH}/login`).send(loginData);

export function doForgotPassword(email) {
  return fetch(`${API_TOKEN}/forgot-password`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
    }),
  });
}

export function doResetPassword(password, token) {
  return fetch(`${API_TOKEN}/reset-password/${token}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password,
    }),
  });
}

export function doVerifyAccount(token) {
  return fetch(`${API_AUTH}/verification/${token}`, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export const doAuthCheck = (token) => {
  return request.get(`${API_AUTH}/check`).set('Authorization', `Bearer ${AUTH_TOKEN}`);
};

/**
  * SETTINGS API ROUTES
  * -------------------------
  * @exports doUpdateSettings
  * @exports doLoadSettings
  *****************************************************************/

export function doUpdateSettings(payload) {
  const settingId = payload.id;
  const data = {
    value: payload.value,
  };
  return request.put(`${API_SETTINGS}/${settingId}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .send(data);
}

export const doLoadSettings = () => {
  return request.get(`${API_SETTINGS}`);
};

/**
  * NAVIGATION API ROUTES
  * -------------------------
  * @exports doLoadNav
  *****************************************************************/

export const doLoadNav = () => {
  return request.get(`${API_NAVIGATION}`);
};

export function doUpdateNavigationLinks(data) {
  return request.put(`${API_LINKS}/${data.id}`)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`)
    .send(data);
}

export function doAddNavigationLinks(data) {
  const payload = {
    name: data.name,
    href: data.href,
    icon: data.icon,
    position: data.position,
  };
  return request.post(`${API_LINKS}`)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`)
    .send(payload);
}

/**
  * ACTIVITIES API ROUTES
  * -------------------------
  * @exports doLoadNav
  *****************************************************************/

export function doGetActivities(data, id) {
  return request
    .get(`${API_ACTIVITY}`)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`);
}

/**
  * ATTATCHMENT API ROUTES
  * -------------------------
  * @exports doLoadNav
  *****************************************************************/

export function doFetchMedia() {
  return request
    .get(`${API_ATTACHMENTS}`);
}

export function doUpload(payload) {
  return request
    .post(`${API_ATTACHMENTS}/dashboard`, payload)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`);
}

export function doRemoveMedia(id) {
  return request
    .delete(`${API_ATTACHMENTS}/${id}`)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`);
}

/**
  * PAGES API ROUTES
  * -------------------------
  * @exports doFetchPages
  * @exports doFetchPageUrl
  * @exports doCreatePage
  *****************************************************************/

export function doFetchPages() {
  return request
    .get(`${API_PAGES}`);
}
export function doFetchPageUrl(url) {
  return request
    .get(`${API_PAGES}/${url}`);
}
export function doCreatePage(payload) {
  return request
    .post(`${API_PAGES}/dashboard`, payload)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`);
}

/**
  * TAGS API ROUTES
  * -------------------------
  * @exports doFetchTags
  *****************************************************************/

export function doFetchTags(name) {
  return fetch(`${API_TAGS}/posts/${name}`)
    .then(response => processResponse(response));
}

/**
  * MEMBERS API ROUTES
  * -------------------------
  * @exports doFetchMembers
  * @exports doUpdateMember
  *****************************************************************/
export function doFetchMembers() {
  return request
    .get(`${API_USERS}`);
}

export function doUpdateMember(userData) {
  const payload = {
    display_name: userData.display_name,
    first_name: userData.first_name,
    last_name: userData.last_name,
    avatar_url: userData.avatar_url,
    role: userData.role,
  };
  return request
    .put(`${API_USERS}/admin/${userData.id}`)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`)
    .send(payload);
}

export function doFetchBlocks() {
  return fetch(`${API_BLOCKS}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then(response => processResponse(response));
}
export function doCreateBlock(data) {
  return request
    .post(`${API_BLOCKS}`)
    .set('Authorization', `Bearer ${AUTH_TOKEN}`)
    .send({
      name: data.name,
      element: data.element,
      content: data.content,
    });
}
