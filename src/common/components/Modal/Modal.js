/* @flow */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

type Props = {
  onClose: () => void,
  children: ReactElement,
  title: String,
  open: Boolean,
};

const Modal = (props: Props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={ props.onClose }
      key={ 1 }
    />,
    <RaisedButton
      label="Submit"
      primary
      keyboardFocused
      onTouchTap={ props.onClose }
      key={ 2 }
    />,
  ];
  return (
    <Dialog
      title={ props.title }
      actions={ actions }
      modal={ false }
      open={ props.open }
      onRequestClose={ props.onClose }
    >
      { props.children }
    </Dialog>
  );
};

export default Modal;
