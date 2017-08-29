// @flow
import * as React from 'react';
import styled from 'styled-components';
import Flex from '../../../components/Flex';
import CreateContainer from './ContentType/CreateContainer';

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
  render() {
    return (
      <Flex justify="flex-start" align="stretch">
        <LeftCol shrink={0}>aa</LeftCol>
        <MidCol shrink={0}>ffff</MidCol>
        <Flex>
          <CreateContainer />
        </Flex>
      </Flex>
    );
  }
}

export default Content;
