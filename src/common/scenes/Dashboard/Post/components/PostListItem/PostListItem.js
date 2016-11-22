/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import { format } from 'date-fns';
import { Item, Segment, Divider, Popup } from 'semantic-ui-react';
import { Icon } from 'components/index';

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
  const publishedIcon = (<Popup
    trigger={ <Icon onClick={ handlePublishClick } color="#222" kind="visible" /> }
    content="Set post status to published."
    basic
  />);
  const draftIcon = (<Popup
    trigger={ <Icon onClick={ handleDraftClick } color="#222" kind="hidden" /> }
    content="Set post status to draft."
    basic
  />);
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
            draftIcon :
            publishedIcon
          }{/* $FlowIssue */}
          <Link to={ `/dashboard/posts/editor/${props.slug}` }>
            <Icon color="#222" kind="edit" />
          </Link>
          <Popup
            trigger={ <Icon kind="delete" onClick={ handleClickDelete } color="#222" /> }
            content="Remove post from database."
            basic
          />
        </Item.Extra>
      </Item.Content>
    </Item>
    </Segment>
    <Divider />
    </div>
  );
};

export default PostListItem;
