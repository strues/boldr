import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Label from './Label';

storiesOf('Label', module)
  .add('default', () => <Label label="Hello" />)
  .add('required', () => <Label label="Hello" required />);
