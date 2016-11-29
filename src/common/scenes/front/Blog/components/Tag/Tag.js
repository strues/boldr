/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import { Icon, Label } from 'semantic-ui-react';

const Tag = (props: { name: string }) => {
  return (
  <Link to={ `/blog/tags/${props.name}` }>
    <Label image>
        <Icon name="tag" />
          { props.name }
      </Label>
  </Link>);
};

export default Tag;
