import React, { useState } from 'react';
import styled from 'styled-components';
import StyledStaffRow from 'components/staff/StaffRow'
import StyledStaffLeaveDrop from 'components/staff/StaffLeaveDrop'
import { Staff } from 'customTypes/staff';

interface StaffListItemProps {
  className?: string;
  person: Staff;
}

const StaffListItem: React.FC<StaffListItemProps> = ( props ) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(!open);
  }
  return (
    <div className={props.className + ' staff_list_item'}>
      <StyledStaffRow staff={props.person} handleOpen={handleOpen} open={open}/>
      <StyledStaffLeaveDrop open={open}/>
    </div>
  );
}

export default styled(StaffListItem)`
  .ReactCollapse--collapse {
    transition: height 500ms;
  }
`;