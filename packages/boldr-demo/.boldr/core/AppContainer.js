import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import getRoutes from '../../src/routes';

export const AppContainer = ({ headHtml }) =>
  <div style={{ height: '100%' }}>
    <Helmet {...headHtml} />

    {getRoutes()}

  </div>;

AppContainer.propTypes = {
  headHtml: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default AppContainer;
