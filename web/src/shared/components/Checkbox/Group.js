/* @flow */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import type { ReactChildren } from '../../types/react.js.flow';

function findIndex(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }

  return -1;
}

type Props = {
  value: Array<Object>,
  isValueEqual: () => void,
  onChange: () => void,
  className: string,
  style: Object,
  prefix: string,
  disabled: boolean,
  readOnly: boolean,
  children: ReactChildren,
};
export default class Group extends PureComponent {
  static defaultProps = {
    value: [],
    prefix: 'boldrui',
    className: '',
    style: {},
    onChange() {},
    isValueEqual(a, b) {
      return a === b;
    },
  };

  onCheckboxChange = e => {
    const changedValue = e.target.value;
    const groupValue = this.props.value.slice();
    const { isValueEqual } = this.props;
    const index = findIndex(groupValue, val => isValueEqual(val, changedValue));

    if (index !== -1) {
      groupValue.splice(index, 1);
    } else {
      groupValue.push(changedValue);
    }

    this.props.onChange(groupValue);
  };
  props: Props;
  render() {
    const { className, prefix, style, isValueEqual, value } = this.props;
    const children = React.Children.map(this.props.children, checkbox => {
      if (checkbox && checkbox.props) {
        return React.cloneElement(checkbox, {
          ...checkbox.props,
          onChange: this.onCheckboxChange,
          checked: findIndex(value, val =>
            isValueEqual(val, checkbox.props.value),
          ) !== -1,
          disabled: checkbox.props.disabled !== void 0
            ? checkbox.props.disabled
            : this.props.disabled,
          readOnly: checkbox.props.readOnly !== void 0
            ? checkbox.props.readOnly
            : this.props.readOnly,
        });
      }
    });

    const classString = classNames({
      [`${prefix}-checkbox-group`]: true,
      [className]: !!className,
    });

    return <div className={classString} style={style}>{children}</div>;
  }
}
