import React from 'react';
import styled from 'styled-components';
import StyledAvailabilityDay from 'components/staff/AvailabilityDay'

interface AvailabilityWeekProps {
  className?: string;
  availability: string;
}

const AvailabilityWeek: React.FC<AvailabilityWeekProps> = ( props ) => {
  return (
    <div className={props.className}>
      <StyledAvailabilityDay className={"avail_day"} letter={"M"} avail={props.availability.charAt(0)} />
      <StyledAvailabilityDay className={"avail_day"} letter={"T"} avail={props.availability.charAt(1)} />
      <StyledAvailabilityDay className={"avail_day"} letter={"W"} avail={props.availability.charAt(2)} />
      <StyledAvailabilityDay className={"avail_day"} letter={"T"} avail={props.availability.charAt(3)} />
      <StyledAvailabilityDay className={"avail_day"} letter={"F"} avail={props.availability.charAt(4)} />
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