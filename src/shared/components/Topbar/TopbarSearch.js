/* eslint-disable no-return-assign */
// @flow
import React, { PureComponent } from 'react';
import cn from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import Icon from '../Icons';

const BASE_ELEMENT = StyleClasses.TOPBAR_SEARCH;

type Props = {
  active: boolean,
  placeholder: string,
  onToggle: () => void,
};
class TopbarSearch extends PureComponent {
  static defaultProps = {
    placeholder: 'Search this site...',
  };
  componentDidUpdate(prevProps: Object, prevState: ?Object) {
    if (!prevProps.active && this.props.active) {
      (this: any)._input.focus();
    }
  }
  props: Props;
  render() {
    const { active, placeholder } = this.props;
    const classes = cn(BASE_ELEMENT, {
      [`${BASE_ELEMENT}--active`]: active,
    });
    return (
      <div className={classes}>
        <input
          ref={ref => ((this: any)._input = ref)}
          className={`${BASE_ELEMENT}__input`}
          type="text"
          placeholder={placeholder}
        />

        <button
          className={`${BASE_ELEMENT}__icon ${BASE_ELEMENT}__clear`}
          onClick={this.props.onToggle}
        >
          <Icon kind="close" color="rgba(0, 0, 0, 0.87)" size={14} />
        </button>

        <button
          className={`${BASE_ELEMENT}__icon ${BASE_ELEMENT}__search`}
          onClick={this.props.onToggle}
        >
          <Icon kind="search" color="rgba(0, 0, 0, 0.87)" size={14} />
          {/* eslint-enable */}
        </button>
      </div>
    );
  }
}

export default TopbarSearch;
