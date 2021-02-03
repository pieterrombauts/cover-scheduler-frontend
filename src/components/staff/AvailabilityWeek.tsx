import React from 'react';
import styled from 'styled-components';
import StyledAvailabilityDay from 'components/staff/AvailabilityDay'
import { AvailType } from 'customTypes/staff'

interface AvailabilityWeekProps {
  className?: string;
  availability: AvailType;
  onDayClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AvailabilityWeek: React.FC<AvailabilityWeekProps> = ( props ) => {
  return (
    <div className={props.className}>
      <StyledAvailabilityDay day={"mon"} avail={props.availability.mon} onDayClick={props.onDayClick}/>
      <StyledAvailabilityDay day={"tue"} avail={props.availability.tue} onDayClick={props.onDayClick}/>
      <StyledAvailabilityDay day={"wed"} avail={props.availability.wed} onDayClick={props.onDayClick}/>
      <StyledAvailabilityDay day={"thu"} avail={props.availability.thu} onDayClick={props.onDayClick}/>
      <StyledAvailabilityDay day={"fri"} avail={props.availability.fri} onDayClick={props.onDayClick}/>
    </div>
  );
}

export default styled(AvailabilityWeek)`
  display: flex;
  align-items: center;

  .avail_day:not(:last-child) {
    margin-right: 5px;
  }
`;