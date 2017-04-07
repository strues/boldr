import React from 'react';
import Link from 'react-router-dom/Link';

const Footer = props => {
  return (
    <footer className="boldrui-dashboard-footer">
      © 2017 Steven Truesdell
      <span className="float-right">Powered by <a href="https://boldr.io">Boldr</a></span>
    </footer>
  );
};

export default Footer;
