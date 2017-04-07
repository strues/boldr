import React from 'react';
import Link from 'react-router-dom/Link';

const Footer = props => {
  return (
    <footer className="app-footer">
      <Link to="https://trues.io">CoreUI</Link> © 2017 Steven Truesdell
      <span className="float-right">Powered by <a href="http://boldr.io">Boldr</a></span>
    </footer>
  );
};

export default Footer;
