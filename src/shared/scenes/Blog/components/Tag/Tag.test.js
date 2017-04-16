import React from 'react';
import {shallow} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {shallowToJson} from 'enzyme-to-json';
import Tag from './Tag';

describe('<Tag />', () => {
  const store = createStore(() => ({}));
  it('accepts props and renders them.', () => {
    const wrapper = shallow(<Provider store={store}><Tag /></Provider>);
    expect(wrapper.find('div').length).toBe(0);
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<Provider store={store}><Tag /></Provider>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
