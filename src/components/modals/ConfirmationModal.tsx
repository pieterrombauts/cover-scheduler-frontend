import React from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ConfirmationModalProps {
  className?: string;
  onHide: () => void;
  onConfirm: () => void;
  message: string;
  function: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ( props ) => {
  return(
    <>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p dangerouslySetInnerHTML={{__html: props.message}}></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"secondary"} onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant={props.function == "update" ? "success" : "danger"} onClick={() => {props.onHide(); props.onConfirm(); }}>
          Confirm
        </Button>
      </Modal.Footer>
    </>
  ); 
}

export default styled(ConfirmationModal)``;

