import React from 'react';
import styled from 'styled-components';

interface SessionListProps {
  className?: string;
}

const SessionList: React.FC<SessionListProps> = ( props ) => {
  return(
    <div className={props.className}>

    </div>
  ); 
}

export default styled(SessionList)`
  display: flex;
  flex-direction: column;
`;