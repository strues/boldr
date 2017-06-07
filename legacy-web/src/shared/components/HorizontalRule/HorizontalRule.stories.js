import React from 'react';
import { storiesOf } from '@kadira/storybook';
import HorizontalRule from './HorizontalRule';

storiesOf('HorizontalRule', module)
  .add('default', () => <HorizontalRule />)
  .add('palette', () => <HorizontalRule palette="primary" />)
  .add('palette reverse', () => <HorizontalRule palette="primary" reverse />);
