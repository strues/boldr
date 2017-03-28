/* @flow */
import React from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  onClose: () => void,
  children: ReactChildren,
  title: String,
  visible: Boolean,
};

const Modal = (props: Props) => {
  return (
    <Dialog
      id="adminModal"
      title={props.title}
      actions={<Button label="Close" flat primary onClick={props.onClose} />}
      aria-labelledby="contentModal"
      visible={props.visible}
      onHide={props.onClose}
      modal
    >
      {props.children}
    </Dialog>
  );
};

export default Modal;
