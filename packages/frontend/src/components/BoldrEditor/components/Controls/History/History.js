/* @flow */

import * as React from 'react';
// $FlowIssue
import { EditorState } from 'draft-js';

import HistoryLayout from './HistoryLayout';

export type Props = {
  onChange: Function,
  editorState: Object,
  config: Object,
};

type State = {
  expanded: boolean,
  undoDisabled: boolean,
  redoDisabled: boolean,
};

export default class History extends React.Component<Props, State> {
  state: State = {
    expanded: false,
    undoDisabled: false,
    redoDisabled: false,
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        undoDisabled: editorState.getUndoStack().size === 0,
        redoDisabled: editorState.getRedoStack().size === 0,
      });
    }
    // modalHandler.registerCallback(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      this.setState({
        undoDisabled: properties.editorState.getUndoStack().size === 0,
        redoDisabled: properties.editorState.getRedoStack().size === 0,
      });
    }
  }

  props: Props;
  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  onChange: Function = action => {
    const { editorState, onChange } = this.props;
    const newState = EditorState[action](editorState);
    if (newState) {
      onChange(newState);
    }
  };

  render(): Object {
    const { config } = this.props;
    const { undoDisabled, redoDisabled, expanded } = this.state;
    const HistoryComponent = HistoryLayout;
    return (
      <HistoryComponent
        config={config}
        currentState={{ undoDisabled, redoDisabled }}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.onChange}
      />
    );
  }
}
