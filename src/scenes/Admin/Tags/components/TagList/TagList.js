/* @flow */

import React from 'react';
import Link from 'react-router-dom/Link';
import { gql, graphql } from 'react-apollo';
import Icon from '@boldr/ui/Icons/Icon';
import styled from 'styled-components';

type Props = {
  tags: Array<Tag>,
  handleTagClick: Function,
  handleDeleteTagClick: Function,
};
const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;
const ListItem = styled.li`
  padding-left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 80px;
  border-bottom: 1px solid #898989;
  svg {
    margin-right: 0.5em;
  }
`;
const TagName = styled.span`
  font-weight: 600;
  font-size: 1.2em;
`;
const TagList = (props: Props) => {
  function handleClickDelete(tag) {
    const tagId = tag.id;

    props.handleDeleteTagClick(tagId);
  }
  return (
    <List>
      {props.tags.map(tag =>
        <Link key={tag.id} to={`/admin/tags/${tag.name}`}>
          <ListItem>
            <Icon kind="trash" color="#222" size="24" onClick={() => handleClickDelete(tag)} />
            <TagName>
              {tag.name}
            </TagName>
            <br />
            <span>
              {tag.description}
            </span>
          </ListItem>
        </Link>,
      )}
    </List>
  );
};

export default TagList;
