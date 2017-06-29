import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem/AccordionItem';

describe('Accordion', () => {
  it('renders correctly with min params', () => {
    const wrapper = shallow(
      <Accordion>
        <AccordionItem>Fake child</AccordionItem>
        <AccordionItem>Fake child</AccordionItem>
      </Accordion>,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with accordion false', () => {
    const wrapper = shallow(
      <Accordion accordion={false}>
        <AccordionItem>Fake child</AccordionItem>
        <AccordionItem>Fake child</AccordionItem>
      </Accordion>,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('different className', () => {
    const wrapper = shallow(
      <Accordion accordion={false} className="testCSSClass">
        <AccordionItem>Fake Child</AccordionItem>
        <AccordionItem>Fake Child</AccordionItem>
      </Accordion>,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleClick function accordion true', () => {
    const wrapper = shallow(
      <Accordion>
        <AccordionItem>Fake Child</AccordionItem>
        <AccordionItem>Fake Child</AccordionItem>
      </Accordion>,
    );
    wrapper.instance().handleClick(1);
    expect(wrapper.instance().state.activeItems).toEqual([1]);
    expect(wrapper).toMatchSnapshot();

    wrapper.instance().handleClick(1);
    expect(wrapper.instance().state.activeItems).toEqual([]);
    expect(wrapper).toMatchSnapshot();
  });

  it('handleClick function accordion false', () => {
    const wrapper = shallow(
      <Accordion accordion={false}>
        <AccordionItem>Fake Child</AccordionItem>
        <AccordionItem>Fake Child</AccordionItem>
      </Accordion>,
    );
    wrapper.instance().handleClick(1);
    expect(wrapper.instance().state.activeItems).toEqual([1]);
    expect(wrapper).toMatchSnapshot();

    wrapper.instance().handleClick(1);
    expect(wrapper.instance().state.activeItems).toEqual([]);
    expect(wrapper).toMatchSnapshot();

    wrapper.instance().handleClick(0);
    wrapper.instance().handleClick(1);
    expect(wrapper.instance().state.activeItems).toEqual([0, 1]);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles disabled children', () => {
    const wrapper = shallow(
      <Accordion accordion={false}>
        <AccordionItem disabled={true}>Fake Child</AccordionItem>
        <AccordionItem>Fake Child</AccordionItem>
      </Accordion>,
    );
    wrapper.instance().handleClick(0);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('pre expanded accordion', () => {
    const wrapper = shallow(
      <Accordion>
        <AccordionItem expanded={true}>Fake Child</AccordionItem>
        <AccordionItem>Fake Child</AccordionItem>
      </Accordion>,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('works with multiple pre expanded accordion. Extra expands are just ignored.', () => {
    const wrapper = shallow(
      <Accordion>
        <AccordionItem expanded={true}>Fake Child</AccordionItem>
        <AccordionItem expanded={true}>Fake Child</AccordionItem>
      </Accordion>,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('pre expanded accordion when accordion is false', () => {
    const wrapper = shallow(
      <Accordion accordion={false}>
        <AccordionItem expanded={true}>Fake Child</AccordionItem>
        <AccordionItem expanded={true}>Fake Child</AccordionItem>
      </Accordion>,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
