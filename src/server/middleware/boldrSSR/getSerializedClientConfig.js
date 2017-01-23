import serialize from 'serialize-javascript';
import config from '../../../../config';
import filterObject from '../../../shared/core/utils/filterObject';

// Filter the config down to the properties that are allowed to be included
// in the HTML response.
const clientConfig = filterObject(
  config,
  // These are the rules used to filter the config.
  config.clientConfigFilter,
);

const serializedClientConfig = serialize(clientConfig);

export default () => serializedClientConfig;
