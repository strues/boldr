import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DemoEditor from './Demo';
import '../styles/boldreditor.scss';

storiesOf('Demo', module).add('story', () => <DemoEditor />);
