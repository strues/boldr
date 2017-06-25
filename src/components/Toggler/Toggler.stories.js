import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Toggler from './Toggler';

const stories = storiesOf('Toggler', module);
stories.add('default', () => <Toggler onClick={action('clicked')} iconColor="#222" />);
