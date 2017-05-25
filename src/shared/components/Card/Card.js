import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import Headline from '../Headline';
import Paragraph from '../Paragraph';

/**
* A Card teases a different page with an image, a headline
*  and a short descrition.
*/
const Card = props => {
  const {
    asset,
    to,
    title,
    text,
    children,
    className,
    actions,
    headlineType,
    ...rest
  } = props;
  const finalClassName = mergeClassNames({
    'boldrui-card': true,
    [className]: className && className.length,
  });

  return (
    <RouterLink {...rest} to={to} className={finalClassName}>
      <div className="boldrui-card__img-wrapper">
        {asset({ className: 'boldrui-card__img' })}
      </div>
      <div className="boldrui-card__contents">
        <Headline type={headlineType}>{title}</Headline>
        {children || <Paragraph>{text}</Paragraph>}
        {actions
          ? <div className="boldrui-card__actions">
              {actions}
            </div>
          : null}
      </div>
    </RouterLink>
  );
};
Card.propTypes = {
  /**
   * The route where the card image will link to.
   */
  to: PropTypes.string,

  /**
   * A function which returns the media element to render in the background.
   * It recieves an props object which should be propagated to the JSX element.
   */
  asset: PropTypes.func.isRequired,

  /**
   * The description of the page to be teased.
   */
  text: PropTypes.string.isRequired,

  /**
   * The title of the page to be teased, optional since you can
   * also pass in raw children.
   */
  title: PropTypes.string,

  /**
   * If specified, will be rendered on the bottom right of the card.
   * Useful for buttons or other action related UI elements.
   */
  actions: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,

  headlineType: PropTypes.oneOf(['h4', 'h5', 'h6']),
};
Card.defaultProps = {
  headlineType: 'h4',
};

export default Card;
