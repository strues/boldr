/* eslint-disable react/prefer-stateless-function, react/no-array-index-key */
// @flow
import React, { Component } from 'react';
import cN from 'classnames';

type Props = {
  active: boolean,
  onClick: Function,
  className: string,
};

export default class Switch extends Component<Props, *> {
  props: Props;
  handleClick = () => {
    this.props.onClick();
  };
  render() {
    const { active, className } = this.props;
    const switchClassName = cN('be-switch__button', className, { active: active });
    return (
      <div onClick={this.handleClick} className={switchClassName}>
        <span />
      </div>
    );
  }
}
