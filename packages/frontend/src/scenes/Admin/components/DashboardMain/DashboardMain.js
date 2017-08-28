import styled from 'styled-components';

const DashboardMain = styled.div`
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: ${props => (props.noPad ? 0 : '1em')};
`;

export default DashboardMain;
