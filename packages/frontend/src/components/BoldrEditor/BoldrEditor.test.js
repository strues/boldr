import React from 'react';
import { shallow } from 'enzyme';
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
    expect(editor.find('.be-toolbar')).toHaveLength(1);
  });
});
