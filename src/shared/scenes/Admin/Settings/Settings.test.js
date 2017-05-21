import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import fakeSettings from './__fixtures__/settings.fixture';
import Settings from './Settings';

describe('<Settings />', () => {
  const wrapper = shallow(<Settings settings={fakeSettings} />);
  it('renders <Settings /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
