import React from 'react';
import styled from 'styled-components';

interface SessionConfigProps {
  className?: string;
}

const SessionConfig: React.FC<SessionConfigProps> = ( props ) => {
  return(
    <div className={props.className}>
    </div>
  ); 
}

export default styled(SessionConfig)`

`;

