import React from 'react';
import { shallow } from 'enzyme';
import FooterWrapper from './FooterWrapper';

describe('<FooterWrapper />', () => {
  it('It sets the correct className', () => {
    const wrapper = shallow(<FooterWrapper />);
    expect(wrapper.find('.boldr__theme-footer').length).toBe(1);
  });
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <FooterWrapper>
        <div className="unique" />
      </FooterWrapper>,
    );
    expect(wrapper.contains(<div className="unique" />)).toBe(true);
  });
});
