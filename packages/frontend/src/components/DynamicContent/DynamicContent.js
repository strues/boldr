// @flow
import React from 'react';

type InnerHTML = {
  __html: string,
};
type Props = {
  className?: string,
  dangerouslySetInnerHTML: InnerHTML,
};

class DynamicContent extends React.PureComponent<Props, void> {
  render() {
    return (
      <div
        className={this.props.className}
        dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}
      />
    );
  }
}

export default DynamicContent;
