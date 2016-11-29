import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

const sectionSource = {
  beginDrag(props) {
    return {
      index: props.arrIndex,
    };
  },
};

const sectionTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.arrIndex;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.onDropSection(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

@DropTarget('SectionsOnBoard', sectionTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource('SectionsOnBoard', sectionSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class Sections extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired,
  }

  render() {
    const {
      type,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    let section;

    if (type === '1') {
      section = <Section1 { ...this.props } />;
    }
    if (type === '2') {
      section = <Section2 { ...this.props } />;
    }
    if (type === '3') {
      section = <Section3 { ...this.props } />;
    }

    return connectDragSource(connectDropTarget(
      <div className="Section">
        {section}
      </div>
    ));
  }
}

export default Sections;
