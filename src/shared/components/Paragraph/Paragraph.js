import React from 'react';
import PropTypes from 'prop-types';
import cxN from 'classnames';

/**
 * The paragraph should be used to display long strings.
 * A good rule is to separate long texts in paragraphs after the third row.
 */
const Paragraph = ({ className, isLead, isLight, children, ...rest }) => {
  const finalClassName = cxN({
    'boldrui-paragraph': true,
    'boldrui-paragraph__lead': isLead,
    'boldrui-paragraph__light': isLight,
    [className]: className && className.length,
  });

  return (
    <p {...rest} className={finalClassName}>
      {children}
    </p>
  );
};
Paragraph.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * If set to `true` the paragraph will be displayed in a
   * slightly bigger manner.
   */
  isLead: PropTypes.bool,
  isLight: PropTypes.bool,
  className: PropTypes.string,
};
Paragraph.defaultProps = {
  isLead: false,
  isLight: false,
};

export default Paragraph;
