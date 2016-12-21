/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import Avatar from 'material-ui/Avatar';
import TagIcon from 'material-ui/svg-icons/maps/local-offer';
import Chip from 'material-ui/Chip';

const Tag = (props: { name: string }) => {
  return (
  <Link to={ `/blog/tags/${props.name}` }>
    <Chip>
        <Avatar icon={ <TagIcon /> } />
          { props.name }
      </Chip>
  </Link>);
};

export default Tag;
