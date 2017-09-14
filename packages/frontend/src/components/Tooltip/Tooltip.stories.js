import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import Tooltip from './Tooltip';

storiesOf('Tooltip', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Tooltip
      content="Tooltip appears on hover"
      onClickOutside={action('clicked')}
      onShow={function noRefCheck() {}}
      shouldCloseOnClickOutside
      theme="light"
      placement="left">
      <div>Mouseover to see Tooltip</div>
    </Tooltip>
  ));
