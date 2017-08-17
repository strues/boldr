/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component } from 'react';
// $FlowIssue
import { Modifier, EditorState, RichUtils } from 'draft-js';
import Dropdown from '../Dropdown';
import type { OptionFontSize } from '../../core/configs/options';

export type Props = {
  defaultCaption?: string,
  editorState: EditorState,
  fontSizes: OptionFontSize,
  language: Object,
  currentInlineStyle: Object,
  onChange: Function,
  selection: any,
};

export default class FontSize extends Component<Props, *> {
  props: Props;
  toggleFontSize = e => {
    const fontSize = e.target.dataset.size;
    const toggledFontSize = `FONTSIZE-${fontSize}`;
    const { editorState, selection, currentInlineStyle, fontSizes } = this.props;
    const nextContentState = fontSizes.reduce((contentState, item) => {
      return Modifier.removeInlineStyle(contentState, selection, `FONTSIZE-${item}`);
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

    if (selection.isCollapsed()) {
      nextEditorState = currentInlineStyle.reduce((state, fontSize) => {
        return RichUtils.toggleInlineStyle(state, fontSize);
      }, nextEditorState);
    }

    if (!currentInlineStyle.has(toggledFontSize)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledFontSize);
    }

    this.props.onChange(nextEditorState);
  };
  render() {
    let caption = null;
    let currentFontSize = null;
    const { defaultCaption, currentInlineStyle, language, fontSizes } = this.props;

    fontSizes.find(item => {
      if (currentInlineStyle.has(`FONTSIZE-${item}`)) {
        caption = `${item}px`;
        currentFontSize = item;
        return true;
      }
      return false;
    });

    caption = caption || defaultCaption || language.controls.fontSize;

    return (
      <Dropdown
        caption={caption}
        hoverTitle={language.controls.fontSize}
        className={'be-toolbar__item be-dropdown be-font-size__dropdown'}
      >
        <ul className="be-font-sizes__wrap">
          {fontSizes.map((item, index) => {
            return (
              <li
                key={index}
                className={item === currentFontSize ? 'active' : null}
                data-size={item}
                onClick={this.toggleFontSize}
              >
                {`${item}px`}
              </li>
            );
          })}
        </ul>
      </Dropdown>
    );
  }
}
