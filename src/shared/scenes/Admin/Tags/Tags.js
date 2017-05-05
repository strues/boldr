/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { MenuButton, List, ListItem, Paper, Toolbar, Row, Col } from 'boldr-ui';

import { createTag, deleteTag } from '../../Blog/state';

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
  state = {
    add: false,
  };

  state: State;

  props: Props;

  handleTagSubmit = values => {
    this.props.dispatch(createTag(values));
  };
  handleAddTagClick = () => {
    this.setState({
      add: true,
    });
  };
  handleDeleteTagClick = id => {
    this.props.dispatch(deleteTag(id));
  };
  render() {
    const actions = [
      <MenuButton key="menu" id="tagtb" buttonChildren="more_vert" icon>
        <ListItem primaryText="Add tag" onClick={this.handleAddTagClick} />
        <ListItem primaryText="Tag a post" />
        <ListItem primaryText="Help" />
      </MenuButton>,
    ];
    return (
      <Row>
        <Helmet title="Admin: Tags" />
        <Col sm={12} md={4}>
          <Paper zDepth={2}>
            <Toolbar themed title="Tags" nav={null} actions={actions} />
            <List>
              <TagList
                tags={this.props.tags}
                handleDeleteTagClick={this.handleDeleteTagClick}
              />
            </List>
          </Paper>
        </Col>
        <Col sm={12} md={8}>
          {!this.state.add
            ? null
            : <Paper zDepth={3} className="boldr-paperoverride">
                <AddTag onSubmit={this.handleTagSubmit} />
              </Paper>}
        </Col>
      </Row>
    );
  }
}

export default connect()(Tags);
