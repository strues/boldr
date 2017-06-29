/* @flow */
import React from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import cxN from 'classnames';

export type Props = {
  logoImg: ?string,
};

const NavbarBrand = (props: Props) => {
  return (
    <li className="boldrui-navbar-header">
      <Link to="/" className="boldrui-navbar-brand">
        <img src={props.logoImg} alt="logo" height="65px" className="boldrui-navbar-logo" />
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
