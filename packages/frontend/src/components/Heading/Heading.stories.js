import React from 'react';
import { storiesOf } from '@storybook/react';

import Heading from './Heading';

export default storiesOf('Heading', module).add('defaults', () => (
  <div>
    <Heading type="h1" text="Heading 1" />
    <Heading type="h2" text="Heading 2" />
    <Heading type="h3" text="Heading 3" />
    <Heading type="h4" text="Heading 4" />
    <Heading type="h5" text="Heading 5" />
    <Heading type="h6" text="Heading 6" />
  </div>
));
