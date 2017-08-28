// @flow
import * as React from 'react';
import styled from 'styled-components';
import Flex from '../../../components/Flex';

type Props = {};
type State = {
  activeId: string,
};
// eslint-disable-next-line

const LeftCol = styled(Flex)`
  width: 230px;
  background-color: #20bf55;
`;
const MidCol = styled(Flex)`
width: 230px;
background-color: #378fe5;
`;

class Content extends React.Component<Props, State> {
  state: State = {
    activeId: '1',
  };
  onTabChange = id => {
    this.setState({
      activeId: id,
    });
  };
  render() {
    return (
      <Flex justify="flex-start" align="stretch">
        <LeftCol shrink={0}>aa</LeftCol>
        <MidCol shrink={0}>ffff</MidCol>
        <Flex>aaa</Flex>
      </Flex>
    );
  }
}

export default Content;
