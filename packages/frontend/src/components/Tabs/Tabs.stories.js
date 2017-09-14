import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import Tabs from './Tabs';

const TabPane = Tabs.TabPane;

storiesOf('Tabs', module)
  .addDecorator(centered)
  .add('default', () => (
    <Tabs defaultActiveKey="1" onChange={action('onChange')}>
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  ));
