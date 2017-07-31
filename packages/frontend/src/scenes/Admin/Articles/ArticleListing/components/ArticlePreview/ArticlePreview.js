/* @flow */
import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import Paper from '@boldr/ui/Paper';
import { Row, Col } from '@boldr/ui/Layout';
import Icon from '@boldr/ui/Icons/Icon';

export type Props = {
  article: Article,
};

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
        <Row>
          <Col xs={12} sm={9}>
            {article.title}
          </Col>
          <Col xs={12} sm={3}>
            <Link to={`/admin/articles/${article.slug}`}>
              <Icon kind="edit" color="#222" />
              {''}Edit
            </Link>
          </Col>
        </Row>
        <div className="boldr-post__content" dangerouslySetInnerHTML={this.createMarkup()} />
      </div>
    );
  };
  render() {
    return (
      <Paper zDepth={2}>
        Post Preview
        {!this.props.article ? this.noArticleDisplayed() : this.displayArticle()}
      </Paper>
    );
  }
}

export default ArticlePreview;
