/* @flow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 0px;
  height: 0px;
  z-index: 2000;
  min-width: calc(100% - 2px);
  width: auto;
  overflow: hidden;
  list-style-type: none;
  transition: all 0.2s ease;
  background: white;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
  border-bottom-width: ${props => (props.open ? '1px' : '0px')};
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  white-space: nowrap;

  @media (max-width: 991px) {
    position: relative;
    top: 0;
    border: none;
    color: #fff;
    box-shadow: none;
    background: #364b60;
  }
`;
const Item = styled.li`
  position: relative;
  color: ${props => (props.theme.primary ? props.theme.primary : 'black')};
  transition: all 0.14s ease;

  &:hover {
    color: #fff;
    background: #364b60;
  }

  @media (max-width: 991px) {
    color: #fff;
  }
`;
const Link = styled.a`
  text-decoration: none;
  color: inherit;
  padding: 10px 10px 10px 5px;
  display: block;

  @media (max-width: 991px) {
    padding: 10px 0px 10px 40px;
  }
`;

type Props = {
  open: boolean,
  handleDropdown: Function,
  name: string,
  items: Array<Object>,
  mobile: boolean,
};

export default class NavbarMenu extends Component {
  static displayName = 'Dropdown';

  props: Props;
  handleClick = (e: Event): void => {
    const { open, handleDropdown, mobile } = this.props;
    if (open) {
      this.list.style.height = 'auto';
      // If dropdown is clicked while open, set Navbar's activeIndex to -1
      // to signify that all dropdowns are currently closed
      handleDropdown();
    } else {
      this.list.style.height = '0px';
      handleDropdown();
    }
  };

  renderItems = (): ?ReactElement<any> => {
    let { items } = this.props;
    items = items.map((item, i) => {
      return (
        <Item key={i}>
          <Link href={item.href}>
            {item.title}
          </Link>
        </Item>
      );
    });
    return items;
  };

  render() {
    const { name, open } = this.props;
    return (
      <span>
        <a className="boldrui-link" onClick={this.handleClick} onKeyDown={this.handleClick}>
          {name}
        </a>
        <List open={open} innerRef={el => (this.list = el)}>
          {this.renderItems()}
        </List>
      </span>
    );
  }
}
