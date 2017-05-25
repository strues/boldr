import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import { mediaQuery } from '../../theme/theme';
import Toggler from '../Toggler/Toggler';
import TopbarPlainLink from './TopbarPlainLink';
import TopbarSearch from './TopbarSearch';
import TopbarLink from './TopbarLink';

const BASE_ELEMENT = StyleClasses.TOPBAR;

class Topbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    logo: PropTypes.node,
    url: PropTypes.string.isRequired,
    link: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.instanceOf(React.Component),
    ]),
    links: PropTypes.arrayOf(PropTypes.object),
    search: PropTypes.bool.isRequired,
    sidebarToggleable: PropTypes.bool,
    onMenuClick: PropTypes.func,
    onSearch: PropTypes.func,
    onSearchTyping: PropTypes.func,
    avatarUrl: PropTypes.string,
    username: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    sidebarToggleable: true,
    username: 'User',
    link: TopbarPlainLink,
    search: true,
    avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
    links: [],
  };

  state = {
    browser: typeof window !== undefined,
    searching: false,
  };
  componentDidMount() {
    if (this.state.browser) {
      window.addEventListener('keyup', this._handleKey, { passive: true });
    }
  }

  componentWillUnmount() {
    if (this.state.browser) {
      window.removeEventListener('keyup', this._handleKey);
    }
  }

  /**
     * Check if link is active
     *
     * @param {object} link - An object describing the link
     * @param {string} url - The URL to test against
     * @return {bool} - Whether or not the given link is active
     */
  _isActive = (link = {}, url = '') => {
    let urlToTest = link.url || '';

    if (urlToTest.length > 1) {
      urlToTest = urlToTest.replace(/^\//, '');
    }

    if (url.length > 1) {
      return url.endsWith(urlToTest) || url.includes(`${urlToTest}/`);
    } else if (url === '/') {
      return urlToTest === '/' || urlToTest === '';
    } else {
      return false;
    }
  };

  /**
     * Toggle the search input
     *
     */
  _toggleSearch = e => {
    this.setState({
      searching: !this.state.searching,
    });
  };

  /**
     * Handle all typing and watch for tab keystrokes
     *
     * @param {object} e - Native keyboard event
     */
  _handleKey = e => {
    const isSearchInput = e.target.classList.contains(
      `${BASE_ELEMENT}-search__input`,
    );

    if (e.which === 9 && isSearchInput) {
      this.setState({
        searching: true,
      });
    }
  };

  /**
     * An array of markup to render for the links
     *
     * @return {array} - An array of components
     */
  get _links() {
    const { links, link: Link, search, url, sidebarToggleable } = this.props;

    return links.map((link, index) => {
      const active = this._isActive(link, url);
      const activeLinkModifier = active ? `${BASE_ELEMENT}__link--active` : '';
      const offsetModifer = !search && links.length - 1 === index
        ? `${BASE_ELEMENT}__link--offset`
        : '';

      return (
        <Link
          className={`${BASE_ELEMENT}__link ${activeLinkModifier} ${offsetModifer}`}
          key={`${BASE_ELEMENT}__link-${link.title}`}
          to={link.url}
          {...link}
        >
          {link.title}
        </Link>
      );
    });
  }
  render() {
    const { className, link: Link } = this.props;
    const { searching } = this.state;
    const classes = cn(
      BASE_ELEMENT,
      {
        [`${BASE_ELEMENT}-search`]: this.state.searching,
      },
      className,
    );
    return (
      <header className={classes}>
        <div className={`${BASE_ELEMENT}__inner`}>
          <Toggler
            sidebarToggleable
            iconColor="#rgba(0, 0, 0, 0.87)"
            onClick={this.props.onMenuClick}
          />
          <nav className={`${BASE_ELEMENT}__links`}>
            {this._links}
          </nav>

          {this.props.search
            ? <TopbarSearch
                elementName={`${BASE_ELEMENT}-search`}
                active={this.state.searching}
                onToggle={this._toggleSearch}
              />
            : null}
          {this.props.avatarUrl
            ? <div className={`${BASE_ELEMENT}__user`}>
                <img
                  className={`${BASE_ELEMENT}__user-avatar`}
                  src={this.props.avatarUrl}
                  height="24"
                />
                <Link
                  className={`${BASE_ELEMENT}__user-link`}
                  url={`/profiles/${this.props.username}`}
                >
                  {this.props.username}
                </Link>

              </div>
            : null}

        </div>
      </header>
    );
  }
}

export default Topbar;
