/* @flow */
import React from 'react';
import boldrStyle from '../../boldrStyle';

const FooterWrapper = (props: { children: ReactChildren }) => {
  return (
    <footer style={ boldrStyle.footer } className="boldr__theme-footer">
      { props.children }
    </footer>
  );
};

export default FooterWrapper;
