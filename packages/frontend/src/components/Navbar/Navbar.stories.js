import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  Navbar,
  NavbarDropdown,
  NavbarBrand,
  NavbarItem,
  NavbarBurger,
  NavbarStart,
  NavbarLink,
  NavbarDivider,
  NavbarEnd,
} from './index';

storiesOf('Navbar', module)
  .add('default', () => (
    <Navbar>
      <NavbarBrand>
        <NavbarItem>
          {' '}
          <img src="https://boldr.io/assets/boldr-logo-light.png" />
        </NavbarItem>
        <NavbarBurger isActive={false} onClick={action('clicked')} />
      </NavbarBrand>
      <NavbarStart>
        <NavbarItem>
          <a href="#/">Home</a>
        </NavbarItem>
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem>
          <a href="#/">Logout</a>
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  ))
  .add('dropdown', () => (
    <Navbar>
      <NavbarBrand>
        <NavbarItem>
          {' '}
          <img src="https://boldr.io/assets/boldr-logo-light.png" />
        </NavbarItem>
        <NavbarBurger isActive={false} onClick={action('clicked')} />
      </NavbarBrand>
      <NavbarStart>
        <NavbarItem>
          <a href="#/">Home</a>
        </NavbarItem>
        <NavbarItem>
          <a href="#/">Foo</a>
        </NavbarItem>
        <NavbarItem>
          <a href="#/">Bar</a>
        </NavbarItem>
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem hasDropdown isHoverable>
          <NavbarLink href="#/">About</NavbarLink>
          <NavbarDropdown>
            <NavbarItem>
              <a href="#/">Example</a>
            </NavbarItem>
            <NavbarItem>
              <a href="#/">Dropdown</a>
            </NavbarItem>
            <NavbarDivider />
            <NavbarItem>
              <a href="#/">Menu</a>
            </NavbarItem>
          </NavbarDropdown>
        </NavbarItem>
        <NavbarItem>
          <a href="#/">Somewhere</a>
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  ));
