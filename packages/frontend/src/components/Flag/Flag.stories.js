import React from 'react';
import { storiesOf } from '@storybook/react';
import Flag from './Flag';

storiesOf('Flag', module).add('Default', () => (
  <Flag
    asset={() => (
      <img src="https://unsplash.it/1200/700?image=1063" alt="Foo Bar" width={600} height={400} />
    )}>
    Contents of the Flag which should be vertically centered.
  </Flag>
));
