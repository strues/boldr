import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ArticleTitle from './ArticleTitle';

describe('<ArticleTitle />', () => {
  it('accepts props and renders them.', () => {
    const wrapper = shallow(<ArticleTitle title="Random Post Title" />);
    expect(wrapper.instance().props.title).toBe('Random Post Title');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<ArticleTitle created="Random Post Title" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
