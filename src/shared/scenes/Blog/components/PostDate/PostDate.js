/* @flow */
import React from 'react';
import format from 'date-fns/format';
import { Icon } from 'boldr-ui';

type Props = {
  created: Date,
};

const PostDate = (props: Props) => {
  return (
    <div className="boldr-post__date">
      <Icon kind="calendar" color="#222" /> {format(props.created, 'MM/DD/YYYY')}
    </div>
  );
};

export default PostDate;
