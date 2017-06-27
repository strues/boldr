// @flow
import React from 'react';

import styleVars from '../../theme/styleVars';
import View from '../View';

const formatStackedChildren = children => React.Children.map(children, node => <View>{node}</View>);

const Errors = ({ children, stackChildren }: { children?: any, stackChildren?: boolean }) =>
  <View style={{ color: styleVars.colorWarning }}>
    {stackChildren ? formatStackedChildren(children) : children}
  </View>;

Errors.defaultProps = {
  stackChildren: false,
};

export default Errors;
