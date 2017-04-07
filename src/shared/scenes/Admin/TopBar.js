/* @flow */
/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
// $FlowIssue
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';

type Props = {
  me: Object,
};

type State = {
    dropdownOpen: boolean,
};

class TopBar extends Component {
  constructor(props: Props) {
    super(props);

    (this: any).toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  state: State;
  props: Props;

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  sidebarToggle(e: Object) {
    e.preventDefault();
    // $FlowIssue
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e: Object) {
    e.preventDefault();
    // $FlowIssue
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e: Object) {
    e.preventDefault();
    // $FlowIssue
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="boldrui-topbar navbar">
        <button
          className="navbar-toggler mobile-sidebar-toggler hidden-lg-up"
          onClick={ this.mobileSidebarToggle }
          type="button"
        >
          ☰
        </button>
        <ul className="nav navbar-nav hidden-md-down">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={ this.sidebarToggle } href="#">☰</a>
          </li>
          <li className="nav-item px-1">
            <NavLink to="/admin" className="nav-link">Dashboard</NavLink>
          </li>
          <li className="nav-item px-1">
            <Link to="/" className="nav-link">Home</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Avatar src={ this.props.me.avatarUrl } className="img-avatar" role="presentation" />
            <Link to={ `/profiles/${this.props.me.username}` }>
              {this.props.me.firstName}
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default TopBar;
