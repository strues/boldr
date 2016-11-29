import React from 'react';
import { Modal } from 'semantic-ui-react';

const Dialog = (props) => {
  return (
    <div>
      <Modal
        open={ props.open }
        onOpen={ props.onOpen }
        onClose={ props.onClose }
      >
         <Modal.Header>{ props.title }</Modal.Header>
         <Modal.Content>
           { props.children }
         </Modal.Content>
       </Modal>
    </div>
  );
};

export default Dialog;
