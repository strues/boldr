/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import { stopPropagation } from '../../../utils/common';
import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';

export type Props = {
  expanded?: boolean,
  doExpand?: Function,
  doCollapse?: Function,
  onExpandEvent?: Function,
  config?: Object,
  onChange?: Function,
  currentState?: Object,
};
class LinkLayout extends Component {
  state: Object = {
    showModal: false,
    linkTarget: '',
    linkTitle: '',
    linkTargetOption: this.props.config.defaultTargetOption,
  };

  componentWillReceiveProps(props) {
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

  renderAddLinkModal() {
    const { config: { popupClassName }, doCollapse } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    return (
      <div
        className={classNames('boldrui-editor__link-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="boldrui-editor__link-modal-label">Link Title</span>
        <input
          className="boldrui-editor__link-modal-input"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTitle"
          value={linkTitle}
        />
        <span className="boldrui-editor__link-modal-label">Link Target</span>
        <input
          className="boldrui-editor__link-modal-input"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTarget"
          value={linkTarget}
        />
        <span className="boldrui-editor__link-modal-target-option">
          <input
            type="checkbox"
            defaultChecked={linkTargetOption === '_blank'}
            value="_blank"
            onChange={this.updateTarget}
          />
          <span>Open link in new window</span>
        </span>
        <span className="boldrui-editor__link-modal-buttonsection">
          <button
            className="boldrui-editor__link-modal-btn"
            onClick={this.addLink}
            disabled={!linkTarget || !linkTitle}
          >
            Add
          </button>
          <button className="boldrui-editor__link-modal-btn" onClick={doCollapse}>
            Cancel
          </button>
        </span>
      </div>
    );
  }

  renderInFlatList(): Object {
    const { config: { options, link, unlink, className }, currentState, expanded } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className={classNames('boldrui-editor__link-wrapper', className)}
        aria-label="boldrui-editor__link-control"
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
            <Icon kind="link" color="#222" />
          </Option>}
        {options.indexOf('unlink') >= 0 &&
          <Option
            disabled={!currentState.link}
            value="ordered-list-item"
            className={classNames(unlink.className)}
            onClick={this.removeLink}
            title={unlink.title}
          >
            <Icon kind="unlink" color="#222" />
          </Option>}
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  renderInDropDown(): Object {
    const {
      expanded,
      onExpandEvent,
      doCollapse,
      doExpand,
      onChange,
      config,
      currentState,
    } = this.props;
    const { options, link, unlink, className, dropdownClassName, title } = config;
    const { showModal } = this.state;
    return (
      <div
        className="boldrui-editor__link-wrapper"
        aria-haspopup="true"
        aria-label="boldrui-editor__link-control"
        aria-expanded={expanded}
        title={title}
      >
        <Dropdown
          className={classNames('boldrui-editor__link-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded && !showModal}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          <img src={getFirstIcon(config)} alt="" />
          {options.indexOf('link') >= 0 &&
            <DropdownOption
              onClick={this.forceExpandAndShowModal}
              className={classNames('boldrui-editor__link-dropdownoption', link.className)}
              title={link.title}
            >
              <Icon kind="link" color="#222" />
            </DropdownOption>}
          {options.indexOf('unlink') >= 0 &&
            <DropdownOption
              onClick={this.removeLink}
              disabled={!currentState.link}
              className={classNames('boldrui-editor__link-dropdownoption', unlink.className)}
              title={unlink.title}
            >
              <Icon kind="unlink" color="#222" />
            </DropdownOption>}
        </Dropdown>
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  render(): Object {
    const { config: { inDropdown } } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

export default LinkLayout;
