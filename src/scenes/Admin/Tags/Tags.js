/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// internal
import Paper from '@boldr/ui/Paper';
import { Row, Col } from '@boldr/ui/Layout';

import TagList from './components/TagList';
import AddTag from './components/AddTag';

type Props = {
  tags: Array<Tag>,
  currentTag: Object,
  dispatch: Function,
};

type State = {
  add: boolean,
};

class Tags extends Component {
  static defaultProps = {
    tags: [],
  };
  state = {
    add: false,
  };

  state: State;

  props: Props;

  handleTagSubmit = values => {
    console.log(values);
  };
  handleAddTagClick = () => {
    this.setState({
      add: true,
    });
  };
  handleDeleteTagClick = id => {
    console.log(id);
  };
  render() {
    const { tags } = this.props;

    return (
      <div>
        <Helmet title="Admin: Tags" />
        <Row>
          <Col sm={12} md={5} lg={4}>
            <AddTag />
          </Col>
          <Col sm={12} md={7} lg={8}>
            <Paper zDepth={2}>
              <TagList tags={tags} handleDeleteTagClick={this.handleDeleteTagClick} />
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(Tags);
