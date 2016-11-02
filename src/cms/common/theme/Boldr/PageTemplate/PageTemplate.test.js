import React from 'react';
import { shallow } from 'enzyme';
import PageTemplate from './PageTemplate';

describe('<PageTemplate />', () => {
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <PageTemplate>
        <div className="unique" />
      </PageTemplate>
    );
    expect(wrapper.contains(<div className="unique" />)).toBe(true);
  });
});
