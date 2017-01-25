import React from 'react';
import { shallow } from 'enzyme';
import Box from './Box';

describe('(React Component) Box', () => {
  it('should render all children.', () => {
    const wrapper = shallow(
  <Box>
  foo
  </Box>
  );

    expect(wrapper.html()).toContain('foo');
  });

  it('should set the "className" prop to the wrapper if provided.', () => {
    const wrapper = shallow(
  <Box className="foobarClassName">
  foo
  </Box>
  );
    expect(wrapper.find('.foobarClassName').length).toBe(1);
  });
});
