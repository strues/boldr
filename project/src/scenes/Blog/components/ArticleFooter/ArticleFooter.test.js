import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ArticleFooter from './ArticleFooter';

describe('<ArticleFooter />', () => {
  it('renders snapshot', () => {
    const wrapper = shallow(
      <ArticleFooter
        username="TestUser"
        firstName="Steven"
        lastName="Smith"
        avatarUrl="https://boldr.io/images/logo.png"
        bio="This is a bio"
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
