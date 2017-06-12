import React from 'react';
import Route from 'react-router-dom/Route';
import ArticleListingContainer from './ArticleListing/ArticleListingContainer';
import Article from './Article/Article';
import TagListContainer from './TagList/TagListContainer';

import Scene from '../../core/sceneConnector';
import blogReducer from './state/reducer';

export default new Scene({
  route: [
    <Route exact path="/blog" component={ArticleListingContainer} />,
    <Route exact path="/blog/:slug" component={Article} />,
    <Route exact path="/blog/tags/:name" component={TagListContainer} />,
  ],
  reducer: { blog: blogReducer },
});
