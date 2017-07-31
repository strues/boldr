/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@boldr/ui/Button';
import Row from '@boldr/ui/Layout/Row';
import Paragraph from '@boldr/ui/Paragraph';
import { mediaQuery } from '../../../../theme/theme';

type Props = {
  id?: string,
  title?: string,
  slug: string,
  content?: string,
  image?: string,
  excerpt?: string,
  createdAt: string,
  status: ?string,
  author: string,
  tags: Array<Tag>,
  attachments: ?Object,
  meta: ?Object,
  userId: ?string,
};
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 40px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12),
    0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
  position: relative;
  ${mediaQuery.small`height: 350px; flex-direction: row;`};
`;

const Content = styled.div`
  vertical-align: middle;
  display: flex;
  padding: 3em 1.5em;
  order: 2;
  flex-direction: column;
  width: 100%;
  height: 350px;
  ${mediaQuery.small`flex-direction: column; width: 30%`};
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

export const FeaturedArticle = (props: Props) => {
  const ImgWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    order: 1;
    background: url(${props.image});
    background-size: cover;
    background-position: 50% 50%;
    width: 100%;
    ${mediaQuery.small`flex-direction: row; width: 70%`};
  `;

  return (
    <div className="boldrui-feat-post">
      <Wrapper>
        <ImgWrapper>
          <PostTitle>
            {props.title}
          </PostTitle>
        </ImgWrapper>
        <Content>
          <Paragraph>
            {props.excerpt}
          </Paragraph>
          <Row xsCenter>
            <Link to={`/blog/${props.slug}`}>
              <Button kind="primary" outline>
                Read More
              </Button>
            </Link>
          </Row>
        </Content>
      </Wrapper>
    </div>
  );
};
const defaultProps = {
  tags: [],
};
FeaturedArticle.defaultProps = defaultProps;
export default connect()(FeaturedArticle);
