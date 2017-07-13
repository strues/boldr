/* eslint-disable react/prop-types */
import React from 'react';
import NavLink from 'react-router-dom/NavLink';

/**
 * React router stateless link component
 *
 * @param {object} props - Link options containing at least a `url`
 * @return {object} - Markup for the link
 */
const TopbarLink = ({ index, url, ...props }) => {
  if (url.match(/^https?:/)) {
    return (
      <a {...props} href={index || url}>
        {props.children}
      </a>
    );
  } else {
    return (
      <NavLink {...props} to={url}>
        {props.children}
      </NavLink>
    );
  }
};

export default TopbarLink;
