/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Row, Col, Paragraph, mediaQuery } from 'boldr-ui';

import { selectPost } from '../../../../state/modules/blog/posts/actions';
import TagBlock from '../TagBlock';
import Tag from '../Tag';

type Props = {
  id?: string,
  featureImage?: string,
  title?: string,
  slug: string,
  content?: string,
  backgroundImage?: string,
  comments: ?Array<Object>,
  excerpt?: string,
  created_at: string,
  updated_at?: string,
  status: ?string,
  author: string,
  seo?: Object,
  tags: Array<Tag>,
  attachments: ?Object,
  meta: ?Object,
  userId: ?string,
  dispatch: Function,
  listTags: Object,
};
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
  position: relative;
  ${mediaQuery.small`height: 350px; flex-direction: row;`}
`;

const Content = styled.div`
  vertical-align: middle;
  display: flex;
  padding: 3em 1.5em;
  order: 2;
  flex-direction: column;
  width: 100%;
  height: 350px;
  ${mediaQuery.small`flex-direction: column; width: 30%`}
`;

const PostTitle = styled.h2`
  font-size: 3.2rem;
  margin-top: 200px !important;
  font-weight: 200;
  letter-spacing: .2em;
  color: #fff;
  background: rgba(27, 27, 37, .65);
  padding: .08em 1rem;
  width: 100%;
  box-decoration-break: clone;
`;

export const FeaturedPost = (props: Props) => {
  const ImgWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    order: 1;
    background: url(${props.featureImage});
    background-size: cover;
    background-position: 50% 50%;
    width: 100%;
    ${mediaQuery.small`flex-direction: row; width: 70%`}
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
    backgroundImage: props.backgroundImage,
    featureImage: props.featureImage,
    meta: props.meta,
    slug: props.slug,
    status: props.status,
    tags: props.tags,
    title: props.title,
    userId: props.userId,
  };
  function transitionPost() {
    props.dispatch(selectPost(post));
  }

  return (
    <div className="boldr-post__featured">
      <Wrapper>
        <ImgWrapper>
          <PostTitle>{props.title}</PostTitle>
        </ImgWrapper>
        <Content>
          <Paragraph>{props.excerpt}</Paragraph>
          <Row style={ { paddingTop: '20px' } } xsEnd>
            <Link to={ `/blog/${props.slug}` }>
              <Button raised primary label="Read More" onClick={ transitionPost } />
            </Link>
          </Row>
          <Row>
            <Col sm={ 12 }>
              {postTags.map(t => <Tag key={ t.id } tag={ t } />)}
            </Col>
          </Row>
        </Content>
      </Wrapper>
    </div>
  );
};

export default connect()(FeaturedPost);
