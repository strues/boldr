import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import Branding from './Branding';

describe('<Branding />', () => {
  it('should render with the base element', () => {
    const renderedComponent = shallow(<Branding />);
    expect(renderedComponent.find('.boldrui-sh__branding').length).toBe(1);
  });
});
