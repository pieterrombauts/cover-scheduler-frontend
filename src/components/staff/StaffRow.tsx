import React, { useState } from 'react';
import styled from 'styled-components';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import { showModal, hideModal } from 'redux/slices/modalSlice'
import { Staff } from 'customTypes/staff';
import StyledAvailabilityWeek from 'components/staff/AvailabilityWeek'
import { decodeAvail } from 'utils/availEncoding'
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

const mapState = (state: RootState) => ({})

const connector = connect(mapState, { showModal, hideModal });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & StaffRowProps;

const StaffRow: React.FC<Props> = ( props ) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.showModal({ modalType: "STAFF_EDIT", modalProps: { staff: props.staff }});
    e.stopPropagation();
  }

  return (
    <div className={props.className} onClick={props.handleOpen}>
      <p className={"staff_name"}>{props.staff.name}</p>
      <p className={"staff_email"}>{props.staff.email}</p>
      <p className={"staff_phone"}>{formatMobile(props.staff.phone)}</p>
      <p className={"staff_type"}>{capitalise(props.staff.type)}</p>
      <div className={"staff_avail"}>
        <StyledAvailabilityWeek availability={decodeAvail(props.staff.availability)}/>
      </div>
      {/* <div className={"staff_expand"}>
        <IconButton size="medium" onClick={() => props.handleOpen()}>
          <ArrowLeft className={`${props.open ? "down" : ""}`}/>
        </IconButton>
      </div> */}
      <div className={"staff_update"}>
        <IconButton size="medium" onClick={(e) => handleClick(e)}>
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}

const StyledStaffRow = styled(StaffRow)`
  display: flex;
  padding: 0px 20px;
  align-items: center;
  height: 65px;
  background-color: ${props => props.staff.on_leave ? "#FFBEBE" : "#E4F0F8"};
  border-radius: 5px;
  cursor: pointer;

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

export default connector(StyledStaffRow);