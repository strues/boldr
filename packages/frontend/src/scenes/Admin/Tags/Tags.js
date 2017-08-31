/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// internal
import Paper from '@boldr/ui/Paper';
import { Row, Col } from '@boldr/ui/Layout';
import type { TagsType } from '../../../types/boldr';
import TagList from './components/TagList';
import AddTag from './components/AddTag';

type Props = {
  tags: TagsType,
};

class Tags extends React.Component<Props, *> {
  static defaultProps = {
    tags: [],
  };

  props: Props;

  handleTagSubmit = values => {
    console.log(values);
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
