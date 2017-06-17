/* @flow */
import React from 'react';
import Icon from '../Icons';

type Props = {
  href: ?String,
  size: Number,
};

const Facebook = (props: Props) => {
  if (props.href) {
    return (
      <a href={props.href} target="_blank">
        <Icon kind="facebook" color="#1c3050" size={props.size} />
      </a>
    );
  } else {
    return <Icon kind="facebook" color="#1c3050" size={props.size} />;
  }
};

Facebook.defaultProps = {
  size: 24,
};
export default Facebook;
