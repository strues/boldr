/* @flow */
import React, { Component } from 'react';
import classNames from 'classnames';
import * as Controls from '../../components/Controls';

export default class Toolbar extends Component {
  render() {
    return (
      <div
        className={classNames('boldrui-editor-toolbar', this.props.toolbarClassName)}
        style={this.props.toolbarStyle}
        onMouseDown={this.props.preventDefault}
        aria-label="boldrui-editor-toolbar"
        aria-hidden={(!this.props.editorFocused && this.props.toolbarOnFocus).toString()}
        onFocus={this.props.onToolbarFocus}
      >
        {this.props.toolbar.options.map((opt, index) => {
          const Control = Controls[opt];
          const config = this.props.toolbar[opt];
          if (opt === 'image' && uploadCallback) {
            config.uploadCallback = uploadCallback;
          }
          return <Control key={index} {...this.props.controlProps} config={config} />;
        })}
        {toolbarCustomButtons &&
          toolbarCustomButtons.map((button, index) =>
            React.cloneElement(button, {
              key: index,
              ...this.props.controlProps,
            }),
          )}
      </div>
    );
  }
}
