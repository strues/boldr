/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Loader from '@boldr/ui/Loader';
// internal
import Paper from '@boldr/ui/Paper';
import { Row, Col } from '@boldr/ui/Layout';

import TagList from './components/TagList';
import AddTag from './components/AddTag';

type Props = {
  data: Data,
  currentTag: Object,
  dispatch: Function,
};

type State = {
  add: boolean,
};

type Data = {
  getTags: Array<Tag>,
  loading: boolean,
};
class Tags extends Component {
  static defaultProps = {
    data: {
      getTags: [],
    },
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
    const { loading, getTags } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <Helmet title="Admin: Tags" />
        <Row>
          <Col sm={12} md={5} lg={4}>
            <AddTag />
          </Col>
          <Col sm={12} md={7} lg={8}>
            <Paper zDepth={2}>
              <TagList tags={getTags} handleDeleteTagClick={this.handleDeleteTagClick} />
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(Tags);
