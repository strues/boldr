import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  let wrapper, props;
  test('Renders the login form card', () => {
    it('should render a `Create` heading', () => {
      const createWrapper = shallow(<LoginForm />);
      const actual = createWrapper.containsMatchingElement(<a>Forgot your password?</a>);
      expect(actual).toEqual(true);
    });
  });
});
