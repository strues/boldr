/* @flow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import type { Node } from 'react';
import omit from 'lodash/omit';
import mergeClassNames from 'classnames';
import FontIcon from '../FontIcon';

export type CollapsibleProps = {
  // The children to conditionally render.
  children: Array<Node>,
  // When `true`, the contents are rendered.
  isOpen: boolean,
  // The title of the Collapsible
  title: string,
  // When passed, a trash icon will be rendered beside the
  // toggle icon within the header.
  onDelete: () => void,
  // An optional ID which the anchor will link to and the
  // wrapper will inherit.
  id: ?string,
  // A handler which gets called once the component gets toggled,
  // will receive the new isOpen state as the first and only argument.
  onToggle: () => void,
  // optional css class name
  className: string,
};
class Collapsible extends React.PureComponent<CollapsibleProps, *> {
  static defaultProps = {
    isOpen: false,
    title: 'Unnamed',
  };

  state = {
    isOpen: this.props.isOpen,
    isContentsAlreadyRendered: this.props.isOpen,
  };
  props: CollapsibleProps;
  handleToggleChildren = (e: SyntheticEvent<>) => {
    const { onToggle } = this.props;
    const isOpen = !this.state.isOpen;

    e.preventDefault();

    this.setState(
      {
        isOpen,
        isContentsAlreadyRendered: true,
      },
      () => {
        if (onToggle) {
          onToggle(isOpen);
        }
      },
    );
  };

  renderContents = () => {
    const { children } = this.props;
    const { isContentsAlreadyRendered, isOpen } = this.state;

    if (isOpen || isContentsAlreadyRendered) {
      return children;
    }

    return null;
  };

  render() {
    const { title, onDelete, className, id, ...restProps } = this.props;
    const rest = omit(restProps, ['isOpen', 'onToggle']);
    const { isOpen } = this.state;
    const wrapperClassName = mergeClassNames({
      'boldr-collapsible__wrapper': true,
      [className]: className && className.length,
    });
    const togglerClassName = mergeClassNames({
      'boldr-collapsible__toggler': true,
      'boldr-collapsible__toggler-active': isOpen,
    });
    const contentsClassName = mergeClassNames({
      'boldr-collapsible__contents': true,
      'boldr-collapsible__contents-active': isOpen,
    });
    const anchorProps = {};

    if (id && id.length) {
      anchorProps.href = `#${id}`;
    }

    return (
      <div {...rest} id={id} className={wrapperClassName}>
        <a {...anchorProps} className={togglerClassName} onClick={this.handleToggleChildren}>
          {title}

          {onDelete ? (
            <FontIcon
              onClick={onDelete}
              value={'delete_forever'}
              className="boldr-collapsible__toggler-icon__delete"
            />
          ) : null}
          <FontIcon
            value={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            className="boldr-collapsible__toggler-icon"
          />
        </a>
        <div className={contentsClassName}>{this.renderContents()}</div>
      </div>
    );
  }
}

export default Collapsible;
