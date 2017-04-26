/* @flow */
import { connect } from 'react-redux';
import { createPost } from '../../../Blog/state';
import NewPost from './NewPost';

const mapDispatchToProps = dispatch => {
  return {
    createPost: postData => {
      dispatch(createPost(postData));
    },
  };
};

const mapStateToProps = state => {
  return {
    postImage: state.admin.attachments.postImage,
    drawer: state.boldr.ui.drawer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
