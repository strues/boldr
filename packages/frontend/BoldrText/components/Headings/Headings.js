/* eslint-disable react/prefer-stateless-function, react/no-array-index-key */
// @flow
import React, { Component } from 'react';
import { getHeadings } from '../../core/configs/maps';
import Dropdown from '../Dropdown';

type Props = {
  onChange: Function,
  language: Object,
  current: any,
};

export default class Headings extends Component<Props, *> {
  props: Props;
  render() {
    const { current, onChange, language } = this.props;
    const headings = getHeadings(language);

    const currentHeadingIndex = headings.findIndex(item => item.command === current);
    const caption = headings[currentHeadingIndex]
      ? headings[currentHeadingIndex].title
      : language.controls.normal;
    const isFirstItemActive = currentHeadingIndex === 0;

    return (
      <Dropdown
        caption={caption}
        hoverTitle={language.controls.headings}
        arrowActive={isFirstItemActive}
        className={'be-toolbar__item be-dropdown be-headings__dropdown'}
      >
        <ul className="be-dropdown__menu">
          {headings.map((item, index) => {
            const isActive = current === item.command;
            return (
              <li
                key={index}
                className={`be-dropdown__menu-item${isActive ? ' active' : ''}`}
                onClick={() => onChange(item.command, item.type)}
              >
                {item.text}
              </li>
            );
          })}
        </ul>
      </Dropdown>
    );
  }
}
