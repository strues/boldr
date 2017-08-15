/* @flow */
/* eslint-disable react/no-array-index-key, react/jsx-no-bind */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addMention from '../addMention';
import { KeyDownHandler, SuggestionHandler } from '../../../eventHandlers';

class Suggestion {
  constructor(config: Object) {
    const {
      separator,
      trigger,
      getSuggestions,
      onChange,
      getEditorState,
      getWrapperRef,
      caseSensitive,
      dropdownClassName,
      optionClassName,
      modalHandler,
    } = config;
    // $FlowIssue
    this.config = {
      separator,
      trigger,
      getSuggestions,
      onChange,
      getEditorState,
      getWrapperRef,
      caseSensitive,
      dropdownClassName,
      optionClassName,
      modalHandler,
    };
  }

  findSuggestionEntities = (contentBlock, callback) => {
    if (this.config.getEditorState()) {
      const { separator, trigger, getSuggestions, getEditorState } = this.config;
      const selection = getEditorState().getSelection();
      if (
        selection.get('anchorKey') === contentBlock.get('key') &&
        selection.get('anchorKey') === selection.get('focusKey')
      ) {
        let text = contentBlock.getText();
        text = text.substr(
          0,
          selection.get('focusOffset') === text.length - 1
            ? text.length
            : selection.get('focusOffset') + 1,
        );
        let index = text.lastIndexOf(separator + trigger);
        let preText = separator + trigger;
        if ((index === undefined || index < 0) && text[0] === trigger) {
          index = 0;
          preText = trigger;
        }
        if (index >= 0) {
          const mentionText = text.substr(index + preText.length, text.length);
          const suggestionPresent = getSuggestions().some(suggestion => {
            if (suggestion.value) {
              if (this.config.caseSensitive) {
                return suggestion.value.indexOf(mentionText) >= 0;
              }
              return (
                suggestion.value.toLowerCase().indexOf(mentionText && mentionText.toLowerCase()) >=
                0
              );
            }
            return false;
          });
          if (suggestionPresent) {
            callback(index === 0 ? 0 : index + 1, text.length);
          }
        }
      }
    }
  };

  getSuggestionComponent = getSuggestionComponent.bind(this);

  getSuggestionDecorator = () => {
    return {
      strategy: this.findSuggestionEntities,
      component: this.getSuggestionComponent(),
    };
  };
}

function getSuggestionComponent() {
  return class SuggestionComponent extends Component {
    static propTypes = {
      children: PropTypes.array,
    };

    state: Object = {
      style: { left: 15 },
      activeOption: -1,
      showSuggestions: true,
    };

    componentDidMount() {
      // $FlowIssue
      const editorRect = this.config.getWrapperRef().getBoundingClientRect();
      // $FlowIssue
      const suggestionRect = this.suggestion.getBoundingClientRect();
      // $FlowIssue
      const dropdownRect = this.dropdown.getBoundingClientRect();
      let left, right, bottom;
      if (editorRect.width < suggestionRect.left - editorRect.left + dropdownRect.width) {
        right = 15;
      } else {
        left = 15;
      }
      if (editorRect.bottom < dropdownRect.bottom) {
        bottom = 0;
      }
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ style: { left, right, bottom } });
      KeyDownHandler.registerCallBack(this.onEditorKeyDown);
      SuggestionHandler.open();
      // $FlowIssue
      this.config.modalHandler.setSuggestionCallback(this.closeSuggestionDropdown);
      this.filterSuggestions(this.props);
    }

    componentWillReceiveProps(props) {
      if (this.props.children !== props.children) {
        this.filterSuggestions(props);
        this.setState({
          showSuggestions: true,
        });
      }
    }

    componentWillUnmount() {
      KeyDownHandler.deregisterCallBack(this.onEditorKeyDown);
      SuggestionHandler.close();
      // $FlowIssue
      this.config.modalHandler.removeSuggestionCallback();
    }

    onEditorKeyDown = event => {
      const { activeOption } = this.state;
      const newState = {};
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (activeOption === this.filteredSuggestions.length - 1) {
          newState.activeOption = 0;
        } else {
          newState.activeOption = activeOption + 1;
        }
      } else if (event.key === 'ArrowUp') {
        if (activeOption <= 0) {
          newState.activeOption = this.filteredSuggestions.length - 1;
        } else {
          newState.activeOption = activeOption - 1;
        }
      } else if (event.key === 'Escape') {
        newState.showSuggestions = false;
        SuggestionHandler.close();
      } else if (event.key === 'Enter') {
        this.addMention();
      }
      this.setState(newState);
    };

    onOptionMouseEnter = index => {
      this.setState({
        activeOption: index,
      });
    };

    onOptionMouseLeave = () => {
      this.setState({
        activeOption: -1,
      });
    };

    setSuggestionReference: Function = (ref: Object): void => {
      this.suggestion = ref;
    };

    setDropdownReference: Function = (ref: Object): void => {
      this.dropdown = ref;
    };

    closeSuggestionDropdown: Function = (): void => {
      this.setState({
        showSuggestions: false,
      });
    };

    filteredSuggestions = [];

    filterSuggestions = props => {
      const mentionText = props.children[0].props.text.substr(1);
      const suggestions = config.getSuggestions();
      this.filteredSuggestions =
        suggestions &&
        suggestions.filter(suggestion => {
          if (!mentionText || mentionText.length === 0) {
            return true;
          }
          if (config.caseSensitive) {
            return suggestion.value.indexOf(mentionText) >= 0;
          } else {
            return (
              suggestion.value.toLowerCase().indexOf(mentionText && mentionText.toLowerCase()) >= 0
            );
          }
        });
    };

    addMention = () => {
      const { activeOption } = this.state;
      const editorState = config.getEditorState();
      const { onChange, separator, trigger } = config;
      addMention(editorState, onChange, separator, trigger, this.filteredSuggestions[activeOption]);
    };

    render() {
      const { children } = this.props;
      const { activeOption, showSuggestions } = this.state;
      // $FlowIssue
      const { dropdownClassName, optionClassName } = this.config;
      return (
        <span
          className="boldredit-suggestion-wrapper"
          ref={this.setSuggestionReference}
          onClick={(this: any).config.modalHandler.onSuggestionClick}
          aria-haspopup="true"
          aria-label="boldredit-suggestion-popup"
        >
          <span>
            {children}
          </span>
          {showSuggestions &&
            <span
              className={classNames('boldredit-suggestion-dropdown', dropdownClassName)}
              contentEditable="false"
              style={this.state.style}
              ref={this.setDropdownReference}
            >
              {this.filteredSuggestions.map((suggestion, index) =>
                <span
                  key={index}
                  spellCheck={false}
                  onClick={this.addMention}
                  onMouseEnter={(this: any).onOptionMouseEnter.bind(this, index)}
                  onMouseLeave={(this: any).onOptionMouseLeave}
                  className={classNames('boldredit-suggestion-option', optionClassName, {
                    'boldredit-suggestion-option-active': index === activeOption,
                  })}
                >
                  {suggestion.text}
                </span>,
              )}
            </span>}
        </span>
      );
    }
  };
}

export default Suggestion;
