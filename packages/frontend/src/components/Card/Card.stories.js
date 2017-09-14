import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Button from '../Button';
import Media from '../Media';
import Card, { CardActions, CardTitle, CardText } from './index';

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('default', () => {
    return (
      <Card className="md-block-centered" style={{ maxWidth: 600 }}>
        <Media>
          <img src="http://i.magaimg.net/img/19cz.png" alt="an alt tag" role="presentation" />
        </Media>
        <CardTitle
          title={text('Title', 'Example Card')}
          subtitle={text('Subtitle', 'Subtitle Text')}
        />
        <CardActions expander>
          <Button kind="primary" onClick={action('Click button')} outline>
            Read More
          </Button>
        </CardActions>
        <CardText expandable={boolean('Expandable', true)}>
          {text('Text', 'Text in the card body.')}
        </CardText>
      </Card>
    );
  });
