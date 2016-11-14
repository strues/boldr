import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPageById } from 'state/selectors';

class PageBuilder extends Component {
  render() {
    return (
      <div>
      PageBuilder
      { this.props.params.name ? <h1>Editing { this.props.page.name } </h1> : <h2>New</h2> }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const pageName = ownProps.params.name;
  return {
    pages: state.boldr.pages,
    page: getPageById(state, pageName),
    loaded: state.boldr.pages.loaded,
  };
};

export default connect(mapStateToProps)(PageBuilder);

