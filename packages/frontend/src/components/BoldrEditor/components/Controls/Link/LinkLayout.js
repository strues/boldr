/* eslint-disable react/no-unused-prop-types */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import Link from '@boldr/icons/Link';
import Unlink from '@boldr/icons/Unlink';
import Option from '../../Option';
import { stopPropagation } from '../../../utils/common';

export type Props = {
  expanded?: boolean,
  doCollapse?: Function,
  doExpand: Function,
  onExpandEvent?: Function,
  config: Object,
  onChange: Function,
  currentState: Object,
};

type State = {
  showModal: boolean,
  linkTarget: string,
  linkTitle: string,
  linkTargetOption: string,
};

class LinkLayout extends React.Component<Props, State> {
  state = {
    showModal: false,
    linkTarget: '',
    linkTitle: '',
    linkTargetOption: this.props.config.defaultTargetOption,
  };

  componentWillReceiveProps(props: Props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        showModal: false,
        linkTarget: '',
        linkTitle: '',
        linkTargetOption: this.props.config.defaultTargetOption,
      });
    }
  }

  props: Props;

  removeLink: Function = (): void => {
    const { onChange } = this.props;
    onChange('unlink');
  };

  addLink: Function = (): void => {
    const { onChange } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    onChange('link', linkTitle, linkTarget, linkTargetOption);
  };

  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  updateTarget: Function = (event: Object): void => {
    this.setState({
      linkTargetOption: event.target.checked ? '_blank' : '_self',
    });
  };

  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };

  signalExpandShowModal = () => {
    const { onExpandEvent, currentState: { link, selectionText } } = this.props;
    const { linkTargetOption } = this.state;
    onExpandEvent();
    this.setState({
      showModal: true,
      linkTarget: link && link.target,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  };

  forceExpandAndShowModal: Function = (): void => {
    const { doExpand, currentState: { link, selectionText } } = this.props;
    const { linkTargetOption } = this.state;
    doExpand();
    this.setState({
      showModal: true,
      linkTarget: link && link.target,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  };
  /*
    @todo:
    prevent user from opening link modal w/out a linkTitle or placeholder
    to avoid controlled/uncontrolled
   */
  renderAddLinkModal() {
    const { doCollapse, config: { modalClassName } } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    return (
      <div className={cn('be-modal', modalClassName)} onClick={stopPropagation}>
        <span className={cn('be-modal__label')}>Link Title</span>
        <input
          className={cn('be-modal__input')}
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTitle"
          value={linkTitle}
        />
        <span className={cn('be-modal__label')}>Link Target</span>
        <input
          className={cn('be-modal__input')}
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTarget"
          value={linkTarget}
        />
        <span className={cn('be-link__modal-opt')}>
          <input
            type="checkbox"
            defaultChecked={linkTargetOption === '_blank'}
            value="_blank"
            onChange={this.updateTarget}
          />
          <span>Open link in new window</span>
        </span>
        <div className={cn('be-modal__btns')}>
          <button
            className={cn('be-modal__btn')}
            onClick={this.addLink}
            disabled={!linkTarget || !linkTitle}>
            Add
          </button>
          <button className={cn('be-modal__btn')} onClick={doCollapse}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  render(): Node {
    const { config: { options, link, unlink, className }, expanded, currentState } = this.props;
    const { showModal } = this.state;
    return (
      <div className={cn('be-ctrl__group', className)} aria-label="be-link__control">
        {options.indexOf('link') >= 0 && (
          <Option
            value="unordered-list-item"
            className={cn(link.className)}
            onClick={this.signalExpandShowModal}
            aria-haspopup="true"
            aria-expanded={showModal}
            title={link.title}>
            <Link color="#222" size="1em" />
          </Option>
        )}
        {options.indexOf('unlink') >= 0 && (
          <Option
            disabled={!currentState.link}
            value="ordered-list-item"
            className={cn(unlink.className)}
            onClick={this.removeLink}
            title={unlink.title}>
            <Unlink fill="#222" size="1em" />
          </Option>
        )}
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }
}

export default LinkLayout;
