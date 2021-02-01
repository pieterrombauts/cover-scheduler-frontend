import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import StyledSelectableAvailabilityWeek from 'components/staff/SelectableAvailabilityWeek'
import { STAFF_TYPE } from 'constants/staff';
import { capitalise } from 'utils/stringFuncs'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AvailType } from 'customTypes/availability';

interface StaffDashboardFiltersProps {
  className?: string;
  handleNameSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeFilter: (value: any) => void;
  handleAvailFilter: (e: React.MouseEvent<HTMLDivElement>) => void;
  availability: AvailType;
}

const typeOptions = [
  {value: STAFF_TYPE.EMPLOYEE, label: capitalise(STAFF_TYPE.EMPLOYEE)},
  {value: STAFF_TYPE.COVER, label: capitalise(STAFF_TYPE.COVER)}
]

const StaffDashboardFilters: React.FC<StaffDashboardFiltersProps> = ( props ) => {
  return (
    <div className={props.className}>
      <Form.Control id="staff_search_name" type="text" placeholder="Search Name" onChange={props.handleNameSearch} />
      <Form.Control id="staff_search_email" type="text" placeholder="Search Email" onChange={props.handleEmailSearch} />
      <Form.Control id="staff_search_mobile" type="text" placeholder="Search Mobile" onChange={props.handlePhoneSearch} />
      <Select id="staff_search_type" placeholder="Filter Staff Type" isClearable={true} styles={{menu: provided => ({...provided, zIndex: 9999 })}} options={typeOptions} onChange={props.handleTypeFilter}/>
      <StyledSelectableAvailabilityWeek availability={props.availability} onDayClick={props.handleAvailFilter} />
      <Button variant="success">Add Staff <AddCircleIcon fontSize="small"/></Button>
    </div>
  );
}

export default styled(StaffDashboardFilters)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 25px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0px rgba(49, 90, 123, 0.13);

  #staff_search_name {
    width: 200px;
  }
  #staff_search_email {
    width: 300px;
  }
  #staff_search_mobile {
    width: 180px;
  }
  #staff_search_type {
    width: 200px;
  }
  #staff_search_avail {
  }
`;