import React from 'react';
import styled from 'styled-components';

interface StaffProps {
  className?: string;
}

const Staff: React.FC<StaffProps> = ( props ) => {
  return (
    <div className={props.className}>
        <p>HELLO WORLD</p>
    </div>
  );
}

export default styled(Staff)`
  width: 100%;
  height: 100%;
`;