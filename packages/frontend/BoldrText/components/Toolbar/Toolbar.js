/* eslint-disable complexity, react/no-array-index-key, no-return-assign */
// @flow
import React, { Component } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import cN from 'classnames';
// $FlowIssue
import type { ContentState } from 'draft-js';
import getSupportedControls from '../../core/configs/controls';
import LinkEditor from '../LinkEditor';
import HeadingPicker from '../Headings';
import TextColorPicker from '../TextColor';
import FontSizePicker from '../FontSize';
import FontFamilyPicker from '../FontFamily';
import TextAlign from '../TextAlign';
import type {
  OptionControls,
  OptionAddonControls,
  OptionMedia,
  OptionColors,
  OptionFontSize,
  OptionLanguage,
  OptionFontFamilies,
  OptionHeight,
} from '../../core/configs/options';
import MediaPicker from '../MediaPicker';

export type Props = {
  editorState: EditorState,
  contentState: ContentState,
  height: OptionHeight,
  language: OptionLanguage,
  controls: OptionControls,
  media: OptionMedia,
  addonControls: OptionAddonControls,
  colors: OptionColors,
  fontSizes: OptionFontSize,
  fontFamilies: OptionFontFamilies,
  onChange: Function,
};
export default class Toolbar extends Component<Props, *> {
  mediaPicker = null;
  videoPicker = null;
  audioPicker = null;
  props: Props;

  applyControl(command: string, type: string) {
    if (type === 'inline-style') {
      this.props.onChange(
        RichUtils.toggleInlineStyle(this.props.editorState, command.toUpperCase()),
      );
    } else if (type === 'block-type') {
      this.props.onChange(RichUtils.toggleBlockType(this.props.editorState, command));
    } else if (type === 'editor-state-method') {
      this.props.onChange(EditorState[command](this.props.editorState));
    }
  }

  applyEditorState = editorState => {
    this.props.onChange(editorState);
  };

  showMediaPicker = () => {
    this.mediaPicker.show();
  };

  getControlItemClassName(data: Object) {
    let className = 'be-toolbar__item be-button';
    const { type, command, currentBlockType, currentInlineStyle } = data;

    if (type === 'inline-style') {
      if (currentInlineStyle.has(command.toUpperCase())) {
        className += ' active';
      }
    } else if (type === 'block-type') {
      if (currentBlockType === command) {
        className += ' active';
      }
    }

    return className;
  }
  render() {
    const {
      controls,
      editorState,
      contentState,
      media,
      addonControls,
      language,
      colors,
      fontSizes,
      fontFamilies,
    } = this.props;
    const selection = editorState.getSelection();
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    const currentBlockType = contentState.getBlockForKey(selection.getStartKey()).getType();
    const supportedControls = getSupportedControls(language);
    const commonProps = { language, editorState, contentState, currentInlineStyle, selection };

    const renderedAddonControls = addonControls.map((addonControlItem, index) => {
      if (addonControlItem.type === 'split') {
        return <span key={controls.length + index} className="be-split__line" />;
      } else {
        return (
          <button
            key={this.props.controls.length + index}
            title={addonControlItem.title}
            className={cN('be-toolbar__item be-button', addonControlItem.className)}
            onClick={() => addonControlItem.onClick(editorState)}
          >
            {addonControlItem.text}
          </button>
        );
      }
    });

    return (
      <div className="be-toolbar">
        <MediaPicker
          media={media}
          ref={instance => (this.mediaPicker = instance)}
          onChange={this.applyEditorState}
          {...commonProps}
        />
        {this.props.controls.map((item, index) => {
          if (item.toLowerCase() === 'split') {
            return <span key={index} className="be-split__line" />;
          }

          const controlItem = supportedControls.find(subItem => {
            return subItem.key.toLowerCase() === item.toLowerCase();
          });

          if (!controlItem) {
            return null;
          }

          if (controlItem.type === 'headings') {
            return (
              <HeadingPicker
                key={index}
                current={currentBlockType}
                onChange={command => this.applyControl(command, 'block-type')}
                {...commonProps}
              />
            );
          } else if (controlItem.type === 'text-color') {
            return (
              <TextColorPicker
                key={index}
                colors={colors}
                onChange={this.applyEditorState}
                {...commonProps}
              />
            );
          } else if (controlItem.type === 'font-size') {
            return (
              <FontSizePicker
                key={index}
                fontSizes={fontSizes}
                defaultCaption={controlItem.title}
                onChange={this.applyEditorState}
                {...commonProps}
              />
            );
          } else if (controlItem.type === 'font-family') {
            return (
              <FontFamilyPicker
                key={index}
                fontFamilies={fontFamilies}
                defaultCaption={controlItem.title}
                onChange={this.applyEditorState}
                {...commonProps}
              />
            );
          } else if (controlItem.type === 'link') {
            return (
              <LinkEditor
                key={index}
                defaultCaption={controlItem.title}
                onChange={this.applyEditorState}
                {...commonProps}
              />
            );
          } else if (controlItem.type === 'text-align') {
            return <TextAlign key={index} onChange={this.applyEditorState} {...commonProps} />;
          } else if (controlItem.type === 'media') {
            if (!media.image && !media.video && !media.audio) {
              return null;
            }

            return (
              <button
                key={index}
                title={controlItem.title}
                className="be-toolbar__item be-button"
                onClick={this.showMediaPicker}
              >
                {controlItem.text}
              </button>
            );
          } else {
            const buttonClassName = this.getControlItemClassName({
              type: controlItem.type,
              command: controlItem.command,
              currentBlockType,
              currentInlineStyle,
            });
            return (
              <button
                key={index}
                title={controlItem.title}
                className={buttonClassName}
                onClick={() => this.applyControl(controlItem.command, controlItem.type)}
              >
                {controlItem.text}
              </button>
            );
          }
        })}
        {renderedAddonControls}
      </div>
    );
  }
}
