/* @flow */
import React from 'react';
import Icon from '../Icon';

type Props = {
  href: ?String,
  size: Number,
};

const LinkedIn = (props: Props) => {
  if (props.href) {
    return (
      <a href={props.href} target="_blank">
        <Icon kind="linkedin" color="#1c3050" size={props.size} />
      </a>
    );
  } else {
    return <Icon kind="linkedin" color="#1c3050" size={props.size} />;
  }
};

LinkedIn.defaultProps = {
  size: 24,
};
export default LinkedIn;
