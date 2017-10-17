import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ArticleContent from './ArticleContent';

describe('<ArticleContent />', () => {
  it('renders <ArticleContent /> without breaking', () => {
    const wrapper = shallow(<ArticleContent />);
    expect(wrapper.find('article').length).toBe(1);
  });

  it('renders snapshot', () => {
    const wrapper = shallow(<ArticleContent />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
