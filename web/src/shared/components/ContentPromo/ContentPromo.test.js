import React from 'react';
import { shallow } from 'enzyme';
import ContentPromo from './ContentPromo';

describe('<ContentPromo />', () => {
  let requiredProps = {};

  beforeEach(() => {
    requiredProps = {};
  });

  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(
      <ContentPromo {...requiredProps} className="test" />,
    );

    expect(wrapper.is('.test')).toBe(true);
  });

  it('should render the passed children.', () => {
    const wrapper = shallow(
      <ContentPromo {...requiredProps}>Foo bar</ContentPromo>,
    );

    expect(wrapper.html()).toContain('Foo bar');
  });
});
