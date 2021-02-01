import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import ConfirmationModal from 'components/modals/ConfirmationModal';
import { capitalise } from 'utils/stringFuncs'
import { db_get, db_update, db_delete } from 'db/renderer'
import { Staff } from 'customTypes/staff';
import { AvailType } from 'customTypes/availability'
import { encodeAvail, decodeAvail } from 'utils/availEncoding'
import { useQueryCache, useQuery } from 'react-query';
import { STAFF_TYPE } from 'constants/staff';

interface StaffEditModalProps {
  className?: string;
  onHide: () => void;
  staff: Staff;
}

// React-Query statement to fetch a specific staff member from SQLite
function useSingleStaff(id: number) {
  return useQuery<Staff[], Error>(`staff-id${id}`, () => {
    return db_get('SELECT * FROM STAFF WHERE id = $id', { $id: id});
  })
}

// React-Query statement to update a specific staff member in SQLite
function updateSingleStaff(id: number, name: string, email: string, phone: string, type: string, avail: string) {
  db_update('UPDATE STAFF SET name = $name, email = $email, phone = $phone, type = $type, availability = $avail WHERE id = $id', { $id: id, $name: name, $email: email, $phone: phone, $type: type, $avail: avail });
}

function deleteSingleStaff(id: number) {
  db_delete('DELETE FROM STAFF WHERE id = $id', { $id: id });
}

// Type definitions for check-boxes and drop-down
const typeOptions = [
  {value: STAFF_TYPE.EMPLOYEE, label: capitalise(STAFF_TYPE.EMPLOYEE)},
  {value: STAFF_TYPE.COVER, label: capitalise(STAFF_TYPE.COVER)}
]

const StaffEditModal: React.FC<StaffEditModalProps> = ( props ) => {
  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
  const [confirmModalMsg, setConfirmModalMsg] = useState<string>("");
  const [confirmModalFunc, setConfirmModalFunc] = useState<string>("update");
  const [validated, setValidated] = useState<boolean>(false);

  const [id, setId] = useState<number>(props.staff.id);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [type, setType] = useState<string>(typeOptions[0].value);
  const [avail, setAvail] = useState<AvailType>({mon: false, tue: false, wed: false, thu: false, fri: false});

  const cache = useQueryCache();
  const { data, isFetching } = useSingleStaff(id);

  const handleTypeChange = (value: any ) => {
    console.log(value);
    if (value !== null && value !== undefined) {
      if (!Array.isArray(value)) {
        setType(value.value)
      }
    }
  }

  const hideConfirmModal = () => {
    setConfirmModalShow(false);
  }

  const handleAvailChange = (day: string, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(day, e.currentTarget.checked);
    setAvail({...avail, [day]: e.currentTarget.checked });
  }

  const handleSubmit = () => {
    if (confirmModalFunc == "update") updateSingleStaff(id, name, email, phone, type, encodeAvail(avail));
    else if (confirmModalFunc == "delete") deleteSingleStaff(id);
    setTimeout(() => {
      cache.invalidateQueries(`staff-id${id}`);
      cache.invalidateQueries('staff');
    }, 0)
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
  
  useEffect(() => {
    if (data !== undefined) {
      setName(data[0].name);
      setEmail(data[0].email);
      setPhone(data[0].phone);
      setType(data[0].type)
      setAvail(decodeAvail(data[0].availability));
    }
  }, [data])
  
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
              <Form id={'staff_edit_form'} noValidate validated={validated}>
                <Form.Group controlId={"staff_edit_name"}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control required value={name} type="text" placeholder="Name" onChange={(e) => setName(e.currentTarget.value)} />
                </Form.Group>
                <Form.Group controlId={"staff_edit_email"}>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control required value={email} type="email" placeholder="Email Address" onChange={(e) => setEmail(e.currentTarget.value)} />
                </Form.Group>
                <Form.Group controlId={"staff_edit_phone"}>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control required value={phone} type="text" pattern="(04)\d{8}" placeholder="Mobile" onChange={(e) => setPhone(e.currentTarget.value)} />
                </Form.Group>
                <Form.Group controlId={"staff_edit_type"}>
                  <Form.Label>Staff Type</Form.Label>
                  <Select styles={{menu: provided => ({...provided, zIndex: 9999 })}} options={typeOptions} value={typeOptions.filter(option => option.value === type)} onChange={handleTypeChange} />
                </Form.Group>
                <Form.Label>Availability</Form.Label>
                <div>
                  <Form.Check style={{marginRight: "30px"}} custom inline label={"Mon"} type={"checkbox"} id={"avail_mon"} checked={avail.mon} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAvailChange("mon", e)}/>
                  <Form.Check style={{marginRight: "30px"}} custom inline label={"Tue"} type={"checkbox"} id={"avail_tue"} checked={avail.tue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAvailChange("tue", e)}/>
                  <Form.Check style={{marginRight: "30px"}} custom inline label={"Wed"} type={"checkbox"} id={"avail_wed"} checked={avail.wed} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAvailChange("wed", e)}/>
                  <Form.Check style={{marginRight: "30px"}} custom inline label={"Thu"} type={"checkbox"} id={"avail_thu"} checked={avail.thu} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAvailChange("thu", e)}/>
                  <Form.Check custom inline label={"Fri"} type={"checkbox"} id={"avail_fri"} checked={avail.fri} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAvailChange("fri", e)}/>
                </div>
              </Form>
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

