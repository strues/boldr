import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import Button from './Button';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);

stories.add('Default', () => (
  <Button onClick={action('clicked')}>{text('Label', 'Example')}</Button>
));
stories.add('Primary', () => (
  <Button onClick={action('clicked')} kind="primary">
    {text('Label', 'Example')}
  </Button>
));
stories.add('Secondary', () => (
  <Button onClick={action('clicked')} kind="secondary">
    {text('Label', 'Example')}
  </Button>
));
stories.add('Danger', () => (
  <Button onClick={action('clicked')} kind="danger">
    {text('Label', 'Example')}
  </Button>
));
stories.add('Block', () => (
  <Button onClick={action('clicked')} kind="primary" block>
    {text('Label', 'Example')}
  </Button>
));
stories.add('Outline', () => (
  <Button onClick={action('clicked')} kind="secondary" outline>
    {text('Label', 'Example')}
  </Button>
));
stories.add('Small', () => (
  <Button onClick={action('clicked')} kind="primary" size="small">
    {text('Label', 'Example')}
  </Button>
));
stories.add('Large', () => (
  <Button onClick={action('clicked')} kind="primary" size="large">
    {text('Label', 'Example')}
  </Button>
));
