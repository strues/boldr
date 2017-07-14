/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import Avatar from '@boldr/ui/Avatar';
import Icon from '@boldr/ui/Icons/Icon';
import Paragraph from '@boldr/ui/Paragraph';
import { Menu, MenuItem } from '@boldr/ui/Menu';

export type Props = {
  handleClick: Function,
  article: Article,
};

const ListItem = styled.li`
  list-style-type: none;
  padding-left: 0;
  overflow: hidden;
  height: 130px;
  padding: 1rem;
  margin: 0 1rem .5rem;
  background-color: #fff;
  p {
    margin-bottom: .25rem;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;
const ListHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;
const ListContent = styled.div`height: 50px;`;

const ArticleListItem = (props: Props) => {
  const { article, handleClick } = props;
  return (
    <ListItem onClick={() => handleClick(article)}>
      <ListHead>
        <Avatar src={article.image} />
        {article.title}
        <Menu>
          <MenuItem
            icon={<Icon kind="trash" color="#222" />}
            onClick={function noRefCheck() {}}
            text="Delete"
          />
          <MenuItem
            icon={<Icon kind="edit" color="#222" />}
            onClick={function noRefCheck() {}}
            text="Edit"
          />
        </Menu>
      </ListHead>
      <ListContent>
        <Paragraph>
          {article.excerpt}
        </Paragraph>
      </ListContent>
      <Footer>
        <span>
          {article.published === true ? 'Published' : 'Draft'}
        </span>
        <span>
          {format(article.createdAt, 'MM/DD/YY')}
        </span>
      </Footer>
    </ListItem>
  );
};

export default ArticleListItem;
