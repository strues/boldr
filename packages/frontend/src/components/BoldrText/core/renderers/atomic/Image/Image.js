import React from 'react';
import { List } from 'immutable';
import { EditorState } from 'draft-js';
import { setBlockData } from '../../../../utils/block';
import { selectBlock, removeBlock } from '../../../../utils/editor';
import Switch from '../../../../components/Switch';

export default class Image extends React.Component {
  state = {
    toolbarVisbile: false,
    toolbarOffset: 0,
    linkEditorVisible: false,
  };

  render() {
    const { mediaData, language } = this.props;
    const { toolbarVisbile, toolbarOffset, linkEditorVisible } = this.state;
    const blockData = this.props.block.getData();

    const float = blockData.get('float');
    let alignment = blockData.get('alignment');
    const { url, link, linkTarget, width, height } = mediaData;
    const imageStyles = {};
    let clearFix = false;

    if (float) {
      alignment = null;
    } else if (alignment === 'left') {
      imageStyles.float = 'left';
      clearFix = true;
    } else if (alignment === 'right') {
      imageStyles.float = 'right';
      clearFix = true;
    } else if (alignment === 'center') {
      imageStyles.textAlign = 'center';
    } else {
      imageStyles.float = 'left';
      clearFix = true;
    }

    return (
      <div className="be-media__embeder">
        <div
          style={imageStyles}
          className="be-embed__image"
          onMouseOver={this.showToolbar}
          onMouseLeave={this.hideToolbar}
        >
          {toolbarVisbile &&
            <div
              style={{ marginLeft: toolbarOffset }}
              ref={instance => (this.toolbarElement = instance)}
              data-float={float}
              data-alignment={alignment}
              className="be-embed__image-toolbar"
            >
              {linkEditorVisible &&
                <div onClick={this.preventDefault} className="be-embed__image-link-editor">
                  <input
                    type="text"
                    placeholder={language.linkEditor.inputPlaceHolder}
                    onKeyDown={this.setImageLink}
                    defaultValue={link}
                  />
                  <div className="be-switch__group">
                    <Switch
                      active={linkTarget === '_blank'}
                      onClick={() => this.setImageLinkTarget(linkTarget)}
                    />
                    <label>
                      {language.linkEditor.openInNewWindow}
                    </label>
                  </div>
                </div>}
              <a data-float="left" onClick={this.setImageFloat}>
                &#xe91e;
              </a>
              <a data-float="right" onClick={this.setImageFloat}>
                &#xe914;
              </a>
              <a data-alignment="left" onClick={this.setImageAlignment}>
                &#xe027;
              </a>
              <a data-alignment="center" onClick={this.setImageAlignment}>
                &#xe028;
              </a>
              <a data-alignment="right" onClick={this.setImageAlignment}>
                &#xe029;
              </a>
              <a className={link ? 'active' : ''} onClick={this.toggleLinkEditor}>
                &#xe91a;
              </a>
              <a onClick={this.removeImage}>&#xe9ac;</a>
              <i
                style={{ marginLeft: toolbarOffset * -1 }}
                className="be-embed__image-toolbar-arrow"
              />
            </div>}
          <img
            ref={instance => (this.imageElement = instance)}
            src={url}
            width={width}
            height={height}
          />
        </div>
        {clearFix && <div className="clearfix" style={{ clear: 'both' }} />}
      </div>
    );
  }

  calcToolbarOffset() {
    const viewWidth = document.body.getBoundingClientRect().width;
    const toolbarRect = this.toolbarElement.getBoundingClientRect();
    const imageRect = this.imageElement.getBoundingClientRect();
    let right = imageRect.right - imageRect.width / 2 + toolbarRect.width / 2;
    const left = imageRect.left + imageRect.width / 2 - toolbarRect.width / 2;

    right = viewWidth - right;

    if (right < 10) {
      return right - 10;
    } else if (left < 10) {
      return left * -1 + 10;
    } else {
      return 0;
    }
  }

  removeImage = e => {
    const { block, getEditorState, onChange } = this.props;
    onChange(removeBlock(getEditorState(), block));
    this.props.setEditorProp('readOnly', false);
  };

  toggleLinkEditor = () => {
    this.setState({
      linkEditorVisible: !this.state.linkEditorVisible,
    });
  };

  setImageLink = e => {
    if (e.keyCode !== 13) {
      return;
    }

    const link = e.currentTarget.value.trim();
    const { entityKey, contentState, editorState, onChange } = this.props;
    contentState.mergeEntityData(entityKey, { link });

    onChange(EditorState.push(editorState, contentState, 'change-block-data'));
    setImmediate(this.props.forceRender);
  };

  setImageLinkTarget(linkTarget) {
    const { entityKey, contentState, editorState, onChange } = this.props;
    linkTarget = linkTarget === '_blank' ? '' : '_blank';
    contentState.mergeEntityData(entityKey, { linkTarget });

    onChange(EditorState.push(editorState, contentState, 'change-block-data'));
    setImmediate(this.props.forceRender);
  }

  setImageFloat = e => {
    let { float } = e.currentTarget.dataset;
    const { block, getEditorState, contentState, onChange } = this.props;
    const blockData = block.getData();
    const lastFloat = blockData.get('float');

    if (lastFloat === float) {
      float = null;
    }

    onChange(setBlockData(selectBlock(getEditorState(), block), { float }));
    this.props.setEditorProp('readOnly', false);
  };

  setImageAlignment = e => {
    let { alignment } = e.currentTarget.dataset;
    const { block, getEditorState, contentState, onChange } = this.props;
    const blockData = block.getData();
    const lastAlignment = blockData.get('alignment');

    if (lastAlignment === alignment) {
      alignment = null;
    }

    onChange(setBlockData(selectBlock(getEditorState(), block), { alignment }));
    this.props.setEditorProp('readOnly', false);
  };

  showToolbar = () => {
    if (!this.state.toolbarVisbile) {
      this.setState(
        {
          toolbarVisbile: true,
        },
        () => {
          this.props.setEditorProp('readOnly', true);
          this.setState({
            toolbarOffset: this.calcToolbarOffset(),
          });
        },
      );
    }
  };

  hideToolbar = () => {
    this.setState(
      {
        toolbarVisbile: false,
      },
      () => {
        this.props.setEditorProp('readOnly', false);
      },
    );
  };
}
