/* eslint-disable react/no-find-dom-node, no-unused-expressions, no-return-assign */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import BoldrComponent from '../util/BoldrComponent';
import TooltipContent from './TooltipContent';
import position from './TooltipPosition';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

class Tooltip extends BoldrComponent {
  componentElements() {
    const elements = super.componentElements();
    return this._mountNode ? elements.concat(this._mountNode) : elements;
  }

  onClickOutside(e) {
    if (this.props._supportOnClickOutside) {
      this.hide();
    } else if (this.props.onClickOutside) {
      this.props.onClickOutside && this.props.onClickOutside(e);
    }
  }

  static propTypes = {
    textAlign: PropTypes.string,
    children: PropTypes.node,
    content: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    alignment: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
    theme: PropTypes.oneOf(['light', 'dark', 'error']),
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    showTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),
    hideTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),
    isActive: PropTypes.bool,
    bounce: PropTypes.bool,
    disabled: PropTypes.bool,
    maxWidth: PropTypes.string,
    onClickOutside: PropTypes.func,

    /**
     * Callback to be called when the tooltip has been shown
     */
    onShow: PropTypes.func,
    zIndex: PropTypes.number,

    /**
     * By default tooltip is appended to a body, to avoid CSS collisions.
     * But if you want your tooltip to scroll with a content, append tooltip to a parent.
     * Just make sure the CSS are not leaked.
     */
    appendToParent: PropTypes.bool,

    /**
     * Allows to shift the tooltip position by x and y pixels.
     * Both positive and negative values are accepted.
     */
    moveBy: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),

    /**
     * Allows to position the arrow relative to tooltip.
     * Positive value calculates position from left/top.
     * Negative one calculates position from right/bottom.
     */
    moveArrowTo: PropTypes.number,
    isSize: PropTypes.oneOf(['normal', 'large']),
    shouldCloseOnClickOutside: PropTypes.bool,
  };

  static defaultProps = {
    placement: 'left',
    alignment: 'center',
    showTrigger: 'mouseenter',
    hideTrigger: 'mouseleave',
    showDelay: 200,
    hideDelay: 500,
    zIndex: 2000,
    maxWidth: '1200px',
    onClickOutside: null,
    onShow: null,
    isActive: false,
    theme: 'light',
    disabled: false,
    children: null,
    isSize: 'normal',
    shouldCloseOnClickOutside: false,
    textAlign: 'center',
  };

  _childNode = null;
  _mountNode = null;
  _showTimeout = null;
  _hideTimeout = null;
  _unmounted = false;

  state = {
    visible: false,
    hidden: true,
  };

  componentDidUpdate() {
    if (this._mountNode && this.state.visible) {
      const arrowPlacement = {
        top: 'bottom',
        left: 'right',
        right: 'left',
        bottom: 'top',
      };
      const tooltip = (
        <TooltipContent
          onMouseEnter={() => this._onTooltipContentEnter()}
          onMouseLeave={() => this._onTooltipContentLeave()}
          ref={ref => (this.tooltipContent = ref)}
          theme={this.props.theme}
          bounce={this.props.bounce}
          arrowPlacement={arrowPlacement[this.props.placement]}
          style={{ zIndex: this.props.zIndex }}
          arrowStyle={this.state.arrowStyle}
          maxWidth={this.props.maxWidth}
          isSize={this.props.isSize}
          textAlign={this.props.textAlign}>
          {this.props.content}
        </TooltipContent>
      );

      renderSubtreeIntoContainer(this, tooltip, this._mountNode);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount();
    this._unmounted = true;
    this._getContainer() && this.hide();
  }

  componentWillMount() {
    super.componentWillMount && super.componentWillMount();
    if (this.props.isActive) {
      this.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);
    if (nextProps.isActive !== this.props.isActive) {
      if (this.state.visible && this.props.hideTrigger === 'custom') {
        if (!nextProps.isActive) {
          this.hide();
        }
      }
      if (!this.state.visible && this.props.showTrigger === 'custom') {
        if (nextProps.isActive) {
          this.show();
        }
      }
    }
  }
  _chainCallbacks = (first, second) => {
    return args => {
      if (first) {
        first.apply(this, args);
      }
      if (second) {
        second.apply(this, args);
      }
    };
  };

  _getContainer() {
    if (typeof document === 'undefined') {
      return null;
    }

    return this.props.appendToParent
      ? this._childNode.parentElement
      : document ? document.body : null;
  }

  show() {
    if (this.props.disabled) {
      return;
    }
    if (this._unmounted) {
      return;
    }
    this.setState({ hidden: false });
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    if (this._showTimeout) {
      return;
    }
    if (!this.state.visible) {
      this._showTimeout = setTimeout(() => {
        if (this.props.onShow) {
          this.props.onShow();
        }

        this.setState({ visible: true }, () => {
          if (!this._mountNode) {
            this._mountNode = document.createElement('div');
            this._getContainer() && this._getContainer().appendChild(this._mountNode);
          }
          this._showTimeout = null;

          let fw = 0;
          let sw = 0;
          do {
            this.componentDidUpdate();
            const tooltipNode = ReactDOM.findDOMNode(this.tooltipContent);
            fw = this._getRect(tooltipNode).width;
            this._updatePosition(this.tooltipContent);
            sw = this._getRect(tooltipNode).width;
          } while (!this.props.appendToParent && fw !== sw);
        });
      }, this.props.showDelay);
    }
  }

  hide() {
    this.setState({ hidden: true });
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    if (this._hideTimeout) {
      return;
    }

    if (this.state.visible) {
      this._hideTimeout = setTimeout(() => {
        if (this._mountNode) {
          ReactDOM.unmountComponentAtNode(this._mountNode);
          this._getContainer() && this._getContainer().removeChild(this._mountNode);
          this._mountNode = null;
        }
        this._hideTimeout = null;
        if (!this._unmounted) {
          this.setState({ visible: false });
        }
      }, this._unmounted ? 0 : this.props.hideDelay);
    }
  }

  _hideOrShow(event) {
    if (this.props.hideTrigger === event && !this.state.hidden) {
      this.hide();
    } else if (this.props.showTrigger === event) {
      this.show();
    }
  }

  _onBlur() {
    this._hideOrShow('blur');
  }

  _onFocus() {
    this._hideOrShow('focus');
  }

  _onClick() {
    this._hideOrShow('click');
  }

  _onMouseEnter() {
    this._hideOrShow('mouseenter');
  }

  _onMouseLeave() {
    this._hideOrShow('mouseleave');
  }

  _calculatePosition(ref, tooltipNode) {
    if (!ref || !tooltipNode) {
      return {
        top: -1,
        left: -1,
      };
    }
    return this._adjustPosition(
      position(
        this._getRect(this._childNode),
        this._getRect(tooltipNode),
        {
          placement: this.props.placement,
          alignment: this.props.alignment,
          margin: 10,
        },
        this.props.relative,
      ),
    );
  }

  _updatePosition(ref) {
    if (ref && this._childNode) {
      const tooltipNode = ReactDOM.findDOMNode(ref);

      const style = this._calculatePosition(ref, tooltipNode);

      if (this.props.relative) {
        tooltipNode.style.top = `${style.top}px`;
        tooltipNode.style.left = `${style.left}px`;
      } else {
        tooltipNode.style.top = `${style.top}px`;
        tooltipNode.style.left = `${Math.max(style.left, 0)}px`;
      }

      const arrowStyles = this._adjustArrowPosition(this.props.placement, this.props.moveArrowTo);
      if (Object.keys(arrowStyles).length) {
        const arrow = tooltipNode.querySelector(`.boldr-tooltip__arrow`);
        arrow &&
          Object.keys(arrowStyles).forEach(key => {
            arrow.style[key] = arrowStyles[key];
          });
      }
    }
  }

  _adjustArrowPosition(placement, moveTo) {
    if (moveTo) {
      const isPositive = moveTo > 0;
      const pixels = isPositive ? moveTo : -moveTo;
      if (['top', 'bottom'].includes(placement)) {
        return isPositive ? { left: `${pixels}px` } : { left: 'auto', right: `${pixels}px` };
      }
      return isPositive ? { top: `${pixels}px` } : { top: 'auto', bottom: `${pixels}px` };
    }
    return {};
  }

  _getRect(el) {
    if (this.props.appendToParent) {
      // TODO: Once thoroughly tested, we could use the same approach in both cases.
      return {
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
      };
    }
    return el.getBoundingClientRect();
  }

  _adjustPosition(originalPosition) {
    let { x = 0, y = 0 } = this.props.moveBy || {};
    // TODO: Once thoroughly tested, and converted to using offsetX props, we could remove this one.
    if (!this.props.appendToParent) {
      x += window.scrollX || 0;
      y += window.scrollY || 0;
    }
    return {
      left: originalPosition.left + x,
      top: originalPosition.top + y,
    };
  }

  _onTooltipContentEnter() {
    this.show();
  }

  _onTooltipContentLeave() {
    this._onMouseLeave();
  }

  isShown() {
    return this.state.visible;
  }
  render() {
    const child = this.props.children;
    if (child) {
      return cloneElement(child, {
        ref: ref => (this._childNode = ReactDOM.findDOMNode(ref)),
        onClick: this._chainCallbacks(child.props ? child.props.onClick : null, this._onClick),
        onMouseEnter: this._chainCallbacks(
          child.props ? child.props.onMouseEnter : null,
          this._onMouseEnter,
        ),
        onMouseLeave: this._chainCallbacks(
          child.props ? child.props.onMouseLeave : null,
          this._onMouseLeave,
        ),
        onFocus: this._chainCallbacks(child.props ? child.props.onFocus : null, this._onFocus),
        onBlur: this._chainCallbacks(child.props ? child.props.onBlur : null, this._onBlur),
      });
    } else {
      return <div />;
    }
  }
}

export default Tooltip;
