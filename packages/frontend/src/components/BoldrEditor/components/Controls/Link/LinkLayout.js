/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Link from '@boldr/icons/Link';
import Unlink from '@boldr/icons/Unlink';
import Modal from '@boldr/ui/Modal';
import Option from '../../Option';

export type Props = {
  expanded?: boolean,
  doCollapse?: Function,
  onExpandEvent?: Function,
  config: Object,
  onChange: Function,
  currentState: Object,
};
class LinkLayout extends Component {
  state: Object = {
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

  /*
    @todo:
    prevent user from opening link modal w/out a linkTitle or placeholder
    to avoid controlled/uncontrolled
   */
  renderAddLinkModal() {
    const { doCollapse } = this.props;
    const { linkTitle, linkTarget, linkTargetOption, showModal } = this.state;
    return (
      <Modal title="Add Link" isVisible={showModal} onClose={this.hideModal} closeable>
        <div className="boldredit-link__modal">
          <span className="boldredit-link__modal-label">Link Title</span>
          <input
            className="boldredit-link__modal-input"
            onChange={this.updateValue}
            onBlur={this.updateValue}
            name="linkTitle"
            value={linkTitle}
          />
          <span className="boldredit-link__modal-label">Link Target</span>
          <input
            className="boldredit-link__modal-input"
            onChange={this.updateValue}
            onBlur={this.updateValue}
            name="linkTarget"
            value={linkTarget}
          />
          <span className="boldredit-link__modal-target-option">
            <input
              type="checkbox"
              defaultChecked={linkTargetOption === '_blank'}
              value="_blank"
              onChange={this.updateTarget}
            />
            <span>Open link in new window</span>
          </span>
          <span className="boldredit-link__modal-buttonsection">
            <button
              className="boldredit-link__modal-btn"
              onClick={this.addLink}
              disabled={!linkTarget || !linkTitle}
            >
              Add
            </button>
            <button className="boldredit-link__modal-btn" onClick={doCollapse}>
              Cancel
            </button>
          </span>
        </div>
      </Modal>
    );
  }

  renderLink(): Object {
    const { config: { options, link, unlink, className }, currentState } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className={classNames('boldredit-link__wrapper', className)}
        aria-label="boldredit-link__control"
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
        {showModal ? this.renderAddLinkModal() : null}
      </div>
    );
  }

  render(): Object {
    return this.renderLink();
  }
}

export default LinkLayout;
