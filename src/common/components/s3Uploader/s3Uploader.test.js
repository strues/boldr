import React from 'react';
import { shallow } from 'enzyme';
import S3Uploader from './s3Uploader';

describe('<S3Uploader />', () => {
  function setup() {
    const wrapper = shallow(<S3Uploader />);
    const instance = wrapper.instance();

    return { wrapper, instance };
  }

  it('renders', () => {
    const { wrapper, instance } = setup();

    expect(wrapper).toBe.ok;
    expect(instance).toBe.ok;
  });
});
