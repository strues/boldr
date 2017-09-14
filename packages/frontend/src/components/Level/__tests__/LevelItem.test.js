import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { LevelItem } from '../LevelItem';

describe('<LevelItem />', () => {
  it('should render a div with .boldr-level__item', () => {
    const component = shallow(<LevelItem>My LevelItem</LevelItem>);
    expect(component.contains(<div className="boldr-level__item">My LevelItem</div>)).toBe(true);
  });

  it('should render a p with .boldr-level__item', () => {
    const component = shallow(<LevelItem tag="p">My LevelItem</LevelItem>);
    expect(component.contains(<p className="boldr-level__item">My LevelItem</p>)).toBe(true);
  });

  it('should render an anchor with .boldr-level__item', () => {
    const component = shallow(<LevelItem href="#">My LevelItem</LevelItem>);
    expect(
      component.contains(
        <a href="#" className="boldr-level__item">
          My LevelItem
        </a>,
      ),
    ).toBe(true);
  });

  it('should render a div with .boldr-level__item and modifiers', () => {
    const component = shallow(<LevelItem isFlexible>My LevelItem</LevelItem>);
    expect(component.hasClass('boldr-level__item')).toBe(true);
    expect(component.hasClass('is-flexible')).toBe(true);
  });

  it('should render a div with .boldr-level__item, modifiers and classNames', () => {
    const component = shallow(
      <LevelItem isFlexible className="custom">
        My LevelItem
      </LevelItem>,
    );
    expect(component.hasClass('boldr-level__item')).toBe(true);
    expect(component.hasClass('is-flexible')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a div with .boldr-level__item and custom classNames', () => {
    const component = shallow(
      <LevelItem className="custom">
        <span>Any Content</span>
      </LevelItem>,
    );
    expect(component.hasClass('boldr-level__item')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<LevelItem>My LevelItem</LevelItem>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
