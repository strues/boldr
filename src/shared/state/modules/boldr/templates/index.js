import templatesReducer, { STATE_KEY } from './reducer';
import {
  fetchTemplatesIfNeeded,
  fetchTemplates,
  fetchTemplateResource,
} from './actions';
import { getTemplates } from './selectors';

export default templatesReducer;

export {
  STATE_KEY,
  fetchTemplatesIfNeeded,
  fetchTemplates,
  fetchTemplateResource,
  getTemplates,
};
