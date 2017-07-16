import React from 'react';
import { shallow } from 'enzyme';
import FormCard from './FormCard';

describe('<FormCard />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FormCard
        skinny
        title="Fcard"
        form={
          <form>
            <input type="text" />
          </form>
        }
      />,
    );
  });

  test('+++ <FormCard />, should render', () => {
    expect(wrapper.length).toEqual(1);
  });

  test('+++ <FormCard />, should render props', () => {
    const inst = wrapper.instance();
    expect(inst.props.skinny).toEqual(true);
  });
});
