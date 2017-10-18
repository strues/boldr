/* @flow */
import * as React from 'react';
import Link from 'react-router-dom/Link';
import Paper from '@boldr/ui/Paper';
import Edit from '@boldr/ui/Icons/Edit';
import Dialog from '@boldr/ui/Dialog';
import styled from 'styled-components';
import IconButton from '@boldr/ui/IconButton';
import WindowMaximize from '@boldr/ui/Icons/WindowMaximize';
import DynamicContent from '../../../../../../components/DynamicContent';
import type { ArticleType } from '../../../../../../types/boldr';

export type Props = {
  article: ArticleType,
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
  background-color: #3178b7;
`;
Toolbar.defaultProps = {
  theme: {
    palette: {
      primary2: '#3178B7',
    },
  },
};
const ArticlePreviewTitle = styled.div`
  justify-content: flex-start;
`;
const ArticlePreviewEdit = styled.div`
  justify-content: flex-end;
`;
class ArticlePreview extends React.Component<Props, *> {
  props: Props;

  createMarkup = () => {
    return {
      __html: this.props.article.content,
    };
  };

  noArticleDisplayed = () => {
    return <div>Click an article to preview.</div>;
  };

  onClickClose = () => {
    this.props.onCloseExpand();
  };

  handleClickExpand = () => {
    this.props.onClickExpand();
  };

  displayArticle = () => {
    const { article } = this.props;
    return (
      <div>
        <Toolbar>
          <ArticlePreviewTitle>{article.title}</ArticlePreviewTitle>
          <ArticlePreviewEdit>
            <IconButton onClick={this.handleClickExpand}>
              <WindowMaximize fill="#fff" size={24} />
            </IconButton>
            <Link to={`/admin/articles/${article.slug}`}>
              <Edit fill="#fff" size={24} />
            </Link>
          </ArticlePreviewEdit>
        </Toolbar>
        <Paper zDepth={2} isPadded>
          <DynamicContent
            className="boldr-post__content"
            dangerouslySetInnerHTML={this.createMarkup()}
          />
        </Paper>
        <Dialog title="Edit User" visible={this.props.isVisible} onClose={this.onClickClose}>
          <DynamicContent
            className="boldr-post__content"
            dangerouslySetInnerHTML={this.createMarkup()}
          />
        </Dialog>
      </div>
    );
  };

  render() {
    return <div>{!this.props.article ? this.noArticleDisplayed() : this.displayArticle()}</div>;
  }
}

export default ArticlePreview;
