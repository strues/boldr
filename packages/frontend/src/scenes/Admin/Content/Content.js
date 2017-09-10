// @flow
import * as React from 'react';
import styled from 'styled-components';
import Flex from '../../../components/Flex';
import type { ContentTypes } from '../../../types/boldr';
import CreateContainer from './ContentType/CreateContainer';

type Props = {
  contentTypes: ContentTypes,
};
type State = {
  tags: boolean,
  categories: boolean,
  content: boolean,
};
// eslint-disable-next-line

const LeftCol = styled(Flex)`
  width: 230px;
  background-color: #20bf55;
`;
const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;
const ListItem = styled.li`
  padding-top: 5px;
  padding-bottom: 5px;
`;
const MidCol = styled(Flex)`
  width: 230px;
  background-color: #378fe5;
`;

class Content extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      tags: false,
      categories: false,
      content: false,
    };
  }
  state: State;
  props: Props;
  render() {
    return (
      <Flex justify="flex-start" align="stretch">
        <LeftCol shrink={0}>
          <List>
            <ListItem>Tags</ListItem>
            <ListItem>Categories</ListItem>
            <ListItem>Content Types</ListItem>
          </List>
        </LeftCol>
        <MidCol shrink={0}>
          <List>
            {this.props.contentTypes.map(contentType => (
              <ListItem key={contentType.id}>{contentType.name}</ListItem>
            ))}
          </List>
          <List>{this.props.tags.map(tag => <ListItem key={tag.id}>{tag.name}</ListItem>)}</List>
        </MidCol>
        <Flex>
          <CreateContainer />
        </Flex>
      </Flex>
    );
  }
}

export default Content;
