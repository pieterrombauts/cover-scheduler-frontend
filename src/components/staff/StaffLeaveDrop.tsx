import React from 'react';
import styled from 'styled-components';
import { UnmountClosed } from 'react-collapse';

interface StaffLeaveDropProps {
  className?: string;
  open: boolean;
}

const StaffLeaveDrop: React.FC<StaffLeaveDropProps> = ( props ) => {
  return (
    <UnmountClosed isOpened={props.open}>
      <div className={props.className}>
      </div>
    </UnmountClosed>
  );
}

export default styled(StaffLeaveDrop)`
  margin: 0px 5px;
  height: 100px;
  background-color: #F3F8FC;
  border-radius: 0px 0px 5px 5px;
`;