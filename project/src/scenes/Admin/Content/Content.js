// @flow
import * as React from 'react';
import styled from 'styled-components';

import Flex from '@boldr/ui/Flex';
import type { ContentRoot } from '../../../types/boldr';
import CreateContainer from './ContentType/CreateContainer';

type Props = {
  content: ContentRoot,
};
type State = {
  activeItem: string,
};
// eslint-disable-next-line

const LeftCol = styled(Flex)`
  width: 230px;
`;
const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;
const ListItem = styled.li`
  padding-top: 5px;
  padding-bottom: 5px;
`;

class Content extends React.Component<Props, State> {
  state: State = {
    activeItem: 'categories',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  props: Props;

  render() {
    const { content: { tags, categories, contentTypes } } = this.props;
    const { activeItem } = this.state;
    return (
      <Flex justify="flex-start" align="stretch">
        <LeftCol shrink={0} />
        <Flex>
          <List>
            {activeItem === 'contentTypes' &&
              contentTypes.map(contentType => (
                <ListItem key={contentType.id}>{contentType.name}</ListItem>
              ))}
          </List>
          <List>
            {activeItem === 'tags' && tags.map(tag => <ListItem key={tag.id}>{tag.name}</ListItem>)}
          </List>
          <List>
            {activeItem === 'categories' &&
              categories.map(category => <ListItem key={category.id}>{category.name}</ListItem>)}
          </List>
        </Flex>
      </Flex>
    );
  }
}

export default Content;
