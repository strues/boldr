import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import { Row, Button } from 'components/index';
import Page from './components/Page';

const TitleWrapper = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 1rem auto;
  justify-content: space-around;
`;
const Pages = (props: { pages: Array<Object> }) => {
  return (
     <div>
       <Row>
         <TitleWrapper>
         <Header as="h2">Pages</Header><Link to="/dashboard/pages/new"><Button>New Page</Button></Link>
       </TitleWrapper>
      </Row>
      <Segment>

        {
          props.pages.map(p => <Page key={ p.id } { ...p } />)
        }
      </Segment>
     </div>
  );
};

export default Pages;
