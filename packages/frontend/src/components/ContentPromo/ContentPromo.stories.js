import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ContentPromo from './ContentPromo';

storiesOf('ContentPromo', module)
  .add('Default', () => <ContentPromo>Default ContentPromo</ContentPromo>)
  .add('isCentered', () => <ContentPromo isCentered>Centered ContentPromo</ContentPromo>)
  .add('isTiny', () => <ContentPromo isTiny>Tiny ContentPromo</ContentPromo>);
