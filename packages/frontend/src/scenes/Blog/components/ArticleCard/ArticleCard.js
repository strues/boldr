// @flow
import React from 'react';
import format from 'date-fns/format';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import type { TagsType } from '../../../../types/boldr';
import TagBlock from '../TagBlock';

const ImageLink = styled(Link)`
  display: block;
  overflow: hidden;
  position: relative;
`;

const Image = styled.div`
  width: auto;
  height: 200px;
  background: #fff no-repeat 50%;
  background-size: cover;
  background-image: url(${props => props.image});
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const ContentLink = styled(Link)`
  display: block;
  padding: 25px 25px 0;
  color: #233040;
  &:hover {
    color: #233040;
  }
`;

const ArticleHeader = styled.header``;

const Title = styled.h2`
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  margin: 0 0 10px;
`;

const Excerpt = styled.section`
  p {
    font-size: 15px;
    line-height: 22px;
    font-weight: 300;
    margin: 0 0 20px;
  }
`;

const Footer = styled.footer`
  padding: 0 25px 25px;
  display: flex;
  justify-content: space-between;
`;

const AuthorImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 100%;
  object-fit: cover;
`;

const AuthorLink = styled(Link)`
  display: flex;
  align-items: center;
  transition: color 200ms;

  &:hover {
    color: #0094c6;
  }
`;

const Author = styled.span`
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Article = styled.article`
  display: flex;
  min-height: 300px;
  overflow: hidden;
  margin: 0 20px 5vw;
  border-radius: 3px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.08), 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  transition: transform 300ms, box-shadow 300ms;
  will-change: transform, box-shadow;
  display: flex;
  flex: 1 1 300px;
  flex-direction: column;
  background-color: #fff;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.08), 0 0 10px 0 rgba(0, 0, 0, 0.06);
  }

  @media (min-width: 700px) {
    &:nth-child(6n + 1) {
      margin: 0 20px 40px;
      flex: 1 1 100%;
      flex-direction: row;

      ${ImageLink} {
        flex: 1;
      }

      ${Footer} {
        padding: 0 40px 30px;
      }

      ${Excerpt} p {
        font-size: 17px;
        line-height: 24px;
      }

      ${Title} {
        font-size: 24px;
        line-height: 30px;
        margin: 0 0 20px;
      }

      ${ContentLink} {
        padding: 30px 40px 0;
      }

      ${Content} {
        flex: 0 1 350px;
      }

      ${Image} {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    ${props =>
      props.featuring
        ? `
      &:first-child {
        margin-top: -60px;
      }
    `
        : ''};
  }
`;

type Props = {
  id: string,
  featured: boolean,
  slug: string,
  image: string,
  title: string,
  createdAt: string,
  excerpt: string,
  author: Object,
  tags: TagsType,
};
const ArticleCard = (props: Props) => {
  const formattedDate = format(props.createdAt, 'MM/DD/YYYY');
  return (
    <Article key={props.id} featuring={props.featured}>
      <ImageLink to={`/blog/${props.slug}`}>
        <Image image={props.image} />
      </ImageLink>
      <Content>
        <ContentLink to={`/blog/${props.slug}`}>
          <ArticleHeader>
            <Title>{props.title}</Title>
          </ArticleHeader>
          <Excerpt>
            <p>{props.excerpt}</p>
          </Excerpt>
        </ContentLink>
        <Footer>
          <AuthorLink to={`/profiles/${props.author.username}`}>
            <AuthorImage src={props.author.avatarUrl} alt={props.author.firstName} />
            <Author>{props.author.firstName}</Author>
          </AuthorLink>
          <TagBlock tags={props.tags} />
        </Footer>
      </Content>
    </Article>
  );
};

export default ArticleCard;
