import { normalize, arrayOf, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import { push } from 'react-router-redux';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from '../../actionTypes';
import { template as templateSchema, arrayOfTemplate } from './schema';
/**
  * FETCH TEMPLATES
  * -------------------------
  * @exports fetchTemplatesIfNeeded
  * @exports fetchTemplates
  *****************************************************************/
export function fetchTemplatesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTemplates(getState())) {
      return dispatch(fetchTemplates());
    }

    return Promise.resolve();
  };
}

export function fetchTemplates() {
  return dispatch => {
    dispatch(requestTemplates());
    return api
      .getAllTemplates()
      .then(response => {
        const camelizedJson = camelizeKeys(response.body);
        const normalizedData = normalize(camelizedJson, arrayOfTemplate);
        return dispatch(receiveTemplates(normalizedData));
      })
      .catch(err => {
        dispatch(receiveTemplatesFailed(err));
      });
  };
}

function shouldFetchTemplates(state) {
  const templates = state.boldr.templates.labels;
  if (!pages.length) {
    return true;
  }
  if (pages.length) {
    return false;
  }
  return pages;
}

const requestTemplates = () => {
  return { type: t.FETCH_TEMPLATES_REQUEST };
};
const receiveTemplates = normalizedData => ({
  type: t.FETCH_TEMPLATES_SUCCESS,
  payload: normalizedData,
});
const receiveTemplatesFailed = err => ({
  type: t.FETCH_TEMPLATES_FAILURE,
  error: err,
});

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
      .getTemplateResource(resource)
      .then(response => {
        dispatch(receiveTemplate(response));
      })
      .catch(err => {
        dispatch(receiveTemplateFailed(err));
      });
  };
}

const requestTemplate = () => {
  return { type: t.FETCH_TEMPLATE_REQUEST };
};

const receiveTemplate = response => ({
  type: t.FETCH_TEMPLATE_SUCCESS,
  payload: response.body,
});

const receiveTemplateFailed = err => ({
  type: t.FETCH_TEMPLATE_FAILURE,
  error: err,
});
