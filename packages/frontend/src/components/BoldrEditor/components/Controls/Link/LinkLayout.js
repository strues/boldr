/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import classNames from 'classnames';
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
    const { doCollapse, config: { popupClassName } } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    return (
      <div
        className={classNames('boldr-editor-link__modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="boldr-editor-link__modal-label">Link Title</span>
        <input
          className="boldr-editor-link__modal-input"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTitle"
          value={linkTitle}
        />
        <span className="boldr-editor-link__modal-label">Link Target</span>
        <input
          className="boldr-editor-link__modal-input"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTarget"
          value={linkTarget}
        />
        <span className="boldr-editor-link__modal-target-option">
          <input
            type="checkbox"
            defaultChecked={linkTargetOption === '_blank'}
            value="_blank"
            onChange={this.updateTarget}
          />
          <span>Open link in new window</span>
        </span>
        <span className="boldr-editor-link__modal-button-section">
          <button
            className="boldr-editor-link__modal-btn"
            onClick={this.addLink}
            disabled={!linkTarget || !linkTitle}
          >
            Add
          </button>
          <button className="boldr-editor-link__modal-btn" onClick={doCollapse}>
            Cancel
          </button>
        </span>
      </div>
    );
  }

  renderLink(): Object {
    const { config: { options, link, unlink, className }, expanded, currentState } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className={classNames('boldr-editor-link__wrapper', className)}
        aria-label="boldr-editor-link__control"
      >
        {options.indexOf('link') >= 0 &&
          <Option
            value="unordered-list-item"
            className={classNames(link.className)}
            onClick={this.signalExpandShowModal}
            aria-haspopup="true"
            aria-expanded={showModal}
            title={link.title}
          >
            <Link color="#222" size="1em" />
          </Option>}
        {options.indexOf('unlink') >= 0 &&
          <Option
            disabled={!currentState.link}
            value="ordered-list-item"
            className={classNames(unlink.className)}
            onClick={this.removeLink}
            title={unlink.title}
          >
            <Unlink color="#222" size="1em" />
          </Option>}
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  render(): Object {
    return this.renderLink();
  }
}

export default LinkLayout;
