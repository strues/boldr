import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MembersList from './MembersList';

describe('<MembersList />', () => {
  it('should render with the proper heading', () => {
    const renderedComponent = shallow(<MembersList users={[]} />);
    expect(renderedComponent.find('.boldrui-members-list')).toHaveClassName('boldrui-members-list');
  });
});
