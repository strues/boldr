// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Input, Label, Menu } from 'semantic-ui-react';
import Flex from '../../../components/Flex';
import type { ContentRoot } from '../../../types/boldr';
import CreateContainer from './ContentType/CreateContainer';

type Props = {
  content: ContentRoot,
};
type State = {
  activeItem: string,
};
// eslint-disable-next-line

const LeftCol = styled(Flex)`width: 230px;`;
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
        <LeftCol shrink={0}>
          <Menu vertical>
            <Menu.Item
              name="categories"
              active={activeItem === 'categories'}
              onClick={this.handleItemClick}>
              <Label color="blue">1</Label>
              Categories
            </Menu.Item>

            <Menu.Item
              name="contentTypes"
              active={activeItem === 'contentTypes'}
              onClick={this.handleItemClick}>
              <Label>51</Label>
              Content Types
            </Menu.Item>

            <Menu.Item name="tags" active={activeItem === 'tags'} onClick={this.handleItemClick}>
              <Label>1</Label>
              Tags
            </Menu.Item>
          </Menu>
        </LeftCol>
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
