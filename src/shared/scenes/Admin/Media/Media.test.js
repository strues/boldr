import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Headline } from 'boldr-ui';
import Media from './Media';

describe('<Media />', () => {
  it('should render with the proper heading', () => {
    const renderedComponent = shallow(<Media media={[]} siteName="Boldr" />);
    expect(
      renderedComponent.contains(
        <Headline type="h2">Boldr's Media Gallery</Headline>,
      ),
    ).toEqual(true);
  });
});
