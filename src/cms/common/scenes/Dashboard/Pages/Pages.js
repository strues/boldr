import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import Page from './Page';

const Pages = (props) => {
  return (
     <div>
      <Header as="h2">Pages</Header>
      <Segment>
        {
          props.pages.map(p => <Page key={ p.id } { ...p } />)
        }
      </Segment>
     </div>
  );
};

export default Pages;
