import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { LevelLeft } from './LevelLeft';

describe('<LevelLeft />', () => {
  it('should render a div with .boldrui-level__left', () => {
    const component = shallow(<LevelLeft>My LevelLeft</LevelLeft>);
    expect(component.contains(<div className="boldrui-level__left">My LevelLeft</div>)).toBe(true);
  });

  it('should render an aside with .boldrui-level__left', () => {
    const component = shallow(<LevelLeft tag="aside">My LevelLeft</LevelLeft>);
    expect(component.contains(<aside className="boldrui-level__left">My LevelLeft</aside>)).toBe(
      true,
    );
  });

  it('should render a div with .boldrui-level__left and custom classNames', () => {
    const component = shallow(
      <LevelLeft className="custom">
        <span>Any Content</span>
      </LevelLeft>,
    );
    expect(component.hasClass('boldrui-level__left')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<LevelLeft>My LevelLeft</LevelLeft>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
