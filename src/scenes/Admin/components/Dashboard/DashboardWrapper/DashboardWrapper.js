import styled from 'styled-components';

const DashboardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  @media screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

export default DashboardWrapper;
