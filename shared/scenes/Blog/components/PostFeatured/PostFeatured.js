/* @flow */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from 'react-md/lib/Buttons/Button';
import { selectPost } from '../../../../state/modules/blog/posts/actions';
import { Col, Row } from '../../../../components';
import type { Tag as TagType } from '../../../../types/models';
import TagBlock from '../TagBlock';
import Tag from '../Tag';

type Props = {
  id?: String,
  feature_image?: String,
  title?: String,
  slug: String,
  content?: String,
  background_image?: String,
  comments: ?Array<Object>,
  excerpt?: String,
  created_at: String,
  updated_at?: String,
  status: ?String,
  author: String,
  seo?: Object,
  tags: Array<TagType>,
  attachments: ?Object,
  meta: ?Object,
  user_id: ?String,
  dispatch: Function,
  listTags: Object,
}
const Wrapper = styled.section`
  display: table;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;

const Content = styled.div`
  padding: 1.5rem;
  vertical-align: middle;
  display: table-cell;
  padding: 3rem;
`;

const PostTitle = styled.h2`
  font-size: 3.2rem;
  margin-top: 100px!important;
  font-weight: 200;
  letter-spacing: .2em;
  color: #fff;
  background: rgba(27, 27, 37, .65);
  padding: .08em 1rem;
  box-decoration-break: clone;
`;

export const PostFeatured = (props: Props) => {
  const ImgWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: table-cell;
    background: url(${props.feature_image});
    background-size: cover;
    width: 60%;
  `;
  const postTags = props.tags.map(id => props.listTags[id]);
  // Explicitly define post rather than passing additional
  // unnecessary props like listTags
  const post = {
    id: props.id,
    author: props.author,
    attachments: props.attachments,
    content: props.content,
    created_at: props.created_at,
    excerpt: props.excerpt,
    comments: props.comments,
    background_image: props.background_image,
    feature_image: props.feature_image,
    meta: props.meta,
    slug: props.slug,
    status: props.status,
    tags: props.tags,
    title: props.title,
    user_id: props.user_id,
  };
  function transitionPost() {
    props.dispatch(selectPost(post));
  }

  return (
    <div className="boldr-post__featured">
      <Wrapper>
        <ImgWrapper>
          <PostTitle>{ props.title }</PostTitle>
        </ImgWrapper>
        <Content>
          { props.excerpt }

        <Row style={ { paddingTop: '20px' } }>
          <Col xs={ 12 }>
            <Row xsEnd>
              <Col xs={ 6 }>
                { props.comments.length } <span>comments</span>
                { /* $FlowIssue */ }
                <Link to={ `/blog/${props.slug}` }>
                  <Button raised primary label="Read More" onClick={ transitionPost } />
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          {
            /* $FlowIssue */
            postTags.map(t => <Tag key={ t.id } tag={ t } />)
          }
        </Row>
        </Content>
      </Wrapper>
    </div>
  );
};

export default connect()(PostFeatured);
