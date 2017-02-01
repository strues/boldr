/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import List from 'react-md/lib/Lists/List';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';
import Paper from 'react-md/lib/Papers';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons';
import { Row, Col } from '../../../components';
import { selectTag, clearTag, createTag, deleteTag } from '../../../state/modules/blog/tags';
import type { Tag } from '../../../types/models';
import TaggedPost from './components/TaggedPost';

import TagList from './components/TagList';
import AddTag from './components/AddTag';

type Props = {
  tags: Array<Tag>,
  selectTag: Function,
  currentTag: Object,
  dispatch: Function,
};

type State = {
  posts: boolean,
  add: boolean,
};

class Tags extends Component {
  constructor() {
    super();

    this.state = {
      posts: false,
      add: false,
    };
    (this: any).handleAddTagClick = this.handleAddTagClick.bind(this);
    (this: any).handleTagClick = this.handleTagClick.bind(this);
    (this: any).handleTagSubmit = this.handleTagSubmit.bind(this);
    (this: any).handleDeleteTagClick = this.handleDeleteTagClick.bind(this);
  }

  state: State;

  props: Props;

  handleTagClick(tag: Object) {
    this.props.dispatch(selectTag(tag));
    this.setState({
      posts: true,
      add: false,
    });
  }
  handleTagSubmit(values) {
    this.props.dispatch(createTag(values));
  }
  handleAddTagClick() {
    this.setState({
      add: true,
      posts: false,
    });
  }
  handleDeleteTagClick(id) {
    this.props.dispatch(deleteTag(id));
  }
  render() {
    const actions = [
      <MenuButton key="menu" id="tagtb" buttonChildren="more_vert" icon>
        <ListItem primaryText="Add tag" onClick={ this.handleAddTagClick } />
        <ListItem primaryText="Tag a post" />
        <ListItem primaryText="Help" />
      </MenuButton>,
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
              <TagList
                tags={ this.props.tags }
                handleDeleteTagClick={ this.handleDeleteTagClick }
                handleTagClick={ this.handleTagClick }
              />
            </List>
          </Paper>
        </Col>
        <Col sm={ 12 } md={ 8 }>
          {
            !this.state.posts
              ? null
              : <TaggedPost name={ this.props.currentTag.name } />
          }
          {
            !this.state.add
              ? null
              : <AddTag onSubmit={ this.handleTagSubmit } />
          }
        </Col>
      </Row>
    );
  }
}

export default connect()(Tags);
