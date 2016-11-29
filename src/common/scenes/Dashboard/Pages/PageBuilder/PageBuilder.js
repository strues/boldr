/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPageByLabel } from 'state/selectors';
import PageForm from '../components/PageForm';

type Props = {
  params: Object,
  label: String
};

class PageBuilder extends Component {
  props: Props;
  render() {
    return (
      <div>
      PageBuilder
      {
        this.props.params.label ? <h1>Editing { this.props.params.label }</h1> : <h2>New</h2>
      }

      <PageForm />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const pageLabel = ownProps.params.label;
  return {
    pages: state.boldr.pages,
    page: getPageByLabel(state, pageLabel),
    loaded: state.boldr.pages.loaded,
  };
};

export default connect(mapStateToProps)(PageBuilder);
