import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import Icon from '../Icons/Icon';
import Tag from './Tag';

storiesOf('Tag', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Tag id="tag1" removable={false}>
      Your Tag
    </Tag>
  ))
  .add('Removable', () => <Tag id="tag2">Tag removable</Tag>)
  .add('Large', () => (
    <Tag id="tag3" size="large">
      LARGE!
    </Tag>
  ))
  .add('Thumbnail', () => (
    <Tag id="tag4" size="large" thumb={<Icon kind="account-card" color="#333" />}>
      Large with Thumb
    </Tag>
  ));
