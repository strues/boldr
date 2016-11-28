import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const elementSource = {
  beginDrag(props) {
    return {
      name: props.name.toLowerCase().replace(/\s/g, ''),
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      console.log(`You dropped ${item.name} into ${dropResult.name}!`);
    }
  },
};

@DragSource('Section', elementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class Element extends Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
  }

  render() {
    const { isDragging, connectDragSource, name } = this.props;
    return connectDragSource(
      <li className="Element" style={ { opacity: isDragging ? 0.5 : 1 } }>
        <span className="ElementText">{name}</span>
      </li>,
    );
  }
}

export default Element;
