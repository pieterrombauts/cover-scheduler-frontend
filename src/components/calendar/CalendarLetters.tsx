import React from 'react';
import styled from 'styled-components';

interface CalendarLettersProps {
  className?: string;
}

const Calendar: React.FC<CalendarLettersProps> = ( props ) => {
  return(
    <div className={props.className}>
      <p>M</p>
      <p>T</p>
      <p>W</p>
      <p>T</p>
      <p>F</p>
      <p>S</p>
      <p>S</p>
    </div>
  ); 
}

export default styled(Calendar)`
  width: 305px;
  color: #AAC7DE;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  justify-content: space-between;

  p {
    width: 35px;
    margin: 5px 0px;
    text-align: center;
  }
`;