import React from 'react';
import Link from 'react-router/lib/Link';
import { Row, Button, Heading } from 'components/index';
import Page from './components/Page';

const styled = require('styled-components').default;

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
         <Heading size={ 2 }>Pages</Heading><Link to="/dashboard/pages/new"><Button>New Page</Button></Link>
       </TitleWrapper>
      </Row>
      <div>

        {
          props.pages.map(p => <Page key={ p.id } { ...p } />)
        }
      </div>
     </div>
  );
};

export default Pages;
