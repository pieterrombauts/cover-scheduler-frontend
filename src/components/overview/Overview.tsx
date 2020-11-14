import React from 'react';
import styled from 'styled-components';
import StyledDateSwitcher from 'components/overview/DateSwitcher';

interface OverviewProps {
  className?: string;
}

const Overview: React.FC<OverviewProps> = ( props ) => {
  return(
    <div className={props.className}>
      <StyledDateSwitcher />
    </div>
  ); 
}

export default styled(Overview)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
`;

