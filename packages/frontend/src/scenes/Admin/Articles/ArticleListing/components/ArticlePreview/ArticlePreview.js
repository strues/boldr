/* @flow */
import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import Paper from '@boldr/ui/Paper';
import { Row, Col } from '@boldr/ui/Layout';
import Edit from '@boldr/icons/Edit';
import styled from 'styled-components';

export type Props = {
  article: Article,
};

const Toolbar = styled.div`
  width: 100%;
  height: 60px;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  padding: 1em;
  background-color: #243140;
`;
const ArticlePreviewTitle = styled.div`justify-content: flex-start;`;
const ArticlePreviewEdit = styled.div`justify-content: flex-end;`;
class ArticlePreview extends Component {
  props: Props;

  createMarkup = () => {
    return {
      __html: this.props.article.content,
    };
  };
  noArticleDisplayed = () => {
    return <div>Click an article to preview.</div>;
  };
  displayArticle = () => {
    const { article } = this.props;
    return (
      <div>
        <Toolbar>
          <ArticlePreviewTitle>
            {article.title}
          </ArticlePreviewTitle>
          <ArticlePreviewEdit>
            <Link to={`/admin/articles/${article.slug}`}>
              <Edit color="rgb(0, 188, 212)" />
            </Link>
          </ArticlePreviewEdit>
        </Toolbar>
        <Paper zDepth={2}>
          <div className="boldr-post__content" dangerouslySetInnerHTML={this.createMarkup()} />
        </Paper>
      </div>
    );
  };
  render() {
    return (
      <div>
        {!this.props.article ? this.noArticleDisplayed() : this.displayArticle()}
      </div>
    );
  }
}

export default ArticlePreview;