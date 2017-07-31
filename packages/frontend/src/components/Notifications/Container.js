import styled from 'styled-components';
import { array, string } from 'prop-types';

const Container = styled.div`
  position: absolute;
  display: flex;
  z-index: 999999;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  flex-direction: ${props => (props.stackNextOn === 'top' ? 'column-reverse' : 'column')};
  bottom: 0;
  left: 0;
  right: 0;
`;

Container.propTypes = {
  position: array.isRequired,
  stackNextOn: string.isRequired,
};

export default Container;
