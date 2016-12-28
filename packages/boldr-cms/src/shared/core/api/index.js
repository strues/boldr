import ApiClient from './apiClient';

const apiClient = new ApiClient();

/**
  * AUTH API ROUTES
  * -------------------------
  * @exports doSignup
  * @exports doLogin
  * @exports doForgotPassword
  * @exports doResetPassword
  * @exports doAuthCheck
  *****************************************************************/

export const doSignup = (data) =>
  apiClient.post('/auth/signup', { data });

export const doLogin = (data) =>
  apiClient.post('/auth/login', { data });

export const doAuthCheck = (token) =>
  apiClient.get('/auth/check');

export const doVerifyAccount = (token) =>
  apiClient.get(`/auth/verification/${token}`);

/**
  * TOKEN API ROUTES
  * -------------------------
  * @exports doForgotPassword
  * @exports doResetPassword
  *****************************************************************/
export const doForgotPassword = (email) =>
  apiClient.post('/tokens/forgot-password', { data: { email } });

export const doResetPassword = (password, token) =>
  apiClient.post(`/tokens/reset-password/${token}`, { data: { password } });


/**
  * POST API ROUTES
  * -------------------------
  * @exports getAllPosts
  * @exports getPostById
  * @exports delPostById
  * @exports createPost
  * @exports putPostId
  *****************************************************************/

export const getAllPosts = () =>
  apiClient.get('/posts?include=[author,tags]');

export const getPostById = (postId) =>
  apiClient.get(`/posts/pid/${postId}`);

export const delPostById = (postId) =>
  apiClient.del(`/posts/pid/${postId}`);

export const createPost = (data) =>
  apiClient.put('/posts', {
    title: data.title,
    content: data.content,
    feature_image: data.feature_image,
    tags: data.tags,
    status: data.status,
    excerpt: data.excerpt,
  });

export const putPostId = (postData) =>
  apiClient.put(`/posts/pid/${postData.id}`, {
    // title: articleData.title,
    content: postData.content,
    excerpt: postData.excerpt,
    feature_image: postData.feature_image,
    // tag: postData.tag,
    status: postData.status,
  });

  /**
    * SETTINGS API ROUTES
    * -------------------------
    * @exports doUpdateSettings
    * @exports doLoadSettings
    *****************************************************************/

export const doUpdateSettings = (payload) => {
  const settingId = payload.id;
  const data = {
    value: payload.value,
  };
  return apiClient.put(`/settings/${settingId}`, { data });
};

export const getAllSettings = () =>
  apiClient.get('/settings');

  /**
    * NAVIGATION API ROUTES
    * -------------------------
    * @exports getAllNavs
    * @exports doUpdateNavigationLinks
    *****************************************************************/

export const getAllNavs = () =>
  apiClient.get('/menus');

export const doUpdateMenuDetails = (data) =>
  apiClient.put(`/menu-details/${data.id}`, { data });

export const doAddNavigationLinks = (data) => {
  const payload = {
    name: data.name,
    href: data.href,
    icon: data.icon,
    position: data.position,
  };
  return apiClient.post('/menu-details', { payload });
};

  /**
    * ACTIVITIES API ROUTES
    * -------------------------
    * @exports doGetActivities
    *****************************************************************/

export const getAllActivities = () =>
  apiClient.get('/activities');

/**
  * ATTATCHMENT API ROUTES
  * -------------------------
  * @exports doLoadNav
  *****************************************************************/

export const getAllAttachments = () =>
  apiClient.get('/attachments');

export const doUpload = (payload) => {
  const data = {
    file_name: payload.file_name,
    original_name: payload.original_name,
    url: payload.url,
    s3_key: payload.s3_key,
  };

  return apiClient.post('/attachments/dashboard', { data });
};
export const delAttachment = (id) =>
  apiClient.del(`/attachments/${id}`);

  /**
    * PAGES API ROUTES
    * -------------------------
    * @exports getAllPages
    * @exports getPageByUrl
    * @exports doCreatePage
    *****************************************************************/

export const getAllPages = () =>
  apiClient.get('/pages');

export const getPageByUrl = (url) =>
  apiClient.get(`/pages/${url}`);

export const doCreatePage = (payload) =>
  apiClient.post('/pages', { payload });


  /**
    * TAGS API ROUTES
    * -------------------------
    * @exports doFetchTags
    *****************************************************************/

export const doFetchTags = (name) =>
  apiClient.get(`/tags/posts/${name}`);

export const getAllTags = () =>
  apiClient.get('/tags');
/**
  * MEMBERS API ROUTES
  * -------------------------
  * @exports getAllMembers
  * @exports doUpdateMember
  *****************************************************************/
export const getAllMembers = () =>
  apiClient.get('/users');

export const doUpdateMember = (userData) => {
  const payload = {
    display_name: userData.display_name,
    first_name: userData.first_name,
    last_name: userData.last_name,
    avatar_url: userData.avatar_url,
    role: userData.role,
  };
  apiClient.put(`/users/admin/${userData.id}`, { payload });
};

/**
  * BLOCKS API ROUTES
  * -------------------------
  * @exports getAllBlocks
  * @exports doCreateBlock
  *****************************************************************/
export const getAllBlocks = () =>
  apiClient.get('/blocks');

export const doCreateBlock = (data) => {
  apiClient
      .post('/blocks', { data });
};
