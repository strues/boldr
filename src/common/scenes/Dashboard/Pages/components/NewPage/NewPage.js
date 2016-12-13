import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageForm from '../PageForm';

export class NewPage extends Component {

  render() {
    return (
      <div>
        <PageForm />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};

export default connect(mapStateToProps)(NewPage);
