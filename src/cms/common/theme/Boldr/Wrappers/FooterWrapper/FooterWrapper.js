/* @flow */
import React from 'react';

const FooterWrapper = (props: { children: ReactChildren }) => {
  return (
    <footer className="boldr__theme-footer">
      { props.children }
    </footer>
  );
};

export default FooterWrapper;
