import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StyledStaffInfoForm from 'components/modals/StaffInfoForm'
import ConfirmationModal from 'components/modals/ConfirmationModal';
import { db_insert } from 'db/renderer'
import { Staff } from 'customTypes/staff';
import { AvailType } from 'customTypes/staff'
import { encodeAvail } from 'utils/availEncoding'
import { useQueryCache } from 'react-query';
import { EMPTY_STAFF } from 'constants/staff';

interface StaffAddModalProps {
  className?: string;
  onHide: () => void;
  staff: Staff;
}

function insertSingleStaff(name: string, email: string, phone: string, type: string, avail: string) {
  db_insert('INSERT INTO STAFF (name, email, phone, type, availability) VALUES (?, ?, ?, ?, ?)', [name, email, phone, type, avail]);
}

const StaffAddModal: React.FC<StaffAddModalProps> = ( props ) => {
  const cache = useQueryCache();

  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
  const [confirmModalMsg, setConfirmModalMsg] = useState<string>("");
  const [confirmModalFunc, ] = useState<string>("add");
  const [validated, setValidated] = useState<boolean>(false);

  const [staff, setStaff] = useState<Staff>(EMPTY_STAFF)

  const handleValueChange = (field: ("name" | "email" | "phone"), e: React.ChangeEvent<HTMLInputElement>) => {
    setStaff({...staff, [field]: e.currentTarget.value });
  }

  const handleTypeChange = (value: any ) => {
    console.log(value);
    if (value !== null && value !== undefined) {
      if (!Array.isArray(value)) {
        setStaff({...staff, type: value.value});
      }
    }
  }

  const handleAvailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newState = {...staff};
    (newState.availability as AvailType)[e.currentTarget.getAttribute('data-day') as keyof AvailType] = e.currentTarget.checked;
    setStaff(newState);
  }

  const hideConfirmModal = () => {
    setConfirmModalShow(false);
  }

  const handleSubmit = () => {
    insertSingleStaff(staff.name, staff.email, staff.phone, staff.type, encodeAvail(staff.availability as AvailType));
    cache.invalidateQueries('staff');
    props.onHide();
  }

  const handleSubmitConfirm = () => {
    const form = document.getElementById('staff_add_form') as HTMLFormElement;
    if (form.checkValidity()) {
      setConfirmModalMsg("Are you sure you want add this staff member?")
      setConfirmModalShow(true);
    }
    setValidated(true);
  }
  
  return(
    <div>
      <Modal className={props.className} show={true} onHide={props.onHide} centered>
        {confirmModalShow === true &&
          <ConfirmationModal message={confirmModalMsg} function={confirmModalFunc} onHide={hideConfirmModal} onConfirm={handleSubmit} />
        }
        {confirmModalShow !== true &&
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add Staff Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StyledStaffInfoForm 
                id={"staff_add_form"}
                nameChange={(e) => handleValueChange("name", e)}
                emailChange={(e) => handleValueChange("email", e)}
                phoneChange={(e) => handleValueChange("phone", e)}
                typeChange={handleTypeChange}
                availChange={handleAvailChange}
                staff={staff}
                validated={validated}
              />
            </Modal.Body>
            <Modal.Footer className={"staff_edit_modal_footer"}>
              <div>
                <Button variant={"secondary"} onClick={props.onHide}>
                  Cancel
                </Button>
                <Button variant={"success"} onClick={handleSubmitConfirm}>
                  Add Staff
                </Button>
              </div>
            </Modal.Footer>
          </>
        }
        
      </Modal>
    </div>
  ); 
}

export default styled(StaffAddModal)`
  .staff_edit_modal_footer {
    width: 100%;
    display: flex;
    justify-content: space-between;

    div button:first-child {
      margin-right: 10px;
    }
  }
`;

