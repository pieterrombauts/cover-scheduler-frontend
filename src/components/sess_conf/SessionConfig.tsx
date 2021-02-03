import React from 'react';
import styled from 'styled-components';
import StyledPracticeConfigWeek from 'components/sess_conf/PracticeConfigWeek'

interface SessionConfigProps {
  className?: string;
}

const SessionConfig: React.FC<SessionConfigProps> = ( props ) => {
  return(
    <div className={props.className}>
      <StyledPracticeConfigWeek practice="city" />
      <StyledPracticeConfigWeek practice="peninsula" />
    </div>
  ); 
}

export default styled(SessionConfig)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;

  &:first-child .config_practice {
    margin-bottom: 30px;
  }
`;

