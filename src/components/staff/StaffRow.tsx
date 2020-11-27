import React, { useState } from 'react';
import styled from 'styled-components';
import { Staff } from 'customTypes/staff';
import StyledAvailabilityWeek from 'components/staff/AvailabilityWeek'
import IconButton from '@material-ui/core/IconButton'
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { capitalise, formatMobile } from 'utils/stringFuncs';

interface StaffRowProps {
  className?: string;
  staff: Staff
  handleOpen: () => any;
  open: boolean;
}

const StaffRow: React.FC<StaffRowProps> = ( props ) => {
  const [edit, setEdit] = useState<boolean>(false);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (edit) {
      // Handle saving here
    }
    setEdit(!edit);
  }

  return (
    <div className={props.className}>
      <p className={"staff_name"}>{props.staff.name}</p>
      <p className={"staff_email"}>{props.staff.email}</p>
      <p className={"staff_phone"}>{formatMobile(props.staff.phone)}</p>
      <p className={"staff_type"}>{capitalise(props.staff.type)}</p>
      <div className={"staff_avail"}>
        <StyledAvailabilityWeek availability={props.staff.availability}/>
      </div>
      <div className={"staff_expand"}>
        <IconButton size="medium" onClick={() => props.handleOpen()}>
          <ArrowLeft className={`${props.open ? "down" : ""}`}/>
        </IconButton>
      </div>
      <div className={"staff_update"}>
        <IconButton size="medium" onClick={(e) => handleSave(e)}>
          {edit ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export default styled(StaffRow)`
  display: flex;
  padding: 0px 20px;
  align-items: center;
  height: 65px;
  background-color: ${props => props.staff.on_leave ? "#FFBEBE" : "#E4F0F8"};
  border-radius: 5px;

  p {
    margin: 0px;
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #315A7B;
  }

  p:first-child {
    font-weight: 800;
  }

  .staff_expand, .staff_update {
    display: flex;
    justify-content: center;
    svg {
      color: #315A7B;
      transition: all 0.4s ease-in-out;
    }
    svg.down {
      transform: rotate(-90deg);
    }
  }
`;