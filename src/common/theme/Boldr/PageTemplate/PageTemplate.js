/* @flow */
import React from 'react';
import styled from 'styled-components';
import { Footer } from '../../../components/index';
import Boldr from '../Boldr';
import HeaderWrapper from './HeaderWrapper';

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
