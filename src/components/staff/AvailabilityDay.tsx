import React from 'react';
import styled from 'styled-components';

interface AvailabilityDayProps {
  className?: string;
  day: string;
  avail: boolean;
  onDayClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AvailabilityDay: React.FC<AvailabilityDayProps> = ( props ) => {
  return (
    <div data-day={props.day} className={`${props.className} avail_day`} onClick={props.onDayClick}>
      <p>{props.day.charAt(0).toUpperCase()}</p>
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
  background-color: ${props => props.avail ? "#55C144" : "#757575"};

  p {
    margin: 0px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px !important;
    font-weight: 600;
    text-align: center;
    color: white;
  }
`;