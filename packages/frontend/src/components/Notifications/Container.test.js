import React from 'react';
import { shallow, mount } from 'enzyme';
import Container from './Container';

const position = ['20px', '30px', 'auto', 'auto'];
const stackNextOn = 'top';
const children = <p>test</p>;
const renderComponent = (props = {}) =>
  shallow(
    <Container {...props}>
      {children}
    </Container>,
  );
const mountComponent = (props = {}) => mount(<Container {...props} />);

describe('<Container />', () => {
  it('should render <div> tag', () => {
    const renderedComponent = renderComponent({ position, stackNextOn });
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have children', () => {
    const renderedComponent = renderComponent({ position, stackNextOn });
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should accept position and stackNextOn props', () => {
    const mountedComponent = mountComponent({ position, stackNextOn });
    expect(mountedComponent.prop('position')).toEqual(position);
    expect(mountedComponent.prop('stackNextOn')).toEqual(stackNextOn);
  });
});
