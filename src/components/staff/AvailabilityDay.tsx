import React from 'react';
import styled from 'styled-components';

interface AvailabilityDayProps {
  className?: string;
  letter: string;
  avail: string;
}

const AvailabilityDay: React.FC<AvailabilityDayProps> = ( props ) => {
  return (
    <div className={props.className}>
      <p>{props.letter}</p>
    </div>
  );
}

export default styled(AvailabilityDay)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background-color: ${props => props.avail === "1" ? "#55C144" : "#757575"};

  p {
    margin: 0px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px !important;
    font-weight: 600;
    text-align: center;
    color: white;
  }
`;