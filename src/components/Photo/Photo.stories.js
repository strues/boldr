import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs';
import Button from 'react-md/lib/Buttons';
import Photo from './Photo';

const stories = storiesOf('Photo', module);

stories.addDecorator(withKnobs);

stories.add('default', () =>
  <Photo
    onClick={action('clicked')}
    src={`http://placehold.it/${number('Width', 300)}x${number('Height', 200)}`}
    alt="A placeholder image"
    overlay={text('Overlay', 'Subscribe')}
    cta={<Button primary flat>Call to Action</Button>}
  />,
);
