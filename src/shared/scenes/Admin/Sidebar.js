/* @flow */
import React, { Component } from 'react';
import NavLink from 'react-router-dom/NavLink';
import FontIcon from 'react-md/lib/FontIcons';

type Props = {
  location: Object,
};
/*
  contentLinks = [
    { href: '/admin', className: 'nav-link', activeClassName: 'active', icon: 'dashboard', text: 'Dashboard' }
  ]
  contentLinks.map(c => {
  return (
  <li className="nav-item">
    <NavLink to={ c.href } className={ c.className } activeClassName={ c.activeClassName }>
      <FontIcon>{c.icon}</FontIcon> {c.text}
    </NavLink>
  </li>
))
 */
const Sidebar = (props: Props) => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav">
          <li className="nav-title">
            Content
          </li>
          <li className="nav-item">
            <NavLink to={ '/admin/posts' } className="nav-link" activeClassName="active">
              <FontIcon>list</FontIcon> List Posts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ '/admin/new-post' } className="nav-link" activeClassName="active">
              <FontIcon>note_add</FontIcon> Create Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ '/admin/tags' } className="nav-link" activeClassName="active">
              <FontIcon>label</FontIcon> Tags
            </NavLink>
          </li>
          <li className="nav-title">
            Media
          </li>
          <li className="nav-item">
            <NavLink to={ '/admin/filemanager' } className="nav-link" activeClassName="active">
              <FontIcon>cloud_upload</FontIcon> File Manager
            </NavLink>
          </li>
          <li className="nav-title">
            Layout
          </li>
          <li className="nav-item">
            <NavLink to={ '/admin/navigation' } className="nav-link" activeClassName="active">
              <FontIcon>insert_link</FontIcon> Navigation Editor
            </NavLink>
          </li>
          <li className="nav-title">
            Users
          </li>
          <li className="nav-item">
            <NavLink to={ '/admin/members' } className="nav-link" activeClassName="active">
              <FontIcon>people</FontIcon> Members List
            </NavLink>
          </li>
          <li className="nav-title">
            Site
          </li>
          <li className="nav-item">
            <NavLink to={ '/admin/settings' } className="nav-link" activeClassName="active">
              <FontIcon>settings_applications</FontIcon> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
