/* @flow */

import React from 'react';
import Link from 'react-router-dom/Link';
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
  padding: 0 2em;
  border-radius: 5px;
`;
const ListItem = styled.li`
  padding-left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dde8f0;
  svg {
    margin-right: 0.5em;
  }
`;

const InnerList = styled.ul`
  list-style-type: none;
  width: 100%;
  padding-left: 0;
  display: inline-flex;
  justify-content: space-between;
  padding: 0 2em;
  border-radius: 5px;
`;
const InnerListItem = styled.li`padding-left: 0;`;
const TagName = styled.span`
  font-weight: 600;
  font-size: 1.2em;
`;
const TagDesc = styled.span`
  font-weight: 300;
  font-size: 1em;
  line-height: 2em;
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
            <InnerList>
              <InnerListItem>
                <TagName>
                  {tag.name}
                </TagName>
              </InnerListItem>
              <InnerListItem>
                <TagDesc>
                  {tag.description}
                </TagDesc>
              </InnerListItem>
              <InnerListItem>
                <TagDesc>
                  {tag.articles.length}
                </TagDesc>
              </InnerListItem>
              <InnerListItem>
                <Icon kind="trash" color="#222" size="24" onClick={() => handleClickDelete(tag)} />
              </InnerListItem>
            </InnerList>
          </ListItem>
        </Link>,
      )}
    </List>
  );
};

export default TagList;
