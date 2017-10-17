import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import DashboardMain from './DashboardMain';

describe('<DashboardMain />', () => {
  const wrapper = shallow(<DashboardMain />);
  it('renders <DashboardMain /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  test('it correctly displays rules', () => {
    const tree = renderer.create(<DashboardMain />).toJSON();
    expect(tree).toHaveStyleRule('width', '100%');
  });

  it('renders snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
