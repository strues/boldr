/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Paper, Row, Col } from 'boldr-ui';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon
  from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import List from 'material-ui/List/List';
import { createTag, deleteTag } from '../../../Blog/state';

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
    return (
      <Row>
        <Helmet title="Admin: Tags" />
        <Col sm={12} md={4}>
          <Paper zDepth={2}>
            <Toolbar>

              <ToolbarTitle text="Tags" />
              <IconMenu
                iconButtonElement={
                  <IconButton touch>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
              >
                <MenuItem
                  primaryText="Add tag"
                  onTouchTap={this.handleAddTagClick}
                />
                <MenuItem primaryText="Tag a post" />
              </IconMenu>
            </Toolbar>
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
