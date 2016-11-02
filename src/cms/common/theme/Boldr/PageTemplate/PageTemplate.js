/* @flow */
import React from 'react';
import { Footer } from '../../../components/index';
import Boldr from '../Boldr';
import { HeaderWrapper, ContentWrapper, FooterWrapper } from '../Wrappers';

type Props = {
  header: ReactElement,
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  footer?: ReactElement
};

const PageTemplate = (props: Props) => {
  return (
      <div className="boldr__theme-page">
        { props.helmetMeta }
        <HeaderWrapper { ...props.header } />

        { props.hero }

        <ContentWrapper>
          { props.children }
        </ContentWrapper>

        <FooterWrapper>
          { props.footer || <Footer /> }
        </FooterWrapper>
      </div>
  );
};

export default Boldr(PageTemplate);
