/* @flow */
// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import CREATE_CONTENT_TYPE_MUTATION from '../gql/createContentType.graphql';
import CreateContentType from './CreateContentType';
// $FlowIssue
const withMutation = graphql(CREATE_CONTENT_TYPE_MUTATION, {
  props: ({ mutate }) => ({
    addContentType: payload =>
      mutate({
        variables: {
          input: {
            ...payload,
          },
        },
      }),
  }),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: values => {
    const payload = {
      name: values.name,
      slug: values.name,
      description: values.description,
      icon: values.icon,
    };
    ownProps.addContentType(payload);
  },
});
// $FlowIssue
export default withMutation(connect(null, mapDispatchToProps)(CreateContentType));
