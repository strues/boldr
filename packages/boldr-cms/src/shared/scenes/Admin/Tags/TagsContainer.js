/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { Row, Col } from '../../../components';
import { fetchTagsIfNeeded, getTags, selectTag, clearTag } from '../../../state/modules/blog/tags';
import type { Tag } from '../../../types/models';
import TaggedPost from './components/TaggedPost';
import Tags from './Tags';

export type Props = {
  tags: Array<Tag>,
  fetchTagsIfNeeded: Function,
  selectTag: Function,
};

type State = {
  posts: boolean,
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchTagsIfNeeded());
  },
})
export class TagsContainer extends Component {
  constructor() {
    super();

    this.state = {
      posts: false,
    };

    (this: any).handleTagClick = this.handleTagClick.bind(this);
  }

  state: State;

  componentDidMount() {
    this.props.fetchTagsIfNeeded();
  }

  props: Props;

  handleTagClick(tag: Object) {
    this.props.selectTag(tag);
    this.setState({
      posts: true,
    });
  }
  render() {
    return (
      <Row>
        <Col sm={ 12 } md={ 4 }>
          <Paper zDepth={ 2 }>
            <List>
              <Tags tags={ this.props.tags } handleTagClick={ this.handleTagClick } />
            </List>
          </Paper>
        </Col>
        <Col sm={ 12 } md={ 8 }>
          { !this.state.posts ? null :
            <TaggedPost name={ this.props.currentTag.name } />
          }
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    tags: getTags(state),
    currentTag: state.blog.tags.currentTag,
  };
};
export default connect(mapStateToProps, { fetchTagsIfNeeded, clearTag, selectTag, push })(TagsContainer);
