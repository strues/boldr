import { shallow } from 'enzyme';
import React from 'react';

import Html from './Html';

describe('<Html />', () => {
  it('should render a valid html document', () => {
    const head = {
      htmlAttributes: { toComponent: () => null },
      title: { toComponent: () => null },
      meta: { toComponent: () => null },
      link: { toComponent: () => null },
    };

    const renderedComponent = shallow(<Html appBodyString={'<div>hi</div>'} />);
    expect(renderedComponent.find('head').length).toEqual(1);
    expect(renderedComponent.find('body').length).toEqual(1);
  });
});
