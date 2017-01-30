import React, { PropTypes } from 'react';
import mergeClassNames from 'classnames';
import style from './style.css';

/**
 * The paragraph should be used to display long strings.
 * A good rule is to separate long texts in paragraphs after the third row.
 */
const Paragraph = ({ className, isLead, children, ...rest }) => {
  const finalClassName = mergeClassNames({
    [style.paragraph]: true,
    [style.lead]: isLead,
    [className]: className && className.length,
  });

  return (
    <p { ...rest } className={ finalClassName }>
      {children}
    </p>
  );
};
Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  isLead: PropTypes.bool,
  className: PropTypes.string,
};
Paragraph.defaultProps = { isLead: false };

export default Paragraph;
