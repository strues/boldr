/* @flow */
import React from 'react';
import {format} from 'date-fns';
import Icon from '@boldr/ui/Icons/Icon';

type Props = {
  created: Date,
};

const ArticleDate = (props: Props) => {
  return (
    <div className="boldr-post__date">
      <Icon kind="calendar" color="#222" />
      {' '}
      {format(props.created, 'MM/DD/YYYY')}
    </div>
  );
};

export default ArticleDate;
