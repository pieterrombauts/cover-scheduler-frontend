import React from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Session } from 'customTypes/session';
import { capitalise } from 'utils/stringFuncs'
import { DateTime } from 'luxon';

interface SessionModalProps {
  className?: string;
  onHide: () => void;
  session: Session;
}

const SessionModal: React.FC<SessionModalProps> = ( props ) => {
  return(
    <div className={props.className}>
      <Modal show={true} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{`${capitalise(props.session.practice)} - ${DateTime.fromISO(props.session.date).toFormat("ccc, DD")}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.session.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"secondary"} onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant={"success"} onClick={props.onHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  ); 
}

export default styled(SessionModal)`
`;

