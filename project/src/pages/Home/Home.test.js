import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Home from './Home';

const articles = [{ id: 1, title: 'test' }, { id: 2, title: 'Testing' }];
describe('<Home />', () => {
  it('renders <Home /> without breaking', () => {
    const wrapper = shallow(<Home articles={articles} isLoading={false} />);
    expect(wrapper.instance().props.articles).toEqual(articles);
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<Home articles={articles} isLoading={false} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
