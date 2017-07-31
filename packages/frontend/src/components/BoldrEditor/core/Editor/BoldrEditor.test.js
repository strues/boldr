/* @flow */

import React from 'react';
import { shallow, mount } from 'enzyme';
import BoldrEditor from './BoldrEditor';

describe('<BoldrEditor />', () => {
  it('should be wrapped in a div', () => {
    expect(shallow(<BoldrEditor />).html().startsWith('<div')).toBe(true);
  });

  it('editorState should be found in the component state', () => {
    const editor = shallow(<BoldrEditor />);
    expect(editor.state().editorState).toBeDefined();
    expect(editor.state().editorFocused).toBeDefined();
  });

  it('should have toolbarHidden as false by default', () => {
    const editor = shallow(<BoldrEditor />);
    expect(editor.find('.boldrui-editor-toolbar')).toHaveLength(1);
  });

  it('should not have a toolbar if toolbarHidden is true', () => {
    const editor = shallow(<BoldrEditor toolbarHidden />);
    expect(editor.find('.boldrui-editor-toolbar')).toHaveLength(0);
  });
});
