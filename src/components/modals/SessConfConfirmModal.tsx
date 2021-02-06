import React from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import StyledConfirmationModal from 'components/modals/ConfirmationModal'

interface SessConfConfirmModalProps {
  className?: string;
  message: string;
  fn: string;
  onHide: () => void;
  onConfirm: () => void;
}

const SessConfConfirmModal: React.FC<SessConfConfirmModalProps> = ( props ) => {
  return(
    <div className={props.className}>
      <Modal show={true} onHide={props.onHide} centered>
        <StyledConfirmationModal 
          onHide={props.onHide} 
          onConfirm={props.onConfirm} 
          message={props.message} 
          function={props.fn} 
        />
      </Modal>
    </div>
  ); 
}

export default styled(SessConfConfirmModal)`
`;

