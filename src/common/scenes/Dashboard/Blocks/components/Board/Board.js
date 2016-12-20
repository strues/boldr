import React from 'react';
import { DropTarget } from 'react-dnd';

const dropTarget = {
  drop(props, monitor/* , component*/) {
    const section = monitor.getItem().name;
    props.onDrop(section);
    return {
      name: 'Board',
    };
  },
};

export type Props = {
  connectDropTarget?: Function,
  // isOver: React.PropTypes.bool.isRequired,
  // canDrop: React.PropTypes.bool.isRequired,
  children?: Array<React.Element>,
};

@DropTarget('Section', dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
class Board extends React.Component {
  props: Props;
  render() {
    const { connectDropTarget } = this.props;
    return (connectDropTarget(
      <div className="Board">{this.props.children}</div>,
    ));
  }
}

export default Board;
