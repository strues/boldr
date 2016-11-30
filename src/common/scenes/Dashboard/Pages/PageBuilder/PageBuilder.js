/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPageByLabel } from 'state/selectors';
import PageForm from '../components/PageForm';
import { createPage } from './reducer';

type Props = {
  params: Object,
  label: String,
  handleSubmit: Function,
  dispatch: Function,
};

class PageBuilder extends Component {
  constructor(props) {
    super(props);

    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }
  props: Props;

  handleSubmit(values) {
    this.props.createPage(values);
  }

  render() {
    return (
      <div>
        PageBuilder
        {
          this.props.params.label ? <h1>Editing { this.props.params.label }</h1> : <h2>New</h2>
        }

        <PageForm onSubmit={ this.handleSubmit } />
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

export default connect(mapStateToProps, { createPage })(PageBuilder);
