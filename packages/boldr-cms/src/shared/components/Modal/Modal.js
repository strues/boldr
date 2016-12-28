/* @flow */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

type Props = {
  onClose: () => void,
  children: ReactElement,
  title: String,
  open: Boolean,
};

const Modal = (props: Props) => {
  return (
    <Dialog
      title={ props.title }
      actions={ <FlatButton label="Close" primary onTouchTap={ props.onClose } /> }
      open={ props.open }
      onRequestClose={ props.onClose }
    >
      { props.children }
    </Dialog>
  );
};

export default Modal;
