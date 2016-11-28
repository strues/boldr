import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDndContext from 'core/utils/dndContext';
import update from 'immutability-helper';
import Sections from './components/Sections';
import SectionsStore from './components/Sections/SectionsStore';
import Board from './components/Board';
import BoardStore from './components/Board/BoardStore';
import Catalog from './components/Catalog';
import './style.css';

class BuildBlockContainer extends Component {
  static childContextTypes = {
    dragDropManager: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = BoardStore.getState();
  }

  getChildContext() {
    return {
      dragDropManager: getDndContext(),
    };
  }
  onChangeSection = (arrIndex, e) => {
    e.preventDefault();
    const { sections } = this.state;
    sections[arrIndex].data[e.target.name] = e.target.value;
    this.setState({ sections });
  }

  onClickSaveSection = (arrIndex, e) => {
    e.preventDefault();
    const { sections } = this.state;
    sections[arrIndex].edit = !sections[arrIndex].edit;
    this.setState({ sections });
  }

  onCickDeleteSection = (arrIndex, e) => {
    e.preventDefault();
    const sections = this.state.sections.filter((s, i) => i !== arrIndex);
    this.setState({ sections });
  }

  onDropSectionOnBoard = (section) => {
    this.setState({
      sections: [...this.state.sections, { ...SectionsStore.get(section) }],
    });
  }

  onDropSection = (dragIndex, hoverIndex) => {
    const { sections } = this.state;
    const dragSection = sections[dragIndex];

    this.setState(update(this.state, {
      sections: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragSection],
        ],
      },
    }));
  }
  render() {
    const sections = this.state.sections.map((section, i) => (
      <Sections
        arrIndex={ i } { ...section }
        onChange={ this.onChangeSection }
        onClickDelete={ this.onCickDeleteSection }
        onClickSave={ this.onClickSaveSection }
        onDropSection={ this.onDropSection }
        type={ section.type } key={ i }
      />),
    );
    return (
      <div>
        <Catalog />
        <div className="Container">
          <Board onDrop={ this.onDropSectionOnBoard }>{sections}</Board>
          <pre className="BoardJSON">{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    build: state.build,
  };
};
export default connect(mapStateToProps)(BuildBlockContainer);
