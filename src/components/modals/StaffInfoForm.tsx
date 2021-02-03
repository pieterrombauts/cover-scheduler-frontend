import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { capitalise } from 'utils/stringFuncs'
import { Staff } from 'customTypes/staff';
import { AvailType } from 'customTypes/staff'
import { STAFF_TYPE } from 'constants/staff';

interface StaffInfoFormProps {
  id?: string
  className?: string;
  nameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeChange: (value: any) => void;
  availChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  staff: Staff;
  validated: boolean;
}

const typeOptions = [
  {value: STAFF_TYPE.EMPLOYEE, label: capitalise(STAFF_TYPE.EMPLOYEE)},
  {value: STAFF_TYPE.COVER, label: capitalise(STAFF_TYPE.COVER)}
]

const StaffInfoForm: React.FC<StaffInfoFormProps> = ( props ) => {
  return(
    <Form id={props.id} className={`${props.className} staff_info_form`} noValidate validated={props.validated}>
      <Form.Group controlId={"staff_edit_name"}>
        <Form.Label>Name</Form.Label>
        <Form.Control required value={props.staff.name} type="text" placeholder="Name" onChange={props.nameChange} />
      </Form.Group>
      <Form.Group controlId={"staff_edit_email"}>
        <Form.Label>Email Address</Form.Label>
        <Form.Control required value={props.staff.email} type="email" placeholder="Email Address" onChange={props.emailChange} />
      </Form.Group>
      <Form.Group controlId={"staff_edit_phone"}>
        <Form.Label>Mobile</Form.Label>
        <Form.Control required value={props.staff.phone} type="text" pattern="(04)\d{8}" placeholder="Mobile" onChange={props.phoneChange} />
      </Form.Group>
      <Form.Group controlId={"staff_edit_type"}>
        <Form.Label>Staff Type</Form.Label>
        <Select styles={{menu: provided => ({...provided, zIndex: 9999 })}} options={typeOptions} value={typeOptions.filter(option => option.value === props.staff.type)} onChange={props.typeChange} />
      </Form.Group>
      <Form.Label>Availability</Form.Label>
      <div>
        <Form.Check style={{marginRight: "30px"}} custom inline label={"Mon"} type={"checkbox"} data-day={"mon"} checked={(props.staff.availability as AvailType).mon} onChange={props.availChange}/>
        <Form.Check style={{marginRight: "30px"}} custom inline label={"Tue"} type={"checkbox"} data-day={"tue"} checked={(props.staff.availability as AvailType).tue} onChange={props.availChange}/>
        <Form.Check style={{marginRight: "30px"}} custom inline label={"Wed"} type={"checkbox"} data-day={"wed"} checked={(props.staff.availability as AvailType).wed} onChange={props.availChange}/>
        <Form.Check style={{marginRight: "30px"}} custom inline label={"Thu"} type={"checkbox"} data-day={"thu"} checked={(props.staff.availability as AvailType).thu} onChange={props.availChange}/>
        <Form.Check custom inline label={"Fri"} type={"checkbox"} data-day={"fri"} checked={(props.staff.availability as AvailType).fri} onChange={props.availChange}/>
      </div>
    </Form>
  ); 
}

export default styled(StaffInfoForm)`
`;

