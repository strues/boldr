import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Block from './Block';

storiesOf('Block', module).add('default', () => (
  <Block>
    This is a block. Literally just a padded white area.
  </Block>
));
