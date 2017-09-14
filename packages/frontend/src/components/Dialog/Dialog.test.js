import React, { Component } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Dialog from './';

describe('Dialog component', () => {
  let dialog;

  class DialogTest extends Component {
    state = {
      visible: false,
    };

    render() {
      return <Dialog {...this.props} visible={this.state.visible} />;
    }
  }

  const open = () => {
    dialog.setState({
      visible: true,
    });
  };

  const unmount = () => {
    dialog.unmount();
    jest.runOnlyPendingTimers();
  };

  beforeEach(() => {
    function onClose() {
      dialog.setState({
        visible: false,
      });
    }

    dialog = mount(
      <DialogTest onClose={onClose} title="hello">
        <p>open dialog</p>
      </DialogTest>,
    );
  });

  afterEach(unmount);

  it('should render a dialog in body when `visible` is true', () => {
    open();
    expect(document.querySelectorAll('.boldr-dialog-r-anchor').length).toBe(1);
    expect(document.querySelector('.boldr-dialog-r-anchor').parentNode).toBe(document.body);
  });

  it('should unmount dialog when `visible` changes to false', () => {
    open();
    expect(document.querySelectorAll('.boldr-dialog-r-anchor').length).toBe(1);

    dialog.setState({
      visible: false,
    });

    jest.runOnlyPendingTimers();
    expect(document.querySelectorAll('.boldr-dialog-r-anchor').length).toBe(0);
  });

  it('does not create dialog when mounting', () => {
    expect(document.querySelectorAll('.boldr-dialog-r-anchor').length).toBe(0);
  });

  it('can have no title', () => {
    dialog.setProps({
      title: undefined,
    });
    open();
    expect(document.querySelectorAll('.boldr-dialog-r-header').length).toBe(0);
  });

  it('can have no mask', () => {
    dialog.setProps({
      mask: false,
    });
    open();
    expect(document.querySelectorAll('.boldr-dialog-r-backdrop').length).toBe(0);
  });

  it('has mask', () => {
    open();
    expect(document.querySelectorAll('.boldr-dialog-r-wrap').length).toBe(1);

    const mask = document.querySelector('.boldr-dialog-r-wrap');
    Simulate.click(mask);
    jest.runOnlyPendingTimers();
    expect(document.querySelectorAll('.boldr-dialog-r-wrap').length).toBe(0);
  });

  it('should unmount when presses ESC key', () => {
    open();

    expect(document.querySelectorAll('.boldr-dialog-r-anchor').length).toBe(1);

    const escKeyUpEvent = new window.KeyboardEvent('keyup', {
      keyCode: 27,
    });
    document.body.dispatchEvent(escKeyUpEvent);

    jest.runOnlyPendingTimers();
    expect(document.querySelectorAll('.boldr-dialog-r-anchor').length).toBe(0);
  });
});
