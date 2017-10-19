import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
// import { shallowToJson } from 'enzyme-to-json';
import MembersList from './MembersList';

describe('<MembersList />', () => {
  it('should render with the proper heading', () => {
    const renderedComponent = shallow(<MembersList accounts={[]} />);
    expect(renderedComponent.find('.boldr-members-list')).toHaveClassName('boldr-members-list');
  });
});
