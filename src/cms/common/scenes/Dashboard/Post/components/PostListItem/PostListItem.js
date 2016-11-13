/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import { format } from 'date-fns';
import { Item, Icon, Segment, Divider } from 'semantic-ui-react';

type Props = {
  id: String,
  feature_image: String,
  title: String,
  handleArticlePublishClick: Function,
  handleDeleteClick: Function,
  handleArticleDraftClick: Function,
  created_at: String,
  status: String,
  excerpt: String,
  slug: String,
};

const PostListItem = (props: Props) => {
  function handlePublishClick() {
    const postId:String = props.id;
    const postStatus = 'draft';
    props.handleArticlePublishClick(postId, postStatus);
  }
  function handleDraftClick() {
    const postId = props.id;
    const postStatus = 'published';
    props.handleArticleDraftClick(postId, postStatus);
  }
  function handleClickDelete() {
    const postId: String = props.id;
    props.handleDeleteClick(postId);
  }
  const formattedDate = format(props.created_at, 'MM/DD/YYYY');
  const publishedIcon = <Icon onClick={ handlePublishClick } name="unhide" size="large" />;
  const draftIcon = <Icon onClick={ handleDraftClick } name="hide" size="large" />;
  return (
    <div className="post-list__item">
    <Segment>
      <Item>
       <img src={ props.feature_image }
         alt="post preview"
         style={ { width: '100px', height: '100px', float: 'left', marginRight: '15px' } }
       />
       <Item.Content>
        <Item.Header>{/* $FlowIssue */}
          <Link to={ `/dashboard/posts/editor/${props.slug}` }>
          { props.title }
          </Link>
        </Item.Header>
        <Item.Meta>
            <Icon name="calendar" /> { formattedDate }
        </Item.Meta>
        <Item.Description>
        { props.excerpt }
        </Item.Description>
        <Item.Extra>
          {
            props.status === 'published' ?
            publishedIcon :
            draftIcon
          }{/* $FlowIssue */}
          <Link to={ `/dashboard/posts/editor/${props.slug}` }>
            <Icon name="edit" size="large" />
          </Link>
          <Icon name="erase" size="large" onClick={ handleClickDelete } />
        </Item.Extra>
      </Item.Content>
    </Item>
    </Segment>
    <Divider />
    </div>
  );
};

export default PostListItem;
