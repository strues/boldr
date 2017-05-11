/* @flow */
import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col, Loader, FontIcon } from 'boldr-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { FeaturedArticle, ArticleCard } from '../components';

type Props = {
  features: Array<Article>,
  articles: Array<Article>,
  layout: Object,
  isFetching: Boolean,
  listTags: Object,
  handleChangeLayout: () => void,
};
const CardSpacer = styled.div`
  margin-bottom: 50px;
`;
const FeaturedArea = styled.section`
  padding-top: 50px;
  margin-bottom: 40px;
`;
const style = {
  position: 'fixed',
  right: '20px',
  bottom: '70px',
};
const ArticleListing = (props: Props) => {
  if (props.isFetching) {
    return <Loader />;
  }

  const gridView = (
    <Row>
      {props.articles.map(article => (
        <Col key={article.id} xs={12} md={4}>
          <CardSpacer>
            <ArticleCard {...article} listTags={props.listTags} />
          </CardSpacer>
        </Col>
      ))}
    </Row>
  );

  const listView = (
    <div>
      {props.articles.map(article => (
        <Col key={article.id} xs={12}>
          <ArticleCard {...article} listTags={props.listTags} />
        </Col>
      ))}
    </div>
  );

  return (
    <Grid>
      <FeaturedArea>
        {props.features.map(article => (
          <Col key={article.id} xs={12}>
            <FeaturedArticle {...article} listTags={props.listTags} />
          </Col>
        ))}
      </FeaturedArea>
      {props.layout === 'grid' ? gridView : listView}
      {props.layout === 'grid'
        ? <FloatingActionButton
            secondary
            style={style}
            onTouchTap={props.handleChangeLayout}
          >
            <FontIcon>view_list</FontIcon>
          </FloatingActionButton>
        : <FloatingActionButton
            style={style}
            onTouchTap={props.handleChangeLayout}
          >
            <FontIcon>view_module</FontIcon>
          </FloatingActionButton>}
    </Grid>
  );
};

export default ArticleListing;
