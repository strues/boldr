import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ArticleTitle from './ArticleTitle';

describe('<ArticleTitle />', () => {
  it('renders snapshot', () => {
    const wrapper = shallow(<ArticleTitle created="Random Post Title" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
