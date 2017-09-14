import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Alert from './Alert';

storiesOf('Alert', module)
  .add('Default', () => (
    <Alert type="info" onClose={action('onClose')} closable>
      Default Alert
    </Alert>
  ))
  .add('Warning', () => (
    <Alert type="warning" onClose={action('onClose')} closable>
      Warning Alert
    </Alert>
  ))
  .add('Danger', () => (
    <Alert type="danger" onClose={action('onClose')} closable>
      Default Alert
    </Alert>
  ))
  .add('Error', () => (
    <Alert type="error" onClose={action('onClose')} closable>
      Default Alert
    </Alert>
  ));
