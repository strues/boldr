/* @flow */
import React from 'react';
import { Footer } from '../../components/index';
import type { ReactElement, ReactChildren } from '../../types/react';
import HeaderWrapper from './HeaderWrapper';
import Boldr from './Boldr';

const styled = require('styled-components').default;

type Props = {
  header: ReactElement,
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  footer?: ReactElement
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`;

const ContentWrapper = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 1rem auto;
`;

const FooterWrapper = styled.footer`
  margin-top: auto;
`;

const PageTemplate = (props: Props) => {
  return (
    <Wrapper { ...props }>
        { props.helmetMeta }
        <HeaderWrapper { ...props.header } />

        { props.hero }

        <ContentWrapper>
          { props.children }
        </ContentWrapper>

        <FooterWrapper>
          { props.footer || <Footer /> }
        </FooterWrapper>
    </Wrapper>
  );
};

export default Boldr(PageTemplate);
