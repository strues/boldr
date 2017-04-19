import React from 'react';
import {shallow, mount} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {Heading} from 'boldr-ui';
import Media from './Media';

describe('<Media />', () => {
  it('should render with the proper heading', () => {
    const renderedComponent = shallow(<Media media={[]} />);
    expect(
      renderedComponent.contains(<Heading size={3}>Media</Heading>),
    ).toEqual(true);
  });
});
