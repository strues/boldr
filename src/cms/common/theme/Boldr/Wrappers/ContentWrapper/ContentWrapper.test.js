import React from 'react';
import { shallow } from 'enzyme';
import ContentWrapper from './ContentWrapper';

describe('<ContentWrapper />', () => {
  it('It sets the correct className', () => {
    const wrapper = shallow(<ContentWrapper />);
    expect(wrapper.find('.boldr__theme-content').length).toBe(1);
  });
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <ContentWrapper>
        <div className="unique" />
      </ContentWrapper>
    );
    expect(wrapper.contains(<div className="unique" />)).toBe(true);
  });
});
