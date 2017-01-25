/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import List from 'react-md/lib/Lists/List';
import Paper from 'react-md/lib/Papers';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons';
import { Row, Col } from '../../../components';
import { selectTag, clearTag } from '../../../state/modules/blog/tags';
import type { Tag } from '../../../types/models';
import TaggedPost from './components/TaggedPost';
import TagToolbarMenu from './components/TagToolbarMenu';
import TagList from './components/TagList';

export type Props = {
  tags: Array<Tag>,
  selectTag: Function,
  currentTag: Object,
  dispatch: Function,
};

type State = {
  posts: boolean,
};

class Tags extends Component {
  constructor() {
    super();

    this.state = {
      posts: false,
    };

    (this: any).handleTagClick = this.handleTagClick.bind(this);
  }

  state: State;

  props: Props;

  handleTagClick(tag: Object) {
    this.props.dispatch(selectTag(tag));
    this.setState({
      posts: true,
    });
  }
  render() {
    const actions = [
      <TagToolbarMenu key="menu" id="tagtb" />,
    ];
    return (
      <Row>
        <Col sm={ 12 } md={ 4 }>
          <Paper zDepth={ 2 }>
            <Toolbar
              themed
              title="Tags"
              nav={ null }
              actions={ actions }
            />
            <List>
              <TagList tags={ this.props.tags } handleTagClick={ this.handleTagClick } />
            </List>
          </Paper>
        </Col>
        <Col sm={ 12 } md={ 8 }>
          {
            !this.state.posts
              ? null
              : <TaggedPost name={ this.props.currentTag.name } />
          }
        </Col>
      </Row>
    );
  }
}

export default connect()(Tags);
