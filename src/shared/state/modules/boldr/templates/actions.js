import { normalize, arrayOf, schema } from 'normalizr';
import { push } from 'react-router-redux';
import api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { sendNotification } from '../../notifications/notifications';
import * as t from '../constants';
import { template as templateSchema, arrayOfTemplate } from './schema';
/**
  * FETCH TEMPLATES
  * -------------------------
  * @exports fetchTemplatesIfNeeded
  * @exports fetchTemplates
  *****************************************************************/

/* istanbul ignore next */
export const fetchTemplatesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchTemplates(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchTemplates(axios));
  }

  /* istanbul ignore next */
  return null;
};

export const fetchTemplates = (axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({ type: t.FETCH_TEMPLATES_REQUEST });

  return axios
    .get('/api/v1/templates')
    .then(res => {
      const tmpls = res.data.results;
      const normalizedTemplates = normalize(tmpls, arrayOfTemplate);

      dispatch({
        type: t.FETCH_TEMPLATES_SUCCESS,
        payload: normalizedTemplates,
      });
    })
    .catch(err => {
      dispatch({
        type: t.FETCH_TEMPLATES_FAILURE,
        error: err,
      });
    });
};

function shouldFetchTemplates(state) {
  const templates = state.boldr.templates.labels;
  if (!pages.length) {
    return true;
  }

  return false;
}

/**
  * FETCH TEMPLATE
  * -------------------------
  * @exports fetchTemplateResource
  *****************************************************************/
export function fetchTemplateResource(resource) {
  return dispatch => {
    dispatch(requestTemplate());
    if (resource === undefined) {
      resource = 'home';
    }
    return api
      .get(`/api/v1/templates/${resource}`)
      .then(res => {
        dispatch(receiveTemplate(res));
      })
      .catch(err => {
        dispatch(receiveTemplateFailed(err));
      });
  };
}

const requestTemplate = () => {
  return { type: t.FETCH_TEMPLATE_REQUEST };
};

const receiveTemplate = res => ({
  type: t.FETCH_TEMPLATE_SUCCESS,
  payload: res.data,
});

const receiveTemplateFailed = err => ({
  type: t.FETCH_TEMPLATE_FAILURE,
  error: err,
});
