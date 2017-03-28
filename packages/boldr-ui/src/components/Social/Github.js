/* @flow */
import React from 'react';
import Icon from '../Icon';

type Props = {
  href: ?String,
  size: Number,
};

const Github = (props: Props) => {
  if (props.href) {
    return (
      <a href={props.href} target="_blank">
        <Icon kind="github" color="#1c3050" size={props.size} />
      </a>
    );
  } else {
    return <Icon kind="github" color="#1c3050" size={props.size} />;
  }
};

Github.defaultProps = {
  size: 24,
};
export default Github;
