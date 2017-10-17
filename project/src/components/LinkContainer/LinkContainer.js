import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default class LinkContainer extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    style: PropTypes.object,
    activeStyle: PropTypes.object,
    isActive: PropTypes.func,
  };

  static defaultProps = {
    replace: false,
    exact: false,
    strict: false,
    activeClassName: 'active',
  };

  handleClick = event => {
    const { children, onClick } = this.props;

    if (children.props.onClick) {
      children.props.onClick(event);
    }

    if (onClick) {
      onClick(event);
    }

    if (
      // onClick prevented default
      !event.defaultPrevented &&
      // ignore right clicks
      event.button === 0 &&
      // ignore clicks with modifier keys
      !isModifiedEvent(event)
    ) {
      event.preventDefault();

      const { history } = this.context.router;
      const { replace, to } = this.props;

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  };

  render() {
    const {
      children,
      replace, // eslint-disable-line no-unused-vars
      to,
      exact,
      strict,
      activeClassName,
      className,
      activeStyle,
      style,
      isActive: getIsActive,
      ...props
    } = this.props;

    const href = this.context.router.history.createHref(
      typeof to === 'string' ? { pathname: to } : to,
    );

    return (
      <Route
        path={typeof to === 'object' ? to.pathname : to}
        exact={exact}
        strict={strict}
        children={({ location, match }) => {
          const isActive = !!(getIsActive ? getIsActive(match, location) : match);

          return React.cloneElement(React.Children.only(children), {
            ...props,
            className: isActive ? [className, activeClassName].join(' ') : className,
            style: isActive ? { ...style, ...activeStyle } : style,
            href,
            onClick: this.handleClick,
          });
        }}
      />
    );
  }
}
