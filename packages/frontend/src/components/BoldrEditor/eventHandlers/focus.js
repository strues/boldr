// @flow
export default class FocusHandler {
  inputFocused: boolean = false;
  editorMouseDown: boolean = false;

  onEditorMouseDown = (): boolean => {
    (this: any).editorFocused = true;
  };

  onInputMouseDown = (): boolean => {
    (this: any).inputFocused = true;
  };

  isEditorBlur = (event: Event): boolean => {
    if (event.target.tagName === 'INPUT' && !this.editorFocused) {
      this.inputFocused = false;
      return true;
    } else if (event.target.tagName !== 'INPUT' && !this.inputFocused) {
      this.editorFocused = false;
      return true;
    }
    return false;
  };

  isEditorFocused = (): boolean => {
    if (!this.inputFocused) {
      return true;
    }
    this.inputFocused = false;
    return false;
  };

  isToolbarFocused = (): boolean => {
    if (!this.editorFocused) {
      return true;
    }
    this.editorFocused = false;
    return false;
  };

  isInputFocused = (): boolean => this.inputFocused;
}
