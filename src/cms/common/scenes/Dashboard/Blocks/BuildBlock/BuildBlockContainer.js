import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Sections from './components/Sections';
import SectionsStore from './components/Sections/SectionsStore';
import Board from './components/Board';
import BoardStore from './components/Board/BoardStore'
import MainMenu from './components/MainMenu';
import './style.css';

@DragDropContext(HTML5Backend)
class BuildBlockContainer extends Component {
  constructor(props) {
    super(props)
    this.state = BoardStore.getState()
  }

  onChangeSection = (arrIndex, e) => {
    e.preventDefault()
    const { sections } = this.state
    sections[arrIndex].data[e.target.name] = e.target.value
    this.setState({ sections })
  }

  onClickSaveSection = (arrIndex, e) => {
    e.preventDefault()
    const { sections } = this.state
    sections[arrIndex].edit = !sections[arrIndex].edit
    this.setState({ sections })
  }

  onCickDeleteSection = (arrIndex, e) => {
    e.preventDefault()
    const sections = this.state.sections.filter((s, i) => i !== arrIndex)
    this.setState({ sections })
  }

  onDropSectionOnBoard = (section) => {
    this.setState({
      sections: [...this.state.sections, { ...SectionsStore.get(section) }],
    })
  }

  onDropSection = (dragIndex, hoverIndex) => {
    const { sections } = this.state
    const dragSection = sections[dragIndex]

    this.setState(update(this.state, {
      sections: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragSection],
        ],
      },
    }))
  }
  render() {
    const sections = this.state.sections.map((section, i) => (
      <Sections
        arrIndex={i} {...section}
        onChange={this.onChangeSection}
        onClickDelete={this.onCickDeleteSection}
        onClickSave={this.onClickSaveSection}
        onDropSection={this.onDropSection}
        type={section.type} key={i}
      />),
    )
    return (
      <div>
        <MainMenu />
        <div className="Container">
          <Board onDrop={this.onDropSectionOnBoard}>{sections}</Board>
          <pre className="BoardJSON">{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    build: state.build
  }
}
export default connect(mapStateToProps)(BuildBlockContainer);
