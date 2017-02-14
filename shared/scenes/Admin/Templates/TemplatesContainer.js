/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchTemplates } from '../../../state/modules/boldr/templates';
import Templates from './Templates';

export type Props = {
  templates?: Object,
  fetchTemplates: Function
};

export class TemplatesContainer extends Component {

  props: Props;
  render() {
    return (
      <div>a</div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    templates: state.boldr.templates,
  };
};
export default connect(mapStateToProps, { fetchTemplates })(TemplatesContainer);
