import React from 'react';
import styled from 'styled-components';
import Facebook from './Facebook';
import Github from './Github';
import Google from './Google';
import Twitter from './Twitter';
import LinkedIn from './LinkedIn';

const SocialList = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: inline-flex;
  justify-content: space-between;
`;
const SocialItem = styled.li`
  padding-left: 0;
`;

const Social = props => {
  return (
    <SocialList>
      {props.facebook
        ? <SocialItem><Facebook href={props.fburl} /></SocialItem>
        : null}
      {props.twitter
        ? <SocialItem><Twitter href={props.turl} /></SocialItem>
        : null}
      {props.github
        ? <SocialItem><Github href={props.ghurl} /></SocialItem>
        : null}
      {props.google
        ? <SocialItem><Google href={props.gurl} /></SocialItem>
        : null}
      {props.linkedin
        ? <SocialItem><LinkedIn href={props.lurl} /></SocialItem>
        : null}
    </SocialList>
  );
};

export default Social;
