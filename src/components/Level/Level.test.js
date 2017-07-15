import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Level } from './Level';

describe('Level', () => {
  it('should render a nav with .boldrui-level', () => {
    const component = shallow(<Level>My Level</Level>);
    expect(component.contains(<nav className="boldrui-level">My Level</nav>)).toBe(true);
  });

  it('should render a div with .boldrui-level', () => {
    const component = shallow(<Level tag="div">My Level</Level>);
    expect(component.contains(<div className="boldrui-level">My Level</div>)).toBe(true);
  });

  it('should render a nav with .boldrui-level and modifiers', () => {
    const component = shallow(<Level isMobile>My Level</Level>);
    expect(component.hasClass('boldrui-level')).toBe(true);
    expect(component.hasClass('is-mobile')).toBe(true);
  });

  it('should render a nav with .boldrui-level, modifiers and classNames', () => {
    const component = shallow(
      <Level isMobile className="custom">
        My Level
      </Level>,
    );
    expect(component.hasClass('boldrui-level')).toBe(true);
    expect(component.hasClass('is-mobile')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a nav with .boldrui-level and custom classNames', () => {
    const component = shallow(
      <Level className="custom">
        <span>Any Content</span>
      </Level>,
    );
    expect(component.hasClass('boldrui-level')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<Level>My Level</Level>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
