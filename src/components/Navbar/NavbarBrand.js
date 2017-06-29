/* @flow */
import React from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import cxN from 'classnames';

export type Props = {
  isFixed: boolean,
};

const NavbarBrand = props => {
  return (
    <li className="boldrui-navbar-header">
      <Link to="/" className="boldrui-navbar-brand">
        Boldr
      </Link>
      <label
        id="boldrui-navbar-hamburger"
        className="boldrui-navbar-hamburger boldrui-navbar-hamburger-doublespin"
        htmlFor="boldrui-navbar-checkbox"
      >
        <span />
      </label>
    </li>
  );
};

export default NavbarBrand;
