/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// internal
import Paper from '@boldr/ui/Paper';
import { Row, Col } from '@boldr/ui/Layout';
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
    return (
      <Row>
        <Helmet title="Admin: Tags" />
        <Col sm={12} md={4}>
          <Paper zDepth={2}>
            <TagList tags={this.props.tags} handleDeleteTagClick={this.handleDeleteTagClick} />
          </Paper>
        </Col>
        <Col sm={12} md={8}>
          {!this.state.add
            ? null
            : <Paper zDepth={3} className="boldr-paperoverride">
                {/* <AddTag /> */}
                a
              </Paper>}
        </Col>
      </Row>
    );
  }
}

export default connect()(Tags);

/*
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
              */
