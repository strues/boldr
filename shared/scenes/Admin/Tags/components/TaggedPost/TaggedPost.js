/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import Toolbar from 'react-md/lib/Toolbars';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import { Loader } from '../../../../../components';
import { fetchTaggedPost } from '../../../../../state/modules/blog/tags/actions';
import TaggedPostMenu from '../TaggedPostMenu';

type Props = {
  currentTag: Object,
  params: Object,
  isFetching: boolean,
  name: string,
  listTags: Object,
  dispatch: () => void,
};

class TaggedPost extends Component {
  static fetchData(dispatch, params) {
    return Promise.all([
      dispatch(fetchTaggedPost(params.name)),
    ]);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;

   // Fetching data for client side rendering
    TaggedPost.fetchData(dispatch, params);
  }

  props: Props;
  render() {
    if (this.props.isFetching) {
      return (
        <Loader />
      );
    }
    if (!this.props.currentTag) {
      return (
        <div>NO posts matching the tag</div>
      );
    }

    return (
      <div>
       <Toolbar
         colored
         title={ `Posts tagged ${this.props.currentTag.name}` }
         nav={ null }
         actions={ null }
       />
      <List>
        {
          this.props.currentTag.posts.map(post =>
            <ListItem key={ post.id } primaryText={ post.title } rightAvatar={ <TaggedPostMenu post={ post } /> } />
          )
        }
      </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTags: state.blog.tags.all,
    isFetching: state.blog.tags.isFetching,
    currentTag: state.blog.tags.currentTag,
  };
};

export default connect(mapStateToProps)(TaggedPost);
