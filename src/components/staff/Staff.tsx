import React from 'react';
import styled from 'styled-components';
import StyledStaffDashboard from 'components/staff/StaffDashboard'

interface StaffProps {
  className?: string;
}

const Staff: React.FC<StaffProps> = ( props ) => {
  return (
    <div className={props.className}>
      <StyledStaffDashboard />
    </div>
  );
}

export default styled(Staff)`
  height: 100%;
  width: 100%;
  padding: 60px;
`;