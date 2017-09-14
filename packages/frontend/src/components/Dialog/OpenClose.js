import React from 'react';
import ReactDOM from 'react-dom';
import noop from 'lodash.noop';
import partial from 'lodash.partial';
import uniqueId from 'lodash.uniqueid';

import isBrowser from '../util/isBrowser';
import Dialog from './Dialog';

const dialogInstanceMap = {};

function ensureUniqDialogInstance(dialogId) {
  if (dialogInstanceMap[dialogId]) {
    throw new Error(`Duplicate dialog id found: ${dialogId}`);
  }
}

function addDialogInstance(dialogId, dialog) {
  dialogInstanceMap[dialogId] = dialog;
}

export function closeDialog(dialogId, options = {}) {
  const dialog = dialogInstanceMap[dialogId];

  if (!dialog) {
    return;
  }

  delete dialogInstanceMap[dialogId];

  const { onClose, container } = dialog;
  const { triggerOnClose = true } = options;
  if (triggerOnClose && onClose) {
    onClose();
  }

  ReactDOM.unmountComponentAtNode(container);
}

// Open a dialog, the return value is a function to close the dialog.

export default function openDialog(options = {}) {
  if (!isBrowser) {
    return noop;
  }

  const {
    onClose: oldOnClose,
    ref,
    dialogId = uniqueId('__boldr-dialog__'),
    parentComponent,
  } = options;

  ensureUniqDialogInstance(dialogId);

  const container = document.createElement('div');

  // Make sure that multiple calls are not reported incorrectly
  const close = e => {
    closeDialog(dialogId, {
      triggerOnClose: e !== false,
    });
  };

  const props = {
    ...options,
    visible: true,
    onClose: close,
  };

  // only support the plain form of ref
  if (ref && typeof ref !== 'function') {
    delete props.ref;
  }

  const render = parentComponent
    ? partial(ReactDOM.unstable_renderSubtreeIntoContainer, parentComponent)
    : ReactDOM.render;

  // Do not rely on the return value of render, the future may change behavior
  render(React.createElement(Dialog, props), container);

  addDialogInstance(dialogId, {
    onClose: oldOnClose,
    container,
  });

  return close;
}
