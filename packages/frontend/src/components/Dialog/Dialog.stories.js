import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import Dialog from './index';

storiesOf('Dialog', module).add('Default', () => (
  <Dialog visible onClose={action('clicked close')} title="Dialog!">
    <p>This is the dialog</p>
    <p>Isnt it cool</p>
  </Dialog>
));
