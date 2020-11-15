import React from 'react';
import styled from 'styled-components';
import StyledDateSwitcher from 'components/overview/DateSwitcher';
import StyledPracticeCalSessions from 'components/overview/PracticeCalSessions';

interface OverviewProps {
  className?: string;
}

const Overview: React.FC<OverviewProps> = ( props ) => {
  return(
    <div className={props.className}>
      <StyledDateSwitcher />
      <StyledPracticeCalSessions practice="city"/>
      <StyledPracticeCalSessions practice="peninsula"/>
    </div>
  ); 
}

export default styled(Overview)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
`;

