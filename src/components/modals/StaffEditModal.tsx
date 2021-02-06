import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import ConfirmationModal from 'components/modals/ConfirmationModal';
import StyledStaffInfoForm from 'components/modals/StaffInfoForm';
import { capitalise } from 'utils/stringFuncs'
import { db_get, db_update, db_delete } from 'db/renderer'
import { Staff } from 'customTypes/staff';
import { AvailType } from 'customTypes/staff'
import { encodeAvail, decodeAvail } from 'utils/availEncoding'
import { useQueryCache, useQuery, useMutation } from 'react-query';
import { STAFF_TYPE, EMPTY_STAFF } from 'constants/staff';

interface StaffEditModalProps {
  className?: string;
  onHide: () => void;
  staff: Staff;
}

const StaffEditModal: React.FC<StaffEditModalProps> = ( props ) => {
  const cache = useQueryCache();
  const { data } = useSingleStaff(props.staff.id);

  // React-Query statement to fetch a specific staff member from SQLite
  function useSingleStaff(id: number) {
    return useQuery<Staff[], Error>(`staff-id${id}`, () => {
      return db_get('SELECT * FROM STAFF WHERE id = $id', { $id: id});
    })
  }
  
  // React-Query statement to update a specific staff member in SQLite
  const [updateSingleStaff] = useMutation((staffMember: Partial<Staff>) =>
    db_update('UPDATE STAFF SET name = $name, email = $email, phone = $phone, type = $type, availability = $avail WHERE id = $id', 
    { $id: staffMember.id, 
      $name: staffMember.name, 
      $email: staffMember.email, 
      $phone: staffMember.phone, 
      $type: staffMember.type, 
      $avail: staffMember.availability
    }),
    {
      onSuccess: () => {
        cache.invalidateQueries(`staff-id${props.staff.id}`);
        cache.invalidateQueries('staff');
      }
    }
  );

  const [deleteSingleStaff] = useMutation((id: number) => 
    db_delete('DELETE FROM STAFF WHERE id = $id', { $id: id }),
    {
      onSuccess: () => {
        cache.invalidateQueries(`staff-id${props.staff.id}`);
        cache.invalidateQueries('staff');
      }
    }
  );

  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
  const [confirmModalMsg, setConfirmModalMsg] = useState<string>("");
  const [confirmModalFunc, setConfirmModalFunc] = useState<string>("update");
  const [validated, setValidated] = useState<boolean>(false);

  const [staff, setStaff] = useState<Staff>(EMPTY_STAFF);

  useEffect(() => {
    if (data !== undefined) {
      setStaff(
        {
          id: props.staff.id,
          name: data[0].name,
          email: data[0].email,
          phone: data[0].phone,
          type: data[0].type,
          availability: decodeAvail(data[0].availability),
          on_leave: data[0].on_leave
        }
      )
    }
  }, [data, props.staff.id])

  const handleValueChange = (field: ("name" | "email" | "phone"), e: React.ChangeEvent<HTMLInputElement>) => {
    setStaff({...staff, [field]: e.currentTarget.value});
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

  const handleSubmit = () => {
    if (confirmModalFunc === "update") updateSingleStaff(staff)
    if (confirmModalFunc === "delete") deleteSingleStaff(staff.id);
    props.onHide();
  }

  const handleSubmitConfirm = () => {
    const form = document.getElementById('staff_edit_form') as HTMLFormElement;
    if (form.checkValidity()) {
      setConfirmModalMsg("Are you sure you want save these changes for this employee?")
      setConfirmModalFunc("update");
      setConfirmModalShow(true);
    }
    setValidated(true);
  }

  const handleDeleteConfirm = () => {
      setConfirmModalMsg("Are you sure you want to delete this employee? <br /><strong>WARNING: This is irreversible!</strong>")
      setConfirmModalFunc("delete");
      setConfirmModalShow(true);
  }

  const hideConfirmModal = () => {
    setConfirmModalShow(false);
  }
  
  return(
    <div>
      <Modal className={props.className} show={true} onHide={props.onHide} centered>
        {confirmModalShow === true &&
          <ConfirmationModal message={confirmModalMsg} function={confirmModalFunc} onHide={hideConfirmModal} onConfirm={handleSubmit} />
        }
        {data !== undefined && confirmModalShow !== true &&
          <>
            <Modal.Header closeButton>
              <Modal.Title>Edit Staff Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StyledStaffInfoForm 
                id={"staff_edit_form"}
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
              <Button variant={"outline-danger"} onClick={handleDeleteConfirm}>
                Delete Employee
              </Button>
              <div>
                <Button variant={"secondary"} onClick={props.onHide}>
                  Cancel
                </Button>
                <Button variant={"success"} onClick={handleSubmitConfirm}>
                  Save Changes
                </Button>
              </div>
            </Modal.Footer>
          </>
        }
        
      </Modal>
    </div>
  ); 
}

export default styled(StaffEditModal)`
  .staff_edit_modal_footer {
    width: 100%;
    display: flex;
    justify-content: space-between;

    div button:first-child {
      margin-right: 10px;
    }
  }
`;

