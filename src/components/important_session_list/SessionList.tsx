import React from 'react';
import styled from 'styled-components';
import StyledListHeading from 'components/important_session_list/ListHeading';
import StyledScrollListBox from 'components/important_session_list/ScrollListBox';

interface SessionListProps {
  className?: string;
}

const SessionList: React.FC<SessionListProps> = ( props ) => {
  return(
    <div className={props.className}>
      <StyledListHeading />
      <StyledScrollListBox />
    </div>
  ); 
}

export default styled(SessionList)`
  display: flex;
  flex-direction: column;
`;