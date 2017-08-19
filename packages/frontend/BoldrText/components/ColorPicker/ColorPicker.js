/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component } from 'react';

type Props = {
  onChange: string => string,
  colors: Array<Object>,
  current: number,
};

export default class ColorPicker extends Component<Props, any> {
  props: Props;
  handleChange = e => {
    this.props.onChange(e.currentTarget.dataset.color);
  };
  render() {
    const { current, colors } = this.props;

    return (
      <ul className="be-colorpicker">
        {colors.map((item, index) => {
          const className =
            index === current ? 'be-colorpicker__item--active' : 'be-colorpicker__item';
          return (
            <li
              key={index}
              title={item}
              className={className}
              style={{ color: item }}
              data-index={index}
              data-color={item.replace('#', '')}
              onClick={this.handleChange}
            />
          );
        })}
      </ul>
    );
  }
}
