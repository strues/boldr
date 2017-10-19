// @flow

export default class ModalHandler {
  callbacks: $ReadOnlyArray<*> = [];

  suggestionCallback = undefined;

  editorFlag: boolean = false;

  suggestionFlag: boolean = false;

  closeAllModals = (event: SyntheticEvent<>) => {
    this.callbacks.forEach(callback => {
      callback(event);
    });
  };

  init = (wrapperId: string) => {
    const wrapper = document.getElementById(wrapperId); // eslint-disable-line no-undef
    wrapper.addEventListener('click', () => {
      this.editorFlag = true;
    });
    document.addEventListener('click', () => {
      // eslint-disable-line no-undef
      if (!this.editorFlag) {
        this.closeAllModals();
        if (this.suggestionCallback) {
          this.suggestionCallback();
        }
      } else {
        this.editorFlag = false;
      }
    });
    document.addEventListener('keydown', (event: SyntheticEvent<>) => {
      // eslint-disable-line no-undef
      if (event.key === 'Escape') {
        this.closeAllModals();
      }
    });
  };

  onEditorClick = () => {
    this.closeModals();
    if (!this.suggestionFlag && this.suggestionCallback) {
      this.suggestionCallback();
    } else {
      this.suggestionFlag = false;
    }
  };

  closeModals = (event: SyntheticEvent<>): void => {
    this.closeAllModals(event);
  };

  registerCallback = (callback): void => {
    this.callbacks.push(callback);
  };

  deregisterCallback = (callback): void => {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  };

  setSuggestionCallback = (callback): void => {
    this.suggestionCallback = callback;
  };

  removeSuggestionCallback = (): void => {
    this.suggestionCallback = undefined;
  };

  onSuggestionClick = (): void => {
    this.suggestionFlag = true;
  };
}
