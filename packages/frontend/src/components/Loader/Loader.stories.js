import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import Loader from './Loader';

storiesOf('Loader', module).add('default', () => <Loader />);
