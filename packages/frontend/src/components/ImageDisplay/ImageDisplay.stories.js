import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import ImageDisplay from './ImageDisplay';

storiesOf('ImageDisplay', module).add('default', () => (
  <ImageDisplay imageSrc="http://i.magaimg.net/img/19cz.png" />
));
