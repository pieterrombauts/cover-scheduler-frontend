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
  const calculateBtnVariant = (fn: string) => {
    switch (fn) {
      case "update":
        return "success";
      case "add":
        return "success";
      case "delete":
        return "danger";
    }
    return "success";
  }
  
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
        <Button variant={`${calculateBtnVariant(props.function)}`} onClick={() => {props.onHide(); props.onConfirm(); }}>
          Confirm
        </Button>
      </Modal.Footer>
    </>
  ); 
}

export default styled(ConfirmationModal)``;

