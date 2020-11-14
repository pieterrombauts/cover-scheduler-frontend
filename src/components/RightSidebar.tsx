import React from 'react';
import styled from 'styled-components';
import StyledCalendar from 'components/calendar/Calendar';
import StyledSessionList from 'components/important_session_list/SessionList';

interface RightSidebarProps {
  className?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ( props ) => {
  return(
    <div className={props.className}>
      <StyledCalendar />
      <hr />
      <StyledSessionList />
    </div>
  ); 
}

export default styled(RightSidebar)`
  height: auto;
  width: 400px;
  background-color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 35px;
  box-shadow: 0 3px 6px 0px rgba(49, 90, 123, 0.13);

  hr {
    border-color: #E4F0F8;
    border-style: solid;
    margin: 35px 0px 35px 0px;
  }
`;