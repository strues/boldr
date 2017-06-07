import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () =>
  <div>
    <h1>Boldr Demo</h1>
    <Link to="/">
      Home
    </Link>
  </div>;

export default Header;
