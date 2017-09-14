import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../Button';
import { Input, Control, FormField } from '../Form';
import { Level, LevelItem, LevelRight, LevelLeft } from './index';

storiesOf('Level', module).add('default', () => (
  <Level>
    <LevelLeft>
      <LevelItem>
        <strong>123</strong> posts
      </LevelItem>
      <LevelItem>
        <FormField hasAddons>
          <Control>
            <Input placeholder="Find a post" />
          </Control>
          <Control>
            <Button>Search</Button>
          </Control>
        </FormField>
      </LevelItem>
    </LevelLeft>
    <LevelRight>
      <LevelItem>
        <strong>All</strong>
      </LevelItem>
      <LevelItem>
        <a>Published</a>
      </LevelItem>
      <LevelItem>
        <a>Draft</a>
      </LevelItem>
      <LevelItem>
        <a>Deleted</a>
      </LevelItem>
      <LevelItem>
        <Button kind="success">New</Button>
      </LevelItem>
    </LevelRight>
  </Level>
));
