import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, text, boolean, number } from '@storybook/addon-knobs';
import Icon from '../Icons/Icon';
import { Menu, MenuItem } from './index';

storiesOf('Menu', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('default', () => {
    const label = 'Placement';
    const options = {
      top: 'Top',
      bottom: 'Bottom',
      right: 'Right',
      left: 'Left',
    };
    const defaultValue = 'top';

    const value = select(label, options, defaultValue);
    return (
      <Menu size="normal" placement={value}>
        <MenuItem
          icon={<Icon kind="trash" color="#222" />}
          onClick={action('Menu onClick')}
          text="Delete"
        />
        <MenuItem
          icon={<Icon kind="edit" color="#222" />}
          onClick={action('Menu onClick')}
          text="Edit"
        />
      </Menu>
    );
  });
