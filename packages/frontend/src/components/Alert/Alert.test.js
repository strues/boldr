import React from 'react';
import { mount } from 'enzyme';
import Alert from './Alert';

describe('<Alert />', () => {
  it('style defaults to info', () => {
    const wrapper = mount(
      <Alert>
        <span>Example</span>
      </Alert>,
    );
    expect(
      wrapper.contains(
        <div className="boldr-alert-content-wrapper">
          <div className="boldr-alert-content">
            <span>Example</span>
          </div>
        </div>,
      ),
    ).toBe(true);
    expect(wrapper.contains(<span className="boldr-alert-close-btn">×</span>)).toBe(false);
    expect(wrapper.find('.boldr-alert-style-info.boldr-alert-size-normal').length).toBe(1);
  });

  it('can have custom className', () => {
    const wrapper = mount(<Alert className="test" />);
    expect(wrapper.find('.boldr-alert.test').length).toBe(1);
  });

  it('can have custom prefix', () => {
    const wrapper = mount(<Alert prefix="test" />);
    expect(wrapper.find('.test-alert').length).toBe(1);
  });

  it('can have close button', () => {
    const wrapper = mount(
      <Alert closable>
        <span>Example</span>
      </Alert>,
    );
    expect(wrapper.find('.boldr-alert-close-btn').length).toBe(1);
  });

  it('can have a onClose callback', () => {
    const onClose = jest.fn();
    let wrapper = mount(<Alert closable onClose={onClose} />);
    wrapper.find('.boldr-alert-close-btn').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);

    wrapper = mount(<Alert closable onClose={null} />);
    expect(() => wrapper.find('.boldr-alert-close-btn').simulate('click')).not.toThrow();
  });

  it('has warning style', () => {
    const wrapper = mount(<Alert type="warning" />);
    expect(wrapper.find('.boldr-alert-style-warning').length).toBe(1);
  });

  it('has danger style', () => {
    const wrapper = mount(<Alert type="danger" />);
    expect(wrapper.find('.boldr-alert-style-danger').length).toBe(1);
  });

  it('error is an alias to danger', () => {
    const wrapper = mount(<Alert type="error" />);
    expect(wrapper.find('.boldr-alert-style-danger').length).toBe(1);
  });

  it('can have rounded border', () => {
    const wrapper = mount(<Alert rounded />);
    expect(wrapper.find('.boldr-alert-border-rounded').length).toBe(1);
  });

  it('have a large style', () => {
    const wrapper = mount(<Alert size="large" />);
    expect(wrapper.find('.boldr-alert-size-large').length).toBe(1);
  });
});
