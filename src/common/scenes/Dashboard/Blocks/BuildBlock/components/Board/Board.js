import React from 'react';
import { DropTarget } from 'react-dnd';

const dropTarget = {
  drop(props, monitor/* , component*/) {
    const section = monitor.getItem().name;
    props.onDrop(section);
    return {
      name: 'Board',
    }
  },
}

@DropTarget('Section', dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
class Board extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    // isOver: React.PropTypes.bool.isRequired,
    // canDrop: React.PropTypes.bool.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  }

  render() {
    const { connectDropTarget } = this.props;
    return (connectDropTarget(
      <div className="Board">{this.props.children}</div>,
    ))
  }
}

export default Board;
