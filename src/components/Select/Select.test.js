import React from 'react';
import Select, { Option } from './index';
import { mount } from 'enzyme';

describe('<Select />', () => {
  test('data', () => {
    const wrapper = mount(<Select data={[1, 2, 3]} />);
    expect(wrapper.find('Select').length).toBe(1);
    wrapper.find('SelectTrigger').simulate('click');
    expect(wrapper.find('Option').length).toBe(3);
  });

  test('Option', () => {
    let wrapper = mount(
      <Select>
        <Option value="1">One</Option>
        <Option value="2">Two</Option>
      </Select>,
    );
    expect(wrapper.find('Select').length).toBe(1);
    wrapper.find('SelectTrigger').simulate('click');
    expect(wrapper.find('Option').length).toBe(2);

    // HACK: branch
    wrapper = mount(
      <Select>
        <Option>One</Option>
      </Select>,
    );
  });

  test('Test the default properties', () => {
    const wrapper = mount(<Select />);
    expect(wrapper.prop('open')).toBe(false);
    expect(wrapper.prop('disabled')).toBe(false);
    expect(wrapper.prop('optionText')).toBe('text');
    expect(wrapper.prop('optionValue')).toBe('value');
    expect(wrapper.prop('prefix')).toBe('boldrui');
    expect(wrapper.prop('filter')).toBe(undefined);
    expect(wrapper.prop('selectedItem').value).toBe('');
    expect(wrapper.prop('selectedItem').text).toBe('');
  });

  it('SimpleTrigger', () => {
    const wrapper = mount(<Select data={[1, 2, 3]} simple />);
    expect(wrapper.find('SimpleTrigger').length).toBe(1);
  });

  test('Select an option', () => {
    const wrapper = mount(<Select data={[1, 2, 3]} />);
    wrapper.find('SelectTrigger').simulate('click');
    wrapper.find('Option').at(1).simulate('click');
    expect(wrapper.state('selectedItem').value).toBe(2);
  });

  test('Search for a keyword', () => {
    const onEmptyMock = jest.fn();
    const wrapper = mount(
      <Select
        data={[1, 2, 3]}
        search
        onEmptySelected={onEmptyMock}
        filter={(item, keyword) => {
          return `${item.value}` === `${keyword}`;
        }}
      />,
    );
    expect(wrapper.find('InputTrigger').length).toBe(1);
    wrapper.find('input').simulate('change', {
      target: {
        value: 4,
      },
    });
    wrapper.find('Option').simulate('click');
    expect(onEmptyMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('change', {
      target: {
        value: 3,
      },
    });
    expect(wrapper.find('Option').length).toBe(1);
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 27 });
    expect(wrapper.find('Option').length).toBe(0);
  });

  it('Popup中的Search(filter and onAsyncFilter)', () => {
    let wrapper = mount(
      <Select
        data={['One', 'Two', 'Three']}
        filter={(item, keyword) =>
          keyword && item.value.trim().toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1}
        searchPlaceholder="search"
      />,
    );
    wrapper.find('SelectTrigger').simulate('click');
    expect(wrapper.find('Option').length).toBe(3);
    wrapper.find('Search').find('input').simulate('change', {
      target: {
        value: '1',
      },
    });
    expect(wrapper.find('Option').length).toBe(1);

    const asyncMock = jest.fn().mockImplementation((keyword, callback) => {
      setTimeout(() => {
        callback(['Three']);
      }, 1000);
    });

    // BUG: Provide asyncFilter only could not render Search
    wrapper = mount(
      <Select
        data={['One', 'Two', 'Three']}
        onAsyncFilter={asyncMock}
        searchPlaceholder="search"
        filter={() => true}
      />,
    );
    jest.useFakeTimers();
    wrapper.find('SelectTrigger').simulate('click');
    expect(wrapper.find('Option').length).toBe(3);
    wrapper.find('Search').find('input').simulate('change', {
      target: {
        value: 'anything',
      },
    });
    expect(wrapper.find('Option').length).toBe(3);
    jest.runAllTimers();
    expect(wrapper.find('Option').length).toBe(1);
    expect(wrapper.find('Option').prop('value')).toBe('Three');
  });

  test('Tags trigger', () => {
    const wrapper = mount(<Select data={['1', '2', '3', '']} tags />);
    expect(wrapper.find('TagsTrigger').length).toBe(1);
    wrapper.find('TagsTrigger').simulate('click');
    wrapper.find('Option').at(1).simulate('click');
    wrapper.find('TagsTrigger').simulate('click');
    wrapper.find('Option').at(2).simulate('click');
    expect(wrapper.state('selectedItems').length).toBe(2);
    wrapper.find('Tag').at(0).find('i').simulate('click');
    expect(wrapper.state('selectedItems').length).toBe(1);
    wrapper.find('TagsTrigger').simulate('click');
    wrapper.find('Option').at(2).simulate('click');
    expect(wrapper.state('selectedItems').length).toBe(1);

    // HACK: branch
    wrapper.find('TagsTrigger').simulate('click');
    wrapper.find('Option').at(3).simulate('click');
  });

  it('Popup 按键事件测试', () => {
    const onChangeMock = jest.fn().mockImplementation(evt => {
      evt.preventDefault();
      evt.stopPropagation();
    });
    const onEmptyMock = jest.fn();
    const wrapper = mount(
      <Select
        data={['1', '2', '3', '']}
        tags
        onChange={onChangeMock}
        onEmptySelected={onEmptyMock}
      />,
    );
    expect(wrapper.find('TagsTrigger').length).toBe(1);
    expect(wrapper.state('open')).toBe(false);
    wrapper.find('TagsTrigger').simulate('click');
    expect(wrapper.state('open')).toBe(true);
    wrapper.find('.boldrui-select').simulate('keydown', { keyCode: 27 });
    expect(wrapper.state('open')).toBe(false);
    wrapper.find('TagsTrigger').simulate('click');
    expect(wrapper.find('.current').length).toBe(1);
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 41 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    expect(wrapper.find('.current').length).toBe(1);
    expect(wrapper.find('.current').prop('value')).toBe('2');
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    expect(wrapper.find('.current').prop('value')).toBe('');
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    expect(wrapper.find('.current').prop('value')).toBe('');
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 38 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 38 });
    expect(wrapper.find('.current').prop('value')).toBe('2');
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 38 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 38 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 38 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 38 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 38 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 38 });
    expect(wrapper.find('.current').prop('value')).toBe('1');
    expect(wrapper.state('open')).toBe(true);
    expect(onChangeMock.mock.calls.length).toBe(0);
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 13 });
    expect(wrapper.state('open')).toBe(false);
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0][0].target.value).toBe('1');
    expect(onChangeMock.mock.calls[0][0].target.type).toBe('select-multiple');
    expect(onChangeMock.mock.calls[0][1].value).toBe('1');
    wrapper.find('TagsTrigger').simulate('click');
    expect(wrapper.find('.current').length).toBe(1);
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 40 });
    wrapper.find('.boldrui-select').find('Popup').simulate('keydown', { keyCode: 13 });
    expect(onEmptyMock.mock.calls.length).toBe(0);
  });

  it('Dynamic Select', () => {
    const data = [1, 2, 3];
    const updatedData = [1, 2, 3, 4];
    const wrapper = mount(<Select data={data} />);
    wrapper.find('SelectTrigger').simulate('click');
    wrapper.find('Option').at(1).simulate('click');

    // HACK: branch Select.js line 89
    wrapper.setProps({ data });
    wrapper.setProps({ data, value: [] });
    wrapper.setProps({ data: updatedData, value: [], index: '' });

    wrapper.setProps({ data: updatedData });
    wrapper.setProps({ data, value: [1] });
    expect(wrapper.state('selectedItems')[0].value).toBe(1);

    // BUG: hard to reach Select.js line 129
    // wrapper.setProps({ data: [{ key: 1 }, { key: 2 }], value: { key: 1 } });
    wrapper.setProps({ data: updatedData, value: 2 });
    expect(wrapper.state('selectedItem').value).toBe(2);
  });

  it('Pop focus event and Select blur event popup from Popup', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Select data={['1', '2', '3', '']} />);
    expect(wrapper.state('open')).toBe(false);
    wrapper.find('SelectTrigger').simulate('click');
    expect(wrapper.getNode().focus).toBe(undefined);
    expect(wrapper.state('open')).toBe(true);
    wrapper.find('Popup').simulate('focus');
    expect(wrapper.getNode().focus).toBe(true);
    wrapper.find('Popup').simulate('blur');
    jest.runAllTimers();
    expect(wrapper.state('open')).toBe(false);
  });
});
