/* eslint-disable no-param-reassign, no-unused-expressions, no-return-assign */
// @flow weak
import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import cN from 'classnames';
import ResponsiveHelper from '../../core/helpers/responsive';

export type Props = {
  caption: string,
  hoverTitle: string,
  disabled: boolean,
  showDropDownArrow: boolean,
  arrowActive: boolean,
  className?: string,
  children: ReactChildren,
  hideOnBlur: boolean,
  componentId: string,
};
type State = {
  active: boolean,
  offset: number,
};

export default class Dropdown extends Component<Props, State> {
  constructor(props: Props) {
    super();
    (this: any).componentId = props.componentId || `BE-DROPDOWN-${uniqueId()}`;
    (this: any).alive = false;
    (this: any).responsiveResolveId = null;
    (this: any).dropDownHandlerElement = null;
    (this: any).dropDownContentElement = null;
    this.state = {
      active: false,
      offset: 0,
    };
  }
  state: State;
  componentDidMount() {
    // $FlowIssue
    this.alive = true;
    this.fixDropDownPosition();
    // $FlowIssue
    document.body.addEventListener('click', event => {
      this.registerClickEvent(event);
    });
    // $FlowIssue
    this.responsiveResolveId = ResponsiveHelper.resolve(() => {
      this.fixDropDownPosition();
    });
  }

  componentWillReceiveProps(next: any) {
    if (!this.props.disabled && next.disabled) {
      this.hide();
    }
  }

  componentWillUnmount() {
    // $FlowIssue
    document.body.removeEventListener('click', (event: MouseEvent) => {
      this.registerClickEvent(event);
    });
    // $FlowIssue
    this.alive = false;
    // $FlowIssue
    ResponsiveHelper.unresolve(this.responsiveResolveId);
  }

  props: Props;

  fixDropDownPosition() {
    let offset = 0;
    // $FlowIssue
    const viewWidth = document.body.getBoundingClientRect().width;
    // $FlowIssue
    const handlerRect = this.dropDownHandlerElement.getBoundingClientRect();
    // $FlowIssue
    const contentRect = this.dropDownContentElement.getBoundingClientRect();
    let right = handlerRect.right - handlerRect.width / 2 + contentRect.width / 2;
    const left = handlerRect.left + handlerRect.width / 2 - contentRect.width / 2;

    right = viewWidth - right;

    if (right < 10) {
      offset = right - 10;
    } else if (left < 10) {
      offset = left * -1 + 10;
    }

    offset !== this.state.offset && this.setState({ offset });
  }

  registerClickEvent(event: MouseEvent) {
    const { hideOnBlur } = this.props;
    let active = false;
    // $FlowIssue
    if (event.target.dataset.beComponentId === this.componentId) {
      active = event.target.dataset.keepActive ? true : !this.state.active;
    } else if (hideOnBlur === false) {
      active = this.state.active;
    }

    this.alive && this.setState({ active });
  }

  show() {
    this.setState({
      active: true,
    });
  }

  hide() {
    this.setState({
      active: false,
    });
  }
  render() {
    let { active, offset } = this.state;
    const {
      caption,
      hoverTitle,
      disabled,
      showDropDownArrow,
      arrowActive,
      className,
      children,
    } = this.props;

    disabled && (active = false);
    const arrowClassName = cN('be-dropdown__arrow', {
      active: arrowActive,
    });
    const ddClassName = cN(
      'be-dropdown',
      {
        // eslint-disable-next-line
        active: active,
        // eslint-disable-next-line
        disabled: disabled,
      },
      className,
    );
    return (
      // $FlowIssue
      <div id={this.componentId} className={ddClassName}>
        <button
          className={cN('be-dropdown__handler')}
          title={hoverTitle}
          data-be-component-id={(this: any).componentId}
          ref={instance => ((this: any).dropDownHandlerElement = instance)}
        >
          <span className="be-dropdown__title">
            {caption}
          </span>
          {showDropDownArrow !== false && <i className={cN('icon-drop-down')} />}
        </button>
        <div
          className={cN('be-dropdown__content')}
          style={{ marginLeft: `${offset}px` }}
          ref={instance => ((this: any).dropDownContentElement = instance)}
        >
          <i style={{ marginLeft: offset * -1 }} className={arrowClassName} />
          {children}
        </div>
      </div>
    );
  }
}
