/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import Checkbox from './Checkbox';
import CheckboxGroup from './Group';

describe('Controlled CheckboxGroup', () => {
  it('value', () => {
    const radioGroup = TestUtils.renderIntoDocument(
      <CheckboxGroup value={['apple']}>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
      </CheckboxGroup>,
    );

    const radios = TestUtils.scryRenderedComponentsWithType(
      radioGroup,
      Checkbox,
    );

    const appleCheckboxNode = ReactDOM.findDOMNode(radios[0]);
    const bananaCheckboxNode = ReactDOM.findDOMNode(radios[1]);

    const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
      radios[0],
      'input',
    );
    const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
      radios[1],
      'input',
    );

    expect(appleCheckboxNode.className).toContain('boldrui-checkbox-checked');
    expect(appleCheckboxInputNode.checked).toBe(true);

    expect(bananaCheckboxNode.className).not.toContain(
      'boldrui-checkbox-checked',
    );
    expect(bananaCheckboxInputNode.checked).toBe(false);
  });

  it('onChange', () => {
    let value = ['apple'];
    const handleChange = checkedValue => {
      value = checkedValue;
    };
    const radioGroup = TestUtils.renderIntoDocument(
      <CheckboxGroup value={value} onChange={handleChange}>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
      </CheckboxGroup>,
    );

    const radios = TestUtils.scryRenderedComponentsWithType(
      radioGroup,
      Checkbox,
    );
    const [appleCheckbox, bananaCheckbox] = radios;
    const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
      bananaCheckbox,
      'input',
    );
    const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
      appleCheckbox,
      'input',
    );

    TestUtils.Simulate.change(bananaCheckboxInputNode, {
      target: { checked: true },
    });
    expect(value).toEqual(['apple', 'banana']);

    TestUtils.Simulate.change(appleCheckboxInputNode, {
      target: { checked: true },
    });
    expect(value).toEqual([]);
  });

  describe('disabled', () => {
    it('disabled group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']} disabled>
          <Checkbox value="apple">Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>,
      );

      const checkboxs = TestUtils.scryRenderedComponentsWithType(
        checkboxGroup,
        Checkbox,
      );

      const appleCheckboxNode = ReactDOM.findDOMNode(checkboxs[0]);
      const bananaCheckboxNode = ReactDOM.findDOMNode(checkboxs[1]);

      const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[0],
        'input',
      );
      const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[1],
        'input',
      );

      expect(appleCheckboxNode.className).toContain(
        'boldrui-checkbox-disabled',
      );
      expect(bananaCheckboxNode.className).toContain(
        'boldrui-checkbox-disabled',
      );

      expect(appleCheckboxInputNode.disabled).toBe(true);
      expect(bananaCheckboxInputNode.disabled).toBe(true);
    });

    it('checkbox disabled in group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']}>
          <Checkbox value="apple" disabled>Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>,
      );

      const checkboxs = TestUtils.scryRenderedComponentsWithType(
        checkboxGroup,
        Checkbox,
      );

      const appleCheckboxNode = ReactDOM.findDOMNode(checkboxs[0]);
      const bananaCheckboxNode = ReactDOM.findDOMNode(checkboxs[1]);

      const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[0],
        'input',
      );
      const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[1],
        'input',
      );

      expect(appleCheckboxNode.className).toContain(
        'boldrui-checkbox-disabled',
      );
      expect(bananaCheckboxNode.className).not.toContain(
        'boldrui-checkbox-disabled',
      );

      expect(appleCheckboxInputNode.disabled).toBe(true);
      expect(bananaCheckboxInputNode.disabled).toBe(false);
    });

    it('checkbox not disabled in disabled group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']} disabled>
          <Checkbox value="apple" disabled={false}>Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>,
      );

      const checkboxs = TestUtils.scryRenderedComponentsWithType(
        checkboxGroup,
        Checkbox,
      );

      const appleCheckboxNode = ReactDOM.findDOMNode(checkboxs[0]);
      const bananaCheckboxNode = ReactDOM.findDOMNode(checkboxs[1]);

      const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[0],
        'input',
      );
      const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[1],
        'input',
      );

      expect(appleCheckboxNode.className).not.toContain(
        'boldrui-checkbox-disabled',
      );
      expect(bananaCheckboxNode.className).toContain(
        'boldrui-checkbox-disabled',
      );

      expect(appleCheckboxInputNode.disabled).toBe(false);
      expect(bananaCheckboxInputNode.disabled).toBe(true);
    });
  });

  describe('readOnly', () => {
    it('readOnly group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']} readOnly>
          <Checkbox value="apple">Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>,
      );

      const checkboxs = TestUtils.scryRenderedComponentsWithType(
        checkboxGroup,
        Checkbox,
      );

      const appleCheckboxNode = ReactDOM.findDOMNode(checkboxs[0]);
      const bananaCheckboxNode = ReactDOM.findDOMNode(checkboxs[1]);

      const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[0],
        'input',
      );
      const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[1],
        'input',
      );

      expect(appleCheckboxNode.className).toContain(
        'boldrui-checkbox-disabled',
      );
      expect(bananaCheckboxNode.className).toContain(
        'boldrui-checkbox-disabled',
      );

      expect(appleCheckboxInputNode.readOnly).toBe(true);
      expect(bananaCheckboxInputNode.readOnly).toBe(true);
    });

    it('checkbox readOnly in group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']}>
          <Checkbox value="apple" readOnly>Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>,
      );

      const checkboxs = TestUtils.scryRenderedComponentsWithType(
        checkboxGroup,
        Checkbox,
      );

      const appleCheckboxNode = ReactDOM.findDOMNode(checkboxs[0]);
      const bananaCheckboxNode = ReactDOM.findDOMNode(checkboxs[1]);

      const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[0],
        'input',
      );
      const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[1],
        'input',
      );

      expect(appleCheckboxNode.className).toContain(
        'boldrui-checkbox-disabled',
      );
      expect(bananaCheckboxNode.className).not.toContain(
        'boldrui-checkbox-disabled',
      );

      expect(appleCheckboxInputNode.readOnly).toBe(true);
      expect(bananaCheckboxInputNode.readOnly).toBe(false);
    });

    it('checkbox not readOnly in readOnly group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']} readOnly>
          <Checkbox value="apple" readOnly={false}>Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>,
      );

      const checkboxs = TestUtils.scryRenderedComponentsWithType(
        checkboxGroup,
        Checkbox,
      );

      const appleCheckboxNode = ReactDOM.findDOMNode(checkboxs[0]);
      const bananaCheckboxNode = ReactDOM.findDOMNode(checkboxs[1]);

      const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[0],
        'input',
      );
      const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
        checkboxs[1],
        'input',
      );

      expect(appleCheckboxNode.className).not.toContain(
        'boldrui-checkbox-disabled',
      );
      expect(bananaCheckboxNode.className).toContain(
        'boldrui-checkbox-disabled',
      );

      expect(appleCheckboxInputNode.readOnly).toBe(false);
      expect(bananaCheckboxInputNode.readOnly).toBe(true);
    });
  });

  it('className', () => {
    const radioGroup = TestUtils.renderIntoDocument(
      <CheckboxGroup className="customClassName" />,
    );

    const radioGroupNode = ReactDOM.findDOMNode(radioGroup);
    expect(radioGroupNode.className).toContain('customClassName');
    expect(radioGroupNode.className).toContain('boldrui-checkbox-group');
  });

  it('prefix', () => {
    const radioGroup = TestUtils.renderIntoDocument(
      <CheckboxGroup prefix="custom">
        <Checkbox value="apple" />
      </CheckboxGroup>,
    );

    const radio = TestUtils.findRenderedComponentWithType(radioGroup, Checkbox);

    const radioGroupNode = ReactDOM.findDOMNode(radioGroup);
    const radioNode = ReactDOM.findDOMNode(radio);

    expect(radioGroupNode.className).not.toContain('boldrui-checkbox-group');
    expect(radioGroupNode.className).toContain('custom-checkbox-group');

    expect(radioNode.className).toContain('boldrui-checkbox-wrap');
    expect(radioNode.className).not.toContain('custom-checkbox-wrap');
  });
});
