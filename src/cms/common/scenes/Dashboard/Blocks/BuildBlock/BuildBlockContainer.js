import React, { Component } from 'react';
import { connect } from 'react-redux';

class BuildBlockContainer extends Component {

  render() {
    return (
      <div>
        Blocks
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
